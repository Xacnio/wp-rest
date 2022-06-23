const THandler = require('../handlers/textmessages');

THandler.newTextCommandHandler("ping", async (msg) => {
    const start = Date.now();
    await msg.reply("```Pong!```", { parse_mode: "Markdown" });
    const millis = (Date.now() - start) / 100;
    await msg.reply("```" + millis + "ms```");
});