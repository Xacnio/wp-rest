const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('../config');
const morgan = require('morgan');

function CreateApi(client) {
    app.use(bodyParser.json());
    app.use(morgan('common'))

    require('./middlewares/whitelist')(app);

    app.use((req, res, next) => {
        res.client = client;
        next();
    })

    require('./routes/textmessage')(app);

    app.listen(config.port, config.hostname, () => {
        console.log(`API is running on port ${config.port} (Host: ${config.hostname})`);
    });
}

module.exports = {
    CreateApi,
}