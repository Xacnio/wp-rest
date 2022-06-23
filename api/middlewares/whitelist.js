const whitelist = require("../../config/whitelist");
const requestIp = require('request-ip');

module.exports = (app) => {
    app.use((req, res, next) => {
        const clientIp = requestIp.getClientIp(req);
        for (var i = 0; i < whitelist.length; i++) {
            if (whitelist[i] === clientIp) {
                next();
                return;
            }
        }
        res.status(403).json({ error: "Forbidden", ip: clientIp, });
    })
}