chrome.tabs.query(
    {
        active: true,
        currentWindow: true
    },

    function(tabs) {
        document.getElementById("url").innerText =
            tabs[0].url;
    }
);
