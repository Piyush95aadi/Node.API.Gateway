const configs = require("../configs");

module.exports = (req, res, next) => {

    // Set timeout for each request
    // Helps in handling time out cases with either graceful error handling or loadbalancing req to another server
    req.setTimeout(configs.requestTimeoutMS, () => {
        req.status(504).status({
            code: 504,
            status: 'Error',
            message: 'Gateway timeout.',
            data: null
        });
        req.abort(); // Abort request 
    });

    next();
}