chrome.storage.local.get(null, (data) => {

    console.log("Popup Data:", data);
    console.log("Analysis Value:", data.analysis);

    // URL
    if(data.pageData){
        document.getElementById("url").innerText =
            data.pageData.url;

        document.getElementById("title").innerText =
            data.pageData.title;
    }

    // Risk Score
    document.getElementById("risk").innerText =
        data.risk || 0;

    // Risk Level
    document.getElementById("level").innerText =
        data.level || "Safe";

    // AI Analysis
    document.getElementById("analysis").innerText =
        data.analysis || "No analysis available";

    // Status
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

    // Threat Meter
    const meter =
        document.getElementById("meter-fill");

    meter.style.width =
        Math.min(data.risk || 0, 100) + "%";

    if((data.risk || 0) <= 20){
        meter.style.backgroundColor = "green";
    }
    else if((data.risk || 0) <= 50){
        meter.style.backgroundColor = "orange";
    }
    else{
        meter.style.backgroundColor = "red";
    }

    // Reasons
    const reasonsList =
        document.getElementById("reasons");

    reasonsList.innerHTML = "";

    if(data.reasons && data.reasons.length > 0){

        data.reasons.forEach(reason => {

            const li =
                document.createElement("li");

            li.textContent = reason;

            reasonsList.appendChild(li);
        });
    }
    else{

        const li =
            document.createElement("li");

        li.textContent =
            "No suspicious indicators found";

        reasonsList.appendChild(li);
    }

});