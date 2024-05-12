module.exports = {
    port: 5000,
    rateLimit: 20,
    rateLimitInterval: 60 * 1000, // 1 Min in Miliseconds
    requestTimeoutMS: 15000,
    services: require("./services.js"),
}