const express = require("express");
const URL = require("../models/url"); // Go up one level to access models
const router = express.Router();

// This route renders your home page with all the URLs
router.get("/", async (req, res) => {
    const allUrls = await URL.find({});
    
    return res.render("home", {
        urls: allUrls,
    });
});

module.exports = router;