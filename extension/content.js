const pageData = {
    url: window.location.href,
    title: document.title,
    content: document.body.innerText.substring(0,500)
};

let risk = 0;

if(pageData.url.includes("login"))
    risk += 20;

if(pageData.url.includes("verify"))
    risk += 20;

if(pageData.url.length > 60)
    risk += 10;

let status = "Safe";

if(risk >= 30)
    status = "Suspicious";

chrome.storage.local.set({
    pageData,
    risk,
    status
});

console.log("Risk Score:", risk);
console.log(pageData);