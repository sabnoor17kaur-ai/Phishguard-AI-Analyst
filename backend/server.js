require("dotenv").config();
console.log("API Key Loaded:", process.env.GEMINI_API_KEY ? "YES" : "NO");
const { GoogleGenAI } = require("@google/genai");
const express = require("express");
const cors = require("cors");

const app = express();
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.json({
        message: "PhishGuard API Running"
    });
});

// Scan Route
app.post("/scan", async (req, res) => {

    console.log("SCAN HIT");
    console.log(req.body);

    const { url, title } = req.body;

    let risk = 0;
    let reasons = [];

    if (url.includes("login")) {
        risk += 20;
        reasons.push("Contains login keyword");
    }

    if (url.includes("verify")) {
        risk += 20;
        reasons.push("Contains verify keyword");
    }

    if (url.includes("password")) {
        risk += 15;
        reasons.push("Contains password keyword");
    }

    if (url.length > 60) {
        risk += 10;
        reasons.push("URL is unusually long");
    }

    let status =
        risk >= 20 ? "Suspicious" : "Safe";

    let analysis = "";

    try {

        const prompt = `
Analyze this webpage for phishing risk.

URL: ${url}
Title: ${title}

Risk Score: ${risk}
Reasons: ${reasons.join(", ")}

Give a short cybersecurity explanation for a user.
Maximum 3 sentences.
`;

        const response = await ai.models.generateContent({
           model: "gemini-2.0-flash-lite",
            contents: prompt
        });

        analysis = response.text;

    } catch (error) {

        console.error("Gemini Error:", error);

        analysis =
`Gemini temporarily unavailable. Risk Score: ${risk}. Please review the detected indicators carefully.`;
    }
console.log("GEMINI ANALYSIS:", analysis);
    res.json({
        risk,
        status,
        reasons,
        analysis
    });

});

// app.get("/test-gemini", async (req, res) => {

//     try {

//         const response = await ai.models.generateContent({
//             model: "gemini-2.5-flash",
//             contents: "Say hello"
//         });

//         res.json({
//             success: true,
//             text: response.text
//         });

//     } catch (error) {

//         console.error("TEST ERROR:", error);

//         res.json({
//             success: false,
//             error: String(error),
//             details: error.message
//         });
//     }

// });
// Start Server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});