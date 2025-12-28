/**
 * Middleware to detect and block bots based on User-Agent
 */
const botDetection = (req, res, next) => {
    const userAgent = req.get('User-Agent') || '';

    // Extensive list of bot signatures including search engines, scanners, and tools
    const botSignatures = [
        'Headless', 'PhantomJS', 'Selenium', 'Puppeteer', 'Playwright',
        'bot', 'crawl', 'spider', 'slurp', 'facebookexternalhit',
        'google', 'bing', 'yahoo', 'duckduckgo', 'baidu', 'yandex',
        'ahrefs', 'mj12bot', 'semrush', 'dotbot', 'rogue',
        'namecheap', 'brandverity', 'monitor', 'scan', 'checker',
        'curl', 'wget', 'python', 'java', 'libwww', 'httpclient'
    ];

    const isBot = botSignatures.some(sig => userAgent.toLowerCase().includes(sig.toLowerCase()));

    // Always set anti-indexing headers
    res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');

    if (isBot) {
        console.log(`Bot blocked: ${userAgent}`);
        // Return 404 Not Found to mask the site's existence
        return res.status(404).send('Not Found');
    }

    next();
};

module.exports = botDetection;
