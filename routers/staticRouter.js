const express = require("express");
const QRCode = require("qrcode");
const URL = require("../models/url"); // Go up one level to access models
const router = express.Router();

// This route renders your home page with all the URLs
router.get("/", async (req, res) => {
    const allUrls = await URL.find({}).sort({ createdAt: -1 });
    let qrDataUrl;

    if (req.query.id) {
        const shortUrl = `${req.protocol}://${req.get("host")}/url/${req.query.id}`;
        try {
            qrDataUrl = await QRCode.toDataURL(shortUrl, { width: 200 });
        } catch (err) {
            console.error("QR generation failed:", err);
        }
    }

    return res.render("home", {
        urls: allUrls,
        id: req.query.id,
        error: req.query.error,
        qrDataUrl,
    });
});

module.exports = router;