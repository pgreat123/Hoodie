// ==========================================
// HOODIE API
// DexScreener Integration
// ==========================================

const CONTRACT =
"0xC72c01AAB5f5678dc1d6f5C6d2B417d91D402Ba3";

const API =
`https://api.dexscreener.com/latest/dex/tokens/${CONTRACT}`;

async function loadToken(){

try{

const response = await fetch(API);

const data = await response.json();

if(!data.pairs || data.pairs.length===0){

console.log("Token not found.");

return;

}

const pair = data.pairs[0];

updateDashboard(pair);

}
catch(err){

console.error(err);

}

}

function money(x){

if(!x) return "$0";

return "$"+Number(x).toLocaleString();

}

function updateDashboard(pair){

document.getElementById("price").innerHTML =
"$"+Number(pair.priceUsd).toFixed(8);

document.getElementById("marketcap").innerHTML =
money(pair.fdv);

document.getElementById("liquidity").innerHTML =
money(pair.liquidity.usd);

document.getElementById("volume").innerHTML =
money(pair.volume.h24);

document.getElementById("transactions").innerHTML =
pair.txns.h24.buys+" / "+pair.txns.h24.sells;

let change = Number(pair.priceChange.h24);

const changeElement =
document.getElementById("change");

changeElement.innerHTML =
change.toFixed(2)+"%";

changeElement.style.color =
change>=0 ? "#00ff99":"#ff4d4d";

generateWhales(pair);

generatePrediction(pair);

generateSentiment(pair);

savePrediction(pair);

}

function generatePrediction(pair){

const p = Number(pair.priceChange.h24);

let text = "";

if(p>15){

text="🚀 Extremely Bullish. Momentum remains strong. Probability of continuation is high.";

}

else if(p>5){

text="📈 Bullish trend detected. Higher highs are forming.";

}

else if(p>-5){

text="⚖️ Sideways movement expected. Wait for breakout confirmation.";

}

else if(p>-15){

text="📉 Bearish pressure detected. Watch support levels carefully.";

}

else{

text="⚠️ Strong bearish momentum. High volatility expected.";

}

document.getElementById("predictionText").innerHTML=text;

}

function generateSentiment(pair){

const buys = pair.txns.h24.buys;

const sells = pair.txns.h24.sells;

const score = buys/(buys+sells);

document.getElementById("sentimentFill").style.width=
(score*100)+"%";

let label="Neutral";

if(score>.70)

label="Extreme Greed";

else if(score>.60)

label="Greed";

else if(score>.45)

label="Neutral";

else

label="Fear";

document.getElementById("sentimentText").innerHTML=label;

}

function generateWhales(pair){

const whales=document.getElementById("whales");

whales.innerHTML="";

const activity=[

"🐳 Wallet accumulated large position",

"💰 Buy wall detected",

"🐳 Liquidity increased",

"📦 Large transaction observed",

"🚀 Smart money accumulation"

];

activity.forEach(item=>{

const li=document.createElement("li");

li.innerHTML=item;

whales.appendChild(li);

});

}

function savePrediction(pair){

const history=document.getElementById("history");

const li=document.createElement("li");

li.innerHTML=

new Date().toLocaleTimeString()+" • "+pair.priceUsd;

history.prepend(li);

if(history.children.length>10)

history.removeChild(history.lastChild);

}

loadToken();

setInterval(loadToken,30000);
