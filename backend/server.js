const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "PhishGuard API Running"
    });
});

app.post("/scan", (req, res) => {
   console.log("SCAN HIT");
console.log(req.body);
    const { url, title } = req.body;

    let risk = 0;
    let reasons = [];

    if(url.includes("login")){
        risk += 20;
        reasons.push("Contains login keyword");
    }

    if(url.includes("verify")){
        risk += 20;
        reasons.push("Contains verify keyword");
    }

    if(url.includes("password")){
        risk += 15;
        reasons.push("Contains password keyword");
    }

    if(url.length > 60){
        risk += 10;
        reasons.push("URL is unusually long");
    }

    let status =
        risk >= 20 ? "Suspicious" : "Safe";

    let analysis = "";

    if(risk === 0){
        analysis =
        "No suspicious indicators were detected on this webpage.";
    }
    else{
        analysis =
        "Potential phishing indicators found. Proceed carefully before entering sensitive information.";
    }

    res.json({
        risk,
        status,
        reasons,
        analysis
    });

});
app.listen(5000, () => {
    console.log("Server running on port 5000");
});

   