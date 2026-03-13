import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, User, Bot, ShoppingCart } from "lucide-react";

const QUICK_REPLIES = [
    { id: "pedido", label: "📦 Mi Pedido" },
    { id: "sabores", label: "🍬 Sabores" },
    { id: "humano", label: "👤 Hablar con agente" },
    { id: "xilitol", label: "🦷 ¿Qué es el Xilitol?" }
];

const PRODUCTS = [
    { id: 1, name: "Menta Fresca", price: "8.99€", image: "/src/assets/cracx-menta.jpg", desc: "Clásico refrescante" },
    { id: 2, name: "Cereza Intensa", price: "8.99€", image: "/src/assets/cracx-cereza.jpg", desc: "Dulce y potente" },
    { id: 3, name: "Sandía Jugosa", price: "8.99€", image: "/src/assets/cracx-sandia.jpg", desc: "Toque veraniego" },
    { id: 4, name: "Limón Cítrico", price: "8.99€", image: "/src/assets/cracx-limon.jpg", desc: "Ácido y estimulante" }
];

interface Message {
    id: number;
    text?: string;
    sender: "bot" | "user";
    type?: "text" | "gallery";
    products?: typeof PRODUCTS;
}

const ChatbotWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "¡Hola! Soy el asistente virtual de Cracx. ¿En qué puedo ayudarte hoy?", sender: "bot", type: "text" }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [showQuickReplies, setShowQuickReplies] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const processResponse = (input: string) => {
        let reply = "";
        let type: "text" | "gallery" = "text";
        const lowerMsg = input.toLowerCase();

        if (lowerMsg.includes('hola') || lowerMsg.includes('buenas')) {
            reply = "¡Hola! Bienvenido al Servicio de Atención de Cracx. Soy tu asistente virtual. ¿En qué podemos ayudarte hoy?";
        } else if (lowerMsg.includes('pedido') || lowerMsg.includes('seguimiento')) {
            reply = "Para consultar el estado de tu pedido, por favor revisa el correo electrónico de confirmación que te enviamos al momento de la compra. Allí encontrarás un enlace de seguimiento en tiempo real.";
        } else if (lowerMsg.includes('sabores')) {
            reply = "¡Claro! Aquí tienes nuestros 4 sabores estrella. Todos son 100% naturales y sin azúcar:";
            setMessages(prev => [...prev, { id: Date.now() + 1, text: reply, sender: "bot", type: "text" }]);

            setTimeout(() => {
                setMessages(prev => [...prev, { id: Date.now() + 2, sender: "bot", type: "gallery", products: PRODUCTS }]);
                setShowQuickReplies(true);
            }, 800);
            return;
        } else if (lowerMsg.includes('xilitol')) {
            reply = "El Xilitol es un edulcorante natural que ayuda a prevenir caries y neutraliza los ácidos en la boca. ¡Es el secreto de Cracx para una sonrisa sana!";
        } else if (lowerMsg.includes('humano') || lowerMsg.includes('agente')) {
            reply = "Entendido. He pasado tu solicitud a mi equipo humano. En unos minutos se pondrán en contacto contigo por este mismo chat.";
        } else {
            reply = "He recibido tu mensaje. ¿Quieres que te ayude con algo más específico?";
        }

        setMessages(prev => [...prev, { id: Date.now() + 1, text: reply, sender: "bot", type: "text" }]);
        setShowQuickReplies(true);
    };

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim()) return;

        const userMsg = inputValue.trim();
        setMessages(prev => [...prev, { id: Date.now(), text: userMsg, sender: "user", type: "text" }]);
        setInputValue("");
        setShowQuickReplies(false);

        setTimeout(() => {
            processResponse(userMsg);
        }, 1000);
    };

    const handleQuickReply = (reply: string) => {
        setMessages(prev => [...prev, { id: Date.now(), text: reply, sender: "user", type: "text" }]);
        setShowQuickReplies(false);

        setTimeout(() => {
            processResponse(reply);
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="bg-card border border-border rounded-2xl shadow-2xl w-80 sm:w-96 mb-4 flex flex-col overflow-hidden"
                        style={{ height: "600px" }}
                    >
                        {/* Header */}
                        <div className="bg-primary p-4 text-primary-foreground flex justify-between items-center shadow-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                    <Bot size={18} />
                                </div>
                                <div>
                                    <p className="font-bold text-sm">Asistente Cracx</p>
                                    <p className="text-[10px] opacity-80">En línea ahora</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                                    <div className={`flex gap-2 max-w-[90%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                                            {msg.sender === "user" ? <User size={12} /> : <Bot size={12} />}
                                        </div>

                                        {msg.type === "gallery" ? (
                                            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
                                                {msg.products?.map((product) => (
                                                    <div key={product.id} className="min-w-[160px] bg-card border border-border rounded-xl overflow-hidden shadow-sm snap-start">
                                                        <img src={product.image} alt={product.name} className="w-full h-24 object-cover" />
                                                        <div className="p-2 space-y-1">
                                                            <p className="text-[11px] font-bold truncate">{product.name}</p>
                                                            <p className="text-[10px] text-muted-foreground leading-tight line-clamp-1">{product.desc}</p>
                                                            <div className="flex justify-between items-center pt-1">
                                                                <span className="text-[11px] font-bold text-primary">{product.price}</span>
                                                                <button className="bg-primary text-primary-foreground p-1 rounded-md">
                                                                    <ShoppingCart size={10} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className={`p-3 rounded-2xl text-sm whitespace-pre-wrap ${msg.sender === "user" ? "bg-primary text-primary-foreground rounded-tr-none shadow-md" : "bg-card border border-border text-foreground rounded-tl-none shadow-sm"}`}>
                                                {msg.text}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {showQuickReplies && (
                                <div className="flex flex-wrap gap-2 mt-2 pl-8">
                                    {QUICK_REPLIES.map((option) => (
                                        <button
                                            key={option.id}
                                            onClick={() => handleQuickReply(option.label)}
                                            className="bg-primary/10 hover:bg-primary/20 text-primary text-[11px] font-semibold py-1.5 px-3 rounded-full transition-colors border border-primary/20"
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSend} className="p-4 bg-card border-t border-border flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Escribe tu duda..."
                                className="flex-1 bg-muted/50 border-none focus:ring-1 focus:ring-primary rounded-full px-4 py-2 text-sm outline-none"
                            />
                            <button type="submit" className="bg-primary text-primary-foreground p-2 rounded-full hover:opacity-90 transition-opacity shadow-md">
                                <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="bg-primary text-primary-foreground w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:opacity-95 transition-opacity"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
            </motion.button>
        </div>
    );
};

export default ChatbotWidget;
