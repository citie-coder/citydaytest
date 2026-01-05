/**
 * Anti-automation middleware that blocks automated traffic, including search bots.
 */

const SUSPICIOUS_SIGNATURES = [
    'headless',
    'phantomjs',
    'selenium',
    'puppeteer',
    'playwright',
    'scrapy',
    'googlebot',
    'bingbot',
    'duckduckbot',
    'baiduspider',
    'yandexbot',
    'facebookexternalhit',
    'slurp',
    'applebot',
    'httpclient',
    'libwww',
    'wget',
    'curl',
    'python-requests',
    'postmanruntime',
    'axios',
    'java/',
    'go-http-client',
    'httpunit'
];

const {
    ANTIBOT_REQUIRED_HEADER = 'x-platform-token',
    ANTIBOT_SECRET_VALUE = '',
    ANTIBOT_TRUSTED_IPS = '127.0.0.1,::1',
    ANTIBOT_TRUSTED_AGENTS = 'nodemailer,node-fetch',
    ANTIBOT_TRUSTED_PATHS = ''
} = process.env;

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 120;
const requestBuckets = new Map();

const trustedIps = ANTIBOT_TRUSTED_IPS.split(',')
    .map(ip => ip.trim())
    .filter(Boolean);

const trustedAgents = ANTIBOT_TRUSTED_AGENTS.split(',')
    .map(agent => agent.trim().toLowerCase())
    .filter(Boolean);

const trustedPaths = ANTIBOT_TRUSTED_PATHS.split(',')
    .map(path => path.trim())
    .filter(Boolean);

const isSuspiciousUserAgent = userAgent =>
    SUSPICIOUS_SIGNATURES.some(sig => userAgent.includes(sig));

const isTrustedIp = ip =>
    !!ip && trustedIps.some(trusted => trusted === ip);

const isTrustedAgent = userAgent =>
    !!userAgent && trustedAgents.some(agent => userAgent.includes(agent));

const isTrustedPath = path =>
    !!path && trustedPaths.some(trusted => path.startsWith(trusted));

const hasSuspiciousHeaders = req => {
    const acceptLanguage = req.get('Accept-Language');
    const accept = req.get('Accept');
    const secFetchSite = req.get('Sec-Fetch-Site');

    let score = 0;
    if (!accept || accept === '*/*') score += 1;
    if (!acceptLanguage) score += 1;
    if (secFetchSite === 'none' || secFetchSite === 'cross-site') score += 1;

    return score >= 2;
};

const isLikelyModernBrowser = (req, userAgent) => {
    if (!userAgent) return false;
    const secChUa = req.get('sec-ch-ua');
    const upgradeInsecure = req.get('upgrade-insecure-requests');
    const chromeLike = userAgent.includes('chrome/') || userAgent.includes('safari/') || userAgent.includes('firefox/');
    return chromeLike && (secChUa || upgradeInsecure);
};

const isRateLimited = ip => {
    if (!ip) return false;
    const now = Date.now();
    const bucket = requestBuckets.get(ip);

    if (!bucket || now - bucket.start > RATE_LIMIT_WINDOW_MS) {
        requestBuckets.set(ip, { start: now, count: 1 });
        return false;
    }

    bucket.count += 1;
    requestBuckets.set(ip, bucket);
    return bucket.count > RATE_LIMIT_MAX_REQUESTS;
};

const hasValidHumanToken = req => {
    if (!ANTIBOT_SECRET_VALUE) return true;
    const headerValue = req.get(ANTIBOT_REQUIRED_HEADER);
    return headerValue && headerValue === ANTIBOT_SECRET_VALUE;
};

const botDetection = (req, res, next) => {
    const userAgent = (req.get('User-Agent') || '').toLowerCase();
    const ip = req.ip || req.connection?.remoteAddress;

    res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');

    const hasTrustedToken = hasValidHumanToken(req);

    if (isTrustedIp(ip) || isTrustedAgent(userAgent) || isTrustedPath(req.path)) {
        req.botShield = { automationLikely: false, reason: 'trusted-source' };
        return next();
    }

    if (!userAgent) {
        req.botShield = { automationLikely: true, reason: 'missing-user-agent' };
    }

    if (!hasTrustedToken) {
        req.botShield = { automationLikely: true, reason: 'missing-platform-token' };
    }

    const suspiciousUA = userAgent && isSuspiciousUserAgent(userAgent);
    const suspiciousHeaders = hasSuspiciousHeaders(req);
    const rateLimited = isRateLimited(ip);

    if (!suspiciousUA && !rateLimited && suspiciousHeaders && isLikelyModernBrowser(req, userAgent) && hasTrustedToken) {
        req.botShield = { automationLikely: false, reason: 'modern-browser' };
        return next();
    }

    if (suspiciousUA || suspiciousHeaders || rateLimited || req.botShield?.automationLikely || !hasTrustedToken) {
        const reason = [
            suspiciousUA ? 'ua-signature' : null,
            suspiciousHeaders ? 'headers' : null,
            rateLimited ? 'rate-limit' : null,
            !hasTrustedToken ? 'missing-token' : null,
            req.botShield?.reason || null
        ].filter(Boolean).join(',');

        console.warn(`Bot blocked (${reason}) from ${ip || 'unknown'} using UA: ${userAgent || 'N/A'}`);

        return res.status(403).json({
            message: 'Access denied',
            reason: 'Automated traffic detected',
            diagnostics: process.env.NODE_ENV === 'development' ? reason : undefined
        });
    }

    req.botShield = { automationLikely: false, reason: 'passed-checks' };
    next();
};

module.exports = botDetection;
