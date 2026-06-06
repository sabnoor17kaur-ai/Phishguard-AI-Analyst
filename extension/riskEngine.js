function calculateRisk(url, title, content) {

    let risk = 0;

    if(url.includes("@"))
        risk += 30;

    if(url.includes("login"))
        risk += 20;

    if(url.includes("verify"))
        risk += 20;

    if(url.length > 60)
        risk += 10;

    return risk;
}