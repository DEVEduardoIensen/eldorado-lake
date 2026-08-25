const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
    const acceptHeader = req.headers['accept'] || '';
    
    // Set caching and Vary header compliant with acceptmarkdown.com
    res.setHeader('Vary', 'Accept, Accept-Encoding');
    res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400');

    try {
        const filePath = path.join(process.cwd(), 'llms.txt');
        const content = fs.readFileSync(filePath, 'utf8');
        
        res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
        return res.status(200).send(content);
    } catch (err) {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        return res.status(200).send('# Eldorado Lake - Pesca Esportiva ao Dourado\nhttps://www.eldoradolake.com.br');
    }
};
