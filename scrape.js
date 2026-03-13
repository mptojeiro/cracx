const https = require('https');
https.get('https://cracxilitol.com', (res) => {
    let data = '';
    res.on('data', (c) => data += c);
    res.on('end', () => {
        const urls = data.match(/https:\/\/[^"'\s<>]*\.(jpg|jpeg|png|webp)/gi);
        console.log(Array.from(new Set(urls)).filter(u => u.includes('cracx') || u.includes('caramelo')));
    });
});
