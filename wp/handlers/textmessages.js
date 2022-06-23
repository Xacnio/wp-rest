var textMessageHandlers = [];

function newTextCommandHandler(pattern, func) {
    var handler = {
        pattern: `^[!\/]${pattern}$`,
        function: func,
    };
    textMessageHandlers.push(handler);
}

function newTextMessageHandler(pattern, func) {
    textMessageHandlers.push({
        pattern: pattern,
        function: func,
    });
}

function handleTextMessage(msg, client) {
    if (!msg.hasMedia) {
        textMessageHandlers.map(async (handler) => {
            if (new RegExp(handler.pattern).test(msg.body)) {
                msg.matches = msg.body.match(handler.pattern);
                await handler.function(msg, client);
            }
        })
    }
}

module.exports = {
    newTextCommandHandler,
    newTextMessageHandler,
    handleTextMessage,
}