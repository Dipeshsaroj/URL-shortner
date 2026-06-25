const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
    try {
        const body = req.body;
        const originalUrl = body.url;

        if (!originalUrl) {
            throw new Error("Original URL is required");
        }

        let shortId = body.customAlias && body.customAlias.trim();
        if (shortId) {
            const aliasPattern = /^[A-Za-z0-9_-]{3,30}$/;
            if (!aliasPattern.test(shortId)) {
                return res.status(400).json({
                    error: "Custom alias must be 3-30 characters and contain only letters, numbers, -, or _",
                });
            }

            const existing = await URL.findOne({ shortId });
            if (existing) {
                return res.status(400).json({
                    error: "This custom alias is already taken. Please choose another one.",
                });
            }
        } else {
            shortId = shortid();
        }

        const expirationDays = parseInt(body.expirationDays, 10);
        const expirationDate = Number.isInteger(expirationDays) && expirationDays > 0
            ? new Date(Date.now() + expirationDays * 24 * 60 * 60 * 1000)
            : undefined;

        const result = await URL.create({
            shortId,
            redirectURL: originalUrl,
            expirationDate,
            visitHistory: [],
        });

        if (req.headers.accept && req.headers.accept.includes("text/html")) {
            const query = new URLSearchParams({ id: shortId });
            return res.redirect(`/?${query.toString()}`);
        }

        return res.json({ shortId, expirationDate });
    } catch (err) {
        console.error("ERROR:", err);
        if (req.headers.accept && req.headers.accept.includes("text/html")) {
            const encoded = encodeURIComponent(err.message);
            return res.redirect(`/?error=${encoded}`);
        }

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
        shortId: result.shortId,
        redirectURL: result.redirectURL,
        createdAt: result.createdAt,
        expirationDate: result.expirationDate,
        isExpired: result.expirationDate ? result.expirationDate.getTime() < Date.now() : false,
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}
module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
};