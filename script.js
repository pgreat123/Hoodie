// ==========================================
// HOODIE UI CONTROLLER
// ==========================================

// ---------- Countdown Timer ----------

let seconds = 300;

function updateCountdown() {

    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    document.getElementById("countdown").textContent =
        `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

    if (seconds <= 0) {
        seconds = 300;

        // Refresh live data
        if (typeof loadToken === "function") {
            loadToken();
        }

    } else {
        seconds--;
    }

}

updateCountdown();
setInterval(updateCountdown, 1000);


// ---------- AI Prediction Tabs ----------

const tabPredictions = {

    "5m":
        "⚡ Short-term momentum is active. Expect quick volatility with scalp opportunities if buying pressure continues.",

    "15m":
        "📊 Buyers currently have a slight edge. Watch for confirmation above recent resistance.",

    "1h":
        "🚀 Trend remains moderately bullish. A continuation is possible if volume increases.",

    "1d":
        "📈 Daily structure is healthy. Holding support could lead to another upward move.",

    "1m":
        "🌙 Long-term outlook remains optimistic provided liquidity and community activity continue growing."

};

const tabs = document.querySelectorAll(".tab");

tabs.forEach(tab => {

    tab.addEventListener("click", () => {

        tabs.forEach(btn => btn.classList.remove("active"));

        tab.classList.add("active");

        const timeframe = tab.dataset.tab;

        document.getElementById("predictionText").innerHTML =
            tabPredictions[timeframe];

    });

});


// ---------- Card Hover Animation ----------

document.querySelectorAll(".glass").forEach(card => {

    card.addEventListener("mousemove", e => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.background =
            `radial-gradient(circle at ${x}px ${y}px,
            rgba(255,255,255,.18),
            rgba(255,255,255,.08))`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.background =
            "rgba(255,255,255,.08)";

    });

});


// ---------- Auto Refresh Animation ----------

setInterval(() => {

    document.querySelector(".priceCard")
        .classList.toggle("flash");

}, 30000);


// ---------- Console Banner ----------

console.log(`
==========================
 HOODIE AI
 Crypto Analytics Platform
==========================
`);
