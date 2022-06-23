async function CheckWp(req, res, next) {
    const state = await res.client.getState() || null;
    if (state !== "CONNECTED") {
        res.status(503).json({ error: "WP not connected" });
    } else {
        next();
    }
}

module.exports = {
    CheckWp,
}