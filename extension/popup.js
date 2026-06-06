chrome.storage.local.get(null, (data) => {

    console.log("Popup Data:", data);

    document.getElementById("url").textContent =
        data.pageData ? data.pageData.url : "No URL";

    document.getElementById("title").textContent =
        data.pageData ? data.pageData.title : "No Title";

    document.getElementById("risk").textContent =
        data.risk ?? 0;

    document.getElementById("status").textContent =
        data.status ?? "Safe";
});