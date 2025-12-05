// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initAIMatcher();
    initCountries();
    initCalculator();
    initWhatsApp();
    updateStudentCount();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// AI Matcher Functionality
function initAIMatcher() {
    const marksSlider = document.getElementById('marks-slider');
    const marksValue = document.getElementById('marks-value');
    const budgetSelect = document.getElementById('budget-select');
    const fieldSelect = document.getElementById('field-select');
    const findMatchBtn = document.getElementById('find-match');
    const matchResult = document.getElementById('match-result');
    
    // Update marks value display
    marksSlider.addEventListener('input', function() {
        marksValue.textContent = this.value + '%';
    });
    
    // Find Match Button Click
    findMatchBtn.addEventListener('click', function() {
        const marks = parseInt(marksSlider.value);
        const budget = parseInt(budgetSelect.value);
        const field = fieldSelect.value;
        
        // Show loading state
        matchResult.innerHTML = `
            <div class="loading">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Analyzing your profile with AI...</p>
            </div>
        `;
        matchResult.style.display = 'block';
        
        // Simulate AI processing delay
        setTimeout(() => {
            const recommendations = getAIRecommendations(marks, budget, field);
            displayRecommendations(recommendations);
        }, 1500);
    });
}

// AI Recommendation Logic (Mock)
function getAIRecommendations(marks, budget, field) {
    const recommendations = [];
    
    // Define university database
    const universities = [
        {
            name: "Technical University of Munich",
            country: "Germany",
            flag: "🇩🇪",
            field: "cs",
            minMarks: 70,
            maxBudget: 20000,
            tuition: "€0-€3,000/year",
            match: 85,
            reason: "Excellent for engineering, low tuition fees"
        },
        {
            name: "University of Toronto",
            country: "Canada",
            flag: "🇨🇦",
            field: "mba",
            minMarks: 75,
            maxBudget: 30000,
            tuition: "$45,000/year",
            match: 78,
            reason: "Top-ranked business school, great for Nepali students"
        },
        {
            name: "University of Melbourne",
            country: "Australia",
            flag: "🇦🇺",
            field: "engineering",
            minMarks: 80,
            maxBudget: 35000,
            tuition: "AUD $40,000/year",
            match: 72,
            reason: "Strong engineering programs, post-study work opportunities"
        },
        {
            name: "University of Tokyo",
            country: "Japan",
            flag: "🇯🇵",
            field: "cs",
            minMarks: 85,
            maxBudget: 15000,
            tuition: "¥535,800/year",
            match: 65,
            reason: "Leading in technology, scholarship opportunities available"
        }
    ];
    
    // Filter and rank universities
    universities.forEach(uni => {
        if (marks >= uni.minMarks && budget <= uni.maxBudget) {
            let score = 0;
            
            // Calculate match score
            score += (marks / 100) * 40; // 40% weight on marks
            score += (budget / uni.maxBudget) * 30; // 30% on budget
            score += (field === uni.field) ? 30 : 10; // Field match bonus
            
            recommendations.push({
                ...uni,
                score: Math.min(Math.round(score), 95)
            });
        }
    });
    
    // Sort by score
    return recommendations.sort((a, b) => b.score - a.score);
}

// Display Recommendations
function displayRecommendations(recommendations) {
    const matchResult = document.getElementById('match-result');
    
    if (recommendations.length === 0) {
        matchResult.innerHTML = `
            <div class="no-match">
                <i class="fas fa-search"></i>
                <h4>No perfect matches found</h4>
                <p>Try adjusting your budget or considering different fields.</p>
                <p>Contact our counselors for personalized advice.</p>
            </div>
        `;
        return;
    }
    
    let html = '<h4><i class="fas fa-trophy"></i> Top AI Recommendations</h4>';
    
    recommendations.slice(0, 3).forEach((uni, index) => {
        html += `
            <div class="recommendation-card">
                <div class="uni-header">
                    <span class="uni-flag">${uni.flag}</span>
                    <strong>${uni.name}</strong>
                    <span class="match-badge">${uni.score}% Match</span>
                </div>
                <div class="uni-details">
                    <p><i class="fas fa-map-marker-alt"></i> ${uni.country}</p>
                    <p><i class="fas fa-money-bill-wave"></i> Tuition: ${uni.tuition}</p>
                    <p><i class="fas fa-lightbulb"></i> ${uni.reason}</p>
                </div>
                <button class="uni-details-btn" onclick="showUniversityDetails(${index})">
                    <i class="fas fa-info-circle"></i> View Details
                </button>
            </div>
        `;
    });
    
    html += `
        <div class="match-actions">
            <button class="save-match"><i class="fas fa-save"></i> Save Results</button>
            <button class="consult-match"><i class="fas fa-comments"></i> Talk to Counselor</button>
        </div>
    `;
    
    matchResult.innerHTML = html;
}

// Initialize Countries Section
function initCountries() {
    const countriesGrid = document.querySelector('.countries-grid');
    
    const countries = [
        {
            name: "Germany",
            flag: "🇩🇪",
            description: "World-class education with low or no tuition fees",
            stats: {
                tuition: "€0-€3,000",
                living: "€850-€1,200/month",
                visaSuccess: "92%"
            }
        },
        {
            name: "Canada",
            flag: "🇨🇦",
            description: "Post-study work opportunities & immigration pathways",
            stats: {
                tuition: "$15,000-$35,000",
                living: "$1,000-$1,500/month",
                visaSuccess: "88%"
            }
        },
        {
            name: "Australia",
            flag: "🇦🇺",
            description: "High-quality education with strong Nepali community",
            stats: {
                tuition: "AUD $20,000-$45,000",
                living: "AUD $1,400-$2,500/month",
                visaSuccess: "85%"
            }
        },
        {
            name: "USA",
            flag: "🇺🇸",
            description: "Top-ranked universities with extensive scholarships",
            stats: {
                tuition: "$20,000-$50,000",
                living: "$1,000-$2,500/month",
                visaSuccess: "78%"
            }
        }
    ];
    
    countries.forEach(country => {
        const countryCard = document.createElement('div');
        countryCard.className = 'country-card';
        
        countryCard.innerHTML = `
            <div class="country-flag" style="background: linear-gradient(45deg, #333, #666); display: flex; align-items: center; justify-content: center; font-size: 4rem;">
                ${country.flag}
            </div>
            <div class="country-info">
                <h3>${country.name}</h3>
                <p>${country.description}</p>
                <div class="country-stats">
                    <div class="stat-item">
                        <span class="stat-value">${country.stats.tuition}</span>
                        <span class="stat-label">Tuition/Year</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${country.stats.living}</span>
                        <span class="stat-label">Living Cost</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${country.stats.visaSuccess}</span>
                        <span class="stat-label">Visa Success</span>
                    </div>
                </div>
                <button class="country-details-btn" onclick="showCountryDetails('${country.name}')">
                    <i class="fas fa-search"></i> Explore ${country.name}
                </button>
            </div>
        `;
        
        countriesGrid.appendChild(countryCard);
    });
}

// Cost Calculator
function initCalculator() {
    const calculateBtn = document.getElementById('calculate-cost');
    const countrySelect = document.getElementById('country-select');
    const durationInput = document.getElementById('duration');
    const totalAmount = document.getElementById('total-amount');
    const costDetails = document.getElementById('cost-details');
    
    // Country cost data
    const countryCosts = {
        germany: {
            tuition: 3000,
            living: 12000,
            insurance: 1200,
            misc: 2000
        },
        canada: {
            tuition: 25000,
            living: 15000,
            insurance: 800,
            misc: 3000
        },
        australia: {
            tuition: 35000,
            living: 20000,
            insurance: 1000,
            misc: 4000
        },
        usa: {
            tuition: 40000,
            living: 18000,
            insurance: 2000,
            misc: 5000
        },
        japan: {
            tuition: 10000,
            living: 12000,
            insurance: 600,
            misc: 2500
        }
    };
    
    calculateBtn.addEventListener('click', function() {
        const country = countrySelect.value;
        const duration = parseInt(durationInput.value);
        const costs = countryCosts[country];
        
        if (!costs) return;
        
        // Calculate total
        const tuitionTotal = costs.tuition * duration;
        const livingTotal = costs.living * duration;
        const insuranceTotal = costs.insurance * duration;
        const miscTotal = costs.misc * duration;
        
        const totalCost = tuitionTotal + livingTotal + insuranceTotal + miscTotal;
        
        // Update display
        totalAmount.textContent = `$${totalCost.toLocaleString()}`;
        
        costDetails.innerHTML = `
            <p>Tuition (${duration} years): $${tuitionTotal.toLocaleString()}</p>
            <p>Living Expenses: $${livingTotal.toLocaleString()}</p>
            <p>Health Insurance: $${insuranceTotal.toLocaleString()}</p>
            <p>Miscellaneous: $${miscTotal.toLocaleString()}</p>
        `;
        
        // Update chart
        updateCostChart([tuitionTotal, livingTotal, insuranceTotal, miscTotal]);
    });
    
    // Initialize chart
    initializeChart();
}

// Chart.js for Cost Breakdown
let costChart;

function initializeChart() {
    const ctx = document.getElementById('cost-chart').getContext('2d');
    
    costChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Tuition', 'Living', 'Insurance', 'Miscellaneous'],
            datasets: [{
                data: [0, 0, 0, 0],
                backgroundColor: [
                    '#DC143C',
                    '#003893',
                    '#FFD700',
                    '#28A745'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                }
            }
        }
    });
}

function updateCostChart(data) {
    if (costChart) {
        costChart.data.datasets[0].data = data;
        costChart.update();
    }
}

// WhatsApp Integration
function initWhatsApp() {
    const whatsappBtn = document.querySelector('.whatsapp-float');
    whatsappBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const message = "Hello! I'm interested in studying abroad with EduPath AI. Can you help me?";
        const phone = "9779800000000";
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    });
}

// Animated Student Counter
function updateStudentCount() {
    const counterElement = document.getElementById('student-count');
    let count = 15000;
    let target = 15247; // Simulated increase
    
    const interval = setInterval(() => {
        if (count <= target) {
            counterElement.textContent = count.toLocaleString() + '+';
            count += Math.ceil((target - count) / 10);
        } else {
            clearInterval(interval);
        }
    }, 100);
}

// Additional Helper Functions
function showUniversityDetails(index) {
    alert(`University details for recommendation #${index + 1}\n\nThis would show a detailed modal with complete information about the university, requirements, deadlines, and application process.`);
}

function showCountryDetails(countryName) {
    alert(`Detailed information about studying in ${countryName}\n\nThis would open a comprehensive guide including:\n- Top universities\n- Admission requirements\n- Visa process for Nepali students\n- Living conditions\n- Part-time work opportunities\n- Scholarship options`);
}

// Export functions for global access
window.showUniversityDetails = showUniversityDetails;
window.showCountryDetails = showCountryDetails;
