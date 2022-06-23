const { phone } = require("phone");
const { CheckWp } = require("../middlewares/wacheck");

module.exports = (app) => {
    app.post("/sendMessage", CheckWp, async (req, res) => {
        var data = {
            phone: (typeof req.body.phone !== "undefined") ? req.body.phone.trim().replace(new RegExp("([^0-9+()]*)", 'gi'), "") : "",
            text: (typeof req.body.text === "string") ? req.body.text.trim() : "",
        };
        if (data.phone === "" || data.text === "") {
            res.status(400).json({ error: "Missing parameters" });
            return;
        }
        const phoneCheck = phone(data.phone);
        if (!phoneCheck.isValid) {
            res.status(400).json({ error: "Invalid phone number" });
            return;
        }
        const number = await res.client.getNumberId(phoneCheck.phoneNumber);
        const result = await res.client.sendMessage(number._serialized, data.text);
        res.status(200).json({ error: false, result });
    })
}