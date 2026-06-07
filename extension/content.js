const pageData = {
    url: window.location.href,
    title: document.title,
    content: document.body.innerText.substring(0,500)
};

let risk = 0;
let reasons = [];

if(pageData.url.includes("login")){
    risk += 20;
 reasons.push("Contains login keyword");
}
if(pageData.url.includes("verify")){
    risk += 20;
reasons.push("Contains verify keyword");
}

if(pageData.url.length > 60){
    risk += 10;
reasons.push("URL is unusually long");
}
let status = "Safe";

if(risk >= 30)
    status = "Suspicious";

chrome.storage.local.set({
    pageData,
    risk,
    status,
    reasons
});

console.log("Risk Score:", risk);
console.log(pageData);
console.log(reasons);