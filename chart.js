// ==========================================
// HOODIE Live Price Chart
// ==========================================

const chartLabels = [];
const chartPrices = [];

const ctx = document.getElementById("priceChart").getContext("2d");

const priceChart = new Chart(ctx, {
    type: "line",
    data: {
        labels: chartLabels,
        datasets: [{
            label: "HOODIE Price (USD)",
            data: chartPrices,
            borderColor: "#00F5FF",
            backgroundColor: "rgba(0,245,255,0.15)",
            borderWidth: 3,
            tension: 0.35,
            fill: true,
            pointRadius: 2,
            pointHoverRadius: 5
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 800
        },
        plugins: {
            legend: {
                labels: {
                    color: "#ffffff"
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: "#ffffff"
                },
                grid: {
                    color: "rgba(255,255,255,0.08)"
                }
            },
            y: {
                ticks: {
                    color: "#ffffff"
                },
                grid: {
                    color: "rgba(255,255,255,0.08)"
                }
            }
        }
    }
});

function addChartPoint(price) {

    const now = new Date().toLocaleTimeString();

    chartLabels.push(now);
    chartPrices.push(Number(price));

    if (chartLabels.length > 40) {
        chartLabels.shift();
        chartPrices.shift();
    }

    priceChart.update();
}

// Hook into the API dashboard update
const originalUpdateDashboard = updateDashboard;

updateDashboard = function(pair) {

    originalUpdateDashboard(pair);

    addChartPoint(pair.priceUsd);

};
