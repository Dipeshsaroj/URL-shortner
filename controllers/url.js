const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
    try {
        console.log("Request received");
        console.log(req.body);

        const body = req.body;

        const shortId = shortid();

        console.log("Before create");

        const result = await URL.create({
            shortId,
            redirectURL: body.url,
            visitHistory: [],
        });

        console.log("After create");
        console.log(result);

        return res.json({ shortId });
    } catch (err) {
        console.error("ERROR:", err);
        return res.status(500).json({
            error: err.message,
        });
    }
}
async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;

    const result = await URL.findOne({ shortId });
    if (!result) {
        return res.status(404).json({ error: "Short URL not found" });
    }

    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}
module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
};