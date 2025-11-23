/* PAGE SWITCHER */
function switchSection(id) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

/* --------------------------
   AI RECOMMENDATION LOGIC
--------------------------- */
document.getElementById("recForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const marks = parseFloat(marks.value);
    const budget = parseFloat(budget.value);
    const course = course.value || "your selected course";
    const pref = prefCountry.value;

    const result = generateAIrecommendation(marks, budget, course, pref);
    recResult.innerHTML = result;
});

function generateAIrecommendation(marks, budget, course, pref) {
    let chosen = pref;

    if (!chosen) {
        if (marks >= 75 && budget >= 25000) chosen = "USA";
        else if (marks >= 60 && budget >= 20000) chosen = "UK";
        else if (marks >= 55 && budget >= 15000) chosen = "Canada";
        else chosen = "Australia";
    }

    return `
        <h3>Recommended Country: ${chosen}</h3>
        <p>Based on your profile, <strong>${chosen}</strong> is the most suitable destination.</p>
        <p>Course Focus: ${course}</p>
        <p>Estimated Budget Fit: ${budget} USD</p>
    `;
}

/* --------------------------
   UNIVERSITY DATABASE (MOCK)
--------------------------- */
const universities = [
    { name: "Harvard University", country: "USA" },
    { name: "MIT", country: "USA" },
    { name: "University of Toronto", country: "Canada" },
    { name: "University of Melbourne", country: "Australia" },
    { name: "University of Oxford", country: "UK" },
    { name: "University of Sydney", country: "Australia" }
];

function filterUniversities() {
    const search = uniSearch.value.toLowerCase();
    const list = universities
        .filter(u => u.name.toLowerCase().includes(search) || u.country.toLowerCase().includes(search))
        .map(u => `
            <div class="uni-card">
                <strong>${u.name}</strong><br>
                Country: ${u.country}
            </div>
        `).join("");

    uniList.innerHTML = list;
}

filterUniversities();

/* --------------------------
   VISA ELIGIBILITY CHECKER
--------------------------- */
document.getElementById("visaForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const score = parseFloat(ielts.value);
    const balance = parseFloat(balance.value);
    const gapYears = parseFloat(gap.value);

    let message = "";

    if (score < 5.5) message = "Low IELTS score. Improve before applying.";
    else if (balance < 15000) message = "Insufficient bank balance.";
    else if (gapYears > 5) message = "Large study gap may require justification.";
    else message = "You are eligible to apply for student visa!";

    visaResult.innerHTML = `<h3>Visa Result</h3><p>${message}</p>`;
});

/* --------------------------
   LOGIN / SIGNUP (MOCK)
--------------------------- */
function loginUser() {
    authMsg.innerHTML = "<p style='color:green;'>Logged in successfully (mock)</p>";
    switchSection("dashboard");
}

function signupUser() {
    authMsg.innerHTML = "<p style='color:blue;'>Account created (mock)</p>";
}

function logoutUser() {
    switchSection("login");
    authMsg.innerHTML = "";
}
