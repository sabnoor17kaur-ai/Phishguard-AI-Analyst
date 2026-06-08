const trustedDomains = [
    "github.com",
    "google.com",
    "leetcode.com",
    "linkedin.com",
    "amazon.com",
    "microsoft.com"
];

const pageData = {
    url: window.location.href,
    title: document.title,
    content: document.body.innerText.substring(0, 500)
};

const hostname = window.location.hostname;

let trusted = false;

trustedDomains.forEach(domain => {
    if (hostname.includes(domain)) {
        trusted = true;
    }
});

let risk = 0;
let reasons = [];

// Risk Rules
if (pageData.url.includes("login")) {
    risk += 20;
    reasons.push("Contains login keyword");
}

if (pageData.url.includes("verify")) {
    risk += 20;
    reasons.push("Contains verify keyword");
}

if (pageData.url.includes("password")) {
    risk += 15;
    reasons.push("Contains password keyword");
}

if (pageData.url.includes("update")) {
    risk += 15;
    reasons.push("Contains update keyword");
}

if (pageData.url.includes("account")) {
    risk += 10;
    reasons.push("Contains account keyword");
}

if (pageData.url.length > 60) {
    risk += 10;
    reasons.push("URL is unusually long");
}
let analysis = "";

if(risk === 0){
    analysis =
    "No suspicious indicators were detected on this webpage.";
}
else if(risk <= 20){
    analysis =
    "Low risk indicators detected. Verify the website before entering sensitive information.";
}
else if(risk <= 50){
    analysis =
    "Several phishing indicators were detected. Proceed with caution.";
}
else{
    analysis =
    "High phishing risk detected. Avoid entering credentials or personal information.";
}

// Risk Level
let level = "Safe";

if (risk > 0 && risk <= 20) {
    level = "Low Risk";
}
else if (risk > 20 && risk <= 50) {
    level = "Medium Risk";
}
else if (risk > 50) {
    level = "High Risk";
}

// Status
let status = "Safe";

if (risk >= 20) {
    status = "Suspicious";
}

// Store Data
console.log("Analysis Generated:", analysis);

chrome.storage.local.set({
    pageData,
    risk,
    status,
    reasons,
    level,
    analysis
});

console.log("Risk Score:", risk);
console.log("Risk Level:", level);
console.log("Status:", status);
console.log("Reasons:", reasons);
console.log("Trusted Domain:", trusted);
console.log(pageData);
console.log("Analysis Stored:", analysis);