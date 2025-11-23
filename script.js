document.getElementById("studentForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const marks = parseFloat(document.getElementById("marks").value);
    const budget = parseFloat(document.getElementById("budget").value);
    const preferredCountry = document.getElementById("country").value;
    const course = document.getElementById("course").value || "your chosen subject";

    const recommendation = getRecommendation(marks, budget, preferredCountry, course);

    const resultDiv = document.getElementById("result");
    resultDiv.style.display = "block";
    resultDiv.innerHTML = `
        <h3>Recommended Study Plan</h3>
        <p>${recommendation}</p>
    `;
});

function getRecommendation(marks, budget, preferredCountry, course) {

    // Basic AI-style logic (prototype)
    let country = preferredCountry;

    if (!country) {
        if (marks >= 75 && budget >= 25000) country = "USA";
        else if (marks >= 60 && budget >= 20000) country = "UK";
        else if (marks >= 55 && budget >= 15000) country = "Canada";
        else country = "Australia";
    }

    const messages = {
        "USA": `Great for STEM programs and research opportunities in ${course}.`,
        "UK": `Best for 1-year master’s programs and strong academic reputation.`,
        "Canada": `Affordable tuition, high visa success rate, and PR pathways.`,
        "Australia": `Good for flexible entry requirements and strong job market.`,
    };

    let budgetStatus = budget < 15000 ? 
        "Your budget is on the lower side. Consider applying for scholarships or community colleges." :
        "Your budget is suitable for most universities in your selected destination.";

    return `
        Based on your marks (${marks}%), budget (${budget} USD), and course preference (${course}), 
        <strong>${country}</strong> is the best match for you.<br><br>
        ${messages[country]}<br><br>
        ${budgetStatus}
    `;
}
