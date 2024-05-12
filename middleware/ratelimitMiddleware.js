const configs = require("../configs")

const reqCounts = {};

// Reset counter every 'configs.rateLimitInterval' for each IP
setInterval(() => {
    Object.keys(reqCounts).forEach(ip => (reqCounts[ip] = 0));
}, configs.rateLimitInterval);

module.exports = (req, res, next) => {

    // Update request counter
    reqCounts[req.ip] = (reqCounts[req.ip] || 0) + 1;

    if (reqCounts[req.ip] > configs.rateLimit) {
        return res.status(429).json({
            code: 429,
            status: 'Error',
            message: "Rate limit exceeded.",
            data: null
        });
    }

    next(); // Continue if rate limit not exceeded
}
