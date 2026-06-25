const mongoose = require("mongoose");

// Schema

const urlSchema = new mongoose.Schema(
    {
        shortId: {
            type: String,
            required: true,
            unique: true,
        },
        redirectURL: {
            type: String,
            required: true,
        },
        expirationDate: {
            type: Date,
        },
        visitHistory: [
            {
                timestamp: {
                    type: Number,
                },
                userAgent: {
                    type: String,
                },
            },
        ],
    },
    { timestamps: true }
);

const URL = mongoose.model("url", urlSchema);

module.exports = URL;