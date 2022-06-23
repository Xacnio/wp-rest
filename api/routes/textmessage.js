const PNF = require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const config = require('../../config');
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
        const parsedNumber = phoneUtil.parse(data.phone, config.defaultPhoneCountry);
        if (!phoneUtil.isValidNumber(parsedNumber)) {
            res.status(400).json({ error: "Invalid phone number" });
            return;
        }
        try {
            const number = await res.client.getNumberId(phoneUtil.format(parsedNumber, PNF.E164));
            if (number == null) {
                res.status(400).json({ error: "Phone number not in WhatsApp" });
                return;
            }
            const result = await res.client.sendMessage(number._serialized, data.text);
            res.status(200).json({ error: false, result });
        } catch (err) {
            console.error(err)
            res.status(500).json({ error: err.toString() });
        }
    })
}