const https = require('https');
const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\34620\\.gemini\\antigravity\\playground\\harmonic-quasar\\web\\sparkle-smiles-ai-main\\src\\assets';

const files = {
    'cracx-logo.png': 'https://cracxilitol.com/wp-content/uploads/2025/08/LOGO2_CRACX_Degradado_vectorizado-1-1-2-2-scaled.png',
    'cracx-cereza.jpg': 'https://cracxilitol.com/wp-content/uploads/2025/08/Foto-caja-cerrada-cereza--300x300.jpg',
    'cracx-limon.jpg': 'https://cracxilitol.com/wp-content/uploads/2025/08/Foto-caja-cerrada-limon-300x300.jpg',
    'cracx-menta.jpg': 'https://cracxilitol.com/wp-content/uploads/2025/08/Foto-caja-cerrada-menta--300x300.jpg',
    'cracx-sandia.jpg': 'https://cracxilitol.com/wp-content/uploads/2025/08/Foto-caja-cerrada-Sandia--300x300.jpg',
    'cracx-group.jpg': 'https://cracxilitol.com/wp-content/uploads/2025/08/4-sabores-caja-cerrada-fuera-del-paquete-frontal--scaled.jpg'
};

Object.entries(files).forEach(([filename, url]) => {
    https.get(url, (res) => {
        const filePath = path.join(dir, filename);
        const writeStream = fs.createWriteStream(filePath);
        res.pipe(writeStream);
        writeStream.on('finish', () => {
            writeStream.close();
            console.log('Downloaded', filename);
        });
    });
});
