// const express = require("express");
// const path = require("path");
// const app = express();

// const URL = require("./models/url");
// const { connectToMongoDB } = require("./connect");
// const PORT = 8000;

// const urlRoute = require("./routers/url");

// app.set("view engine", "ejs");
// app.set("views", path.resolve("./views"));

// app.use(express.json());

// // app.get("/test",(req,res)=>{
// //     return res.end("<h1>Hey from server</h1>");
// // });

// app.get("/test", async (req, res) => {
//     const allUrls = await URL.find({});

//     return res.render("home", {
//         urls: allUrls,
//     });
// });

// app.get("/url/:shortId", async (req, res) => {
//     const shortId = req.params.shortId;

//     const entry = await URL.findOneAndUpdate(
//         {
//             shortId,
//         },
//         {
//             $push: {
//                 visitHistory: {
//                     timestamp: Date.now(),
//                 },
//             },
//         }
//     );

//     if (!entry) {
//         return res.status(404).send("URL not found");
//     }

//     res.redirect(entry.redirectURL);
// });

// connectToMongoDB("mongodb://127.0.0.1:27017/shorturl")
//     .then(() => console.log("MongoDB Connected"));

// app.use("/url", urlRoute);

// app.listen(PORT, () =>
//     console.log(`Server Started at PORT: ${PORT}`)
// );

const express = require("express");
const path = require("path");
const app = express();

const URL = require("./models/url");
const { connectToMongoDB } = require("./connect");
const PORT = 8000;

const urlRoute = require("./routers/url");

// ADDED: Importing your new router file. 
// Note: If you named the file staticRouter.js, change this path to "./routers/staticRouter"
const shortRouter = require("./routers/staticRouter"); 

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());

// ADDED: This is highly recommended so Express can read the <form> data from your EJS file
app.use(express.urlencoded({ extended: false })); 

// app.get("/test",(req,res)=>{
//     return res.end("<h1>Hey from server</h1>");
// });

app.get("/test", async (req, res) => {
    const allUrls = await URL.find({});

    return res.render("home", {
        urls: allUrls,
    });
});

app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        }
    );

    if (!entry) {
        return res.status(404).send("URL not found");
    }

    res.redirect(entry.redirectURL);
});

connectToMongoDB("mongodb://127.0.0.1:27017/shorturl")
    .then(() => console.log("MongoDB Connected"));

app.use("/url", urlRoute);

app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;

    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        }
    );

    if (!entry) {
        return res.status(404).send("URL not found");
    }

    res.redirect(entry.redirectURL);
});

// ADDED: Connecting the router to your app
app.use("/", shortRouter); 

app.listen(PORT, () =>
    console.log(`Server Started at PORT: ${PORT}`)
);