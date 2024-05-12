const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { createProxyMiddleware } = require("http-proxy-middleware");
const configs = require('./configs');
const { ratelimit, timeout } = require('./middleware');

console.log("Configs: ", configs);

// Create express app instance
const app = express();

// Setup middleware
app.use(cors()); // Enable cors requests
app.use(helmet()); // Add security headers
app.disable("x-powered-by") // Hide Express server information

// Define proxies for each routes defined in 'configs.services'
configs.services.forEach(({route, target}) => {
    const opt = {
        target, 
        changeOrigin: true,
    }

    app.use(route, ratelimit, timeout, createProxyMiddleware(opt));
});

// Start Express server
app.listen(configs.port, () => {
    console.log(`Gateway is running on ${configs.port}`);
});