const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const THandler = require('./handlers/textmessages');
const { CreateApi } = require('../api');

require('./commands/ping');

function initWp() {
    const client = new Client({
        authStrategy: new LocalAuth()
    });

    client.on('qr', (qr) => {
        qrcode.generate(qr, { small: true });
    });

    client.on('ready', () => {
        console.log('Whatsapp Web is ready!');
    });

    client.on('message', function (msg) {
        THandler.handleTextMessage(msg, client);
    });

    CreateApi(client);
    client.initialize();
}

module.exports = {
    initWp
}