
chrome.storage.local.get(null, (data) => {

    console.log("Popup Data:", data);

    if(data.pageData){

        document.getElementById("url").innerText =
            data.pageData.url;

        document.getElementById("title").innerText =
            data.pageData.title;
    }

    document.getElementById("risk").innerText =
        data.risk || 0;

    document.getElementById("status").innerText =
        data.status || "Safe";

    const statusElement =
        document.getElementById("status");

    if(data.status === "Safe"){
        statusElement.style.color = "green";
    }
    else{
        statusElement.style.color = "red";
    }


        const reasonsList =
    document.getElementById("reasons");

if(data.reasons){

    reasonsList.innerHTML = "";

    data.reasons.forEach(reason => {

        const li =
            document.createElement("li");

        li.textContent = reason;

        reasonsList.appendChild(li);
    });
}
});