require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

const GOOGLE_SHEET_WEBHOOK_URL = process.env.GOOGLE_SHEET_WEBHOOK_URL;

// Email Configuration (Nodemailer)
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT == 465,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Cracx MVP Backend is running.' });
});

// 1. Webhook to receive New Orders from the Website
app.post('/webhook/new-order', async (req, res) => {
    try {
        const { orderId, customerName, customerPhone, customerEmail, customerAddress, products, total, trackingLink } = req.body;

        console.log(`[ORIGIN: WEB] Received new order: ${orderId} from ${customerName}`);

        if (!GOOGLE_SHEET_WEBHOOK_URL) {
            console.warn('Google Sheet Webhook URL is missing. Logging order only.');
            return res.status(200).json({ success: true, message: 'Order received (Sheets skipped)' });
        }

        // Send order data to Google Sheets Apps Script
        await axios.post(GOOGLE_SHEET_WEBHOOK_URL, {
            action: 'nuevo_pedido',
            payload: { orderId, customerName, customerPhone, customerEmail, customerAddress, products, total, trackingLink, origin: 'Web' }
        }, {
            headers: { 'Content-Type': 'application/json' }
        });

        console.log(`Order sent to Google Sheets: ${orderId}`);

        // 3. Send Confirmation Email to Customer
        if (customerEmail && process.env.SMTP_USER) {
            const mailOptions = {
                from: `"Cracx" <${process.env.SMTP_USER}>`,
                to: customerEmail,
                subject: `¡Pedido Confirmado! Cracx #${orderId}`,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                        <h2 style="color: #0d9488;">¡Gracias por tu compra, ${customerName}!</h2>
                        <p>Hemos recibido tu pedido correctamente y ya nos hemos puesto manos a la obra.</p>
                        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                        <h3>Resumen del Pedido (#${orderId})</h3>
                        <p><strong>Productos:</strong> ${products}</p>
                        <p><strong>Dirección:</strong> ${customerAddress}</p>
                        <p><strong>Total:</strong> ${total}€</p>
                        <div style="margin-top: 30px; text-align: center;">
                            <a href="${trackingLink}" style="background-color: #0d9488; color: white; padding: 12px 25px; text-decoration: none; border-radius: 25px; font-weight: bold;">Ver Seguimiento en Tiempo Real</a>
                        </div>
                        <p style="margin-top: 30px; font-size: 0.9em; color: #666;">Si tienes cualquier duda, puedes responder a este correo o contactarnos por WhatsApp.</p>
                    </div>
                `
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                } else {
                    console.log('Confirmation email sent:', info.response);
                }
            });
        }

        res.status(200).json({ success: true, message: 'Order received, recorded and email sent' });
    } catch (error) {
        console.error('Error processing new order:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// 2. Webhook to receive WhatsApp Messages (Meta Cloud API)
app.get('/webhook/whatsapp', (req, res) => {
    // Webhook Verification (required by Meta)
    const verify_token = process.env.WHATSAPP_VERIFY_TOKEN;
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === verify_token) {
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
});

app.post('/webhook/whatsapp', async (req, res) => {
    // Return 200 immediately to WhatsApp server to acknowledge receipt
    res.sendStatus(200);

    const body = req.body;

    if (body.object && body.entry && body.entry[0].changes && body.entry[0].changes[0].value.messages && body.entry[0].changes[0].value.messages[0]) {
        const value = body.entry[0].changes[0].value;
        const phoneNumberId = value.metadata.phone_number_id;
        const from = value.messages[0].from; // sender phone number
        const msgBody = value.messages[0].text ? value.messages[0].text.body : '';

        console.log(`[ORIGIN: WHATSAPP] Message received from ${from}: ${msgBody}`);

        try {
            // General support logic - Greeting and FAQ
            let replyMsg = '';
            const lowerMsg = msgBody.toLowerCase();

            if (lowerMsg.includes('hola') || lowerMsg.includes('buenas')) {
                replyMsg = "¡Hola! Bienvenido al Servicio de Atención de Cracx. Soy tu asistente virtual. ¿En qué podemos ayudarte hoy?\n\n1. Consultar mi pedido\n2. Hablar con un humano\n3. Información sobre sabores";
            } else if (lowerMsg.includes('pedido') || lowerMsg.includes('seguimiento')) {
                replyMsg = "Para consultar el estado de tu pedido, por favor revisa el correo electrónico de confirmación que te enviamos al momento de la compra. Allí encontrarás un enlace de seguimiento en tiempo real.";
            } else if (lowerMsg.includes('sabores') || lowerMsg.includes('xilitol')) {
                replyMsg = "Nuestros caramelos Cracx están hechos con 100% Xilitol natural. Tenemos 4 sabores: Menta Fresca, Cereza Intensa, Sandía Jugosa y Limón Cítrico. Todos son sin azúcar y cuidan tu salud dental.";
            } else {
                replyMsg = "He recibido tu mensaje. Un agente de nuestro equipo se pondrá en contacto contigo pronto por este mismo canal para resolver tus dudas.";
            }

            await sendWhatsAppMessage(phoneNumberId, from, replyMsg);
        } catch (error) {
            console.error('Error handling WhatsApp query:', error.message);
        }
    }
});

async function sendWhatsAppMessage(phoneNumberId, to, text) {
    const token = process.env.WHATSAPP_API_TOKEN;
    if (!token) {
        console.warn('WHATSAPP_API_TOKEN missing. Message not sent:', text);
        return;
    }
    await axios({
        method: 'POST',
        url: `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`,
        data: {
            messaging_product: 'whatsapp',
            to: to,
            text: { body: text },
        },
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
