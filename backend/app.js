async function scanWebsite(pageData){

    const response =
    await fetch(
        "http://localhost:5000/scan",
        {
            method: "POST",
            headers: {
                "Content-Type":
                "application/json"
            },
            body: JSON.stringify(pageData)
        }
    );

    return await response.json();
}