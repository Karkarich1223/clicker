//сделать ачивки

const button = document.getElementById('button');
const count = document.getElementById('count');
const upgrade = document.getElementById('upgrade');
const upgradeLVL = document.getElementById('upgradeLVL');
const auto = document.getElementById('auto');
const autoLVL = document.getElementById('autoLVL');
const warp = document.getElementById('warp');
const warpLVL = document.getElementById('warpLVL');


let countOfWarp = 1;
let warpCost = 2000;
let isAuto = false;
let clicks = 0;
let clickPower = 1;
let upgradeCost = 10;
let warpCostMultiplyer = 1;


function clicksReq(number) {
    if (clicks < number) {
        alert('У вас недостаточно кликов');
        return false;
    }
    return true
}

function renderClicks() {
    let costRendered = parseFloat(upgradeCost.toFixed(1));
    if (costRendered >= 1000 && costRendered < 1000000) {
        costRendered = (Math.floor(costRendered / 100) / 10).toFixed(1).replace(/\.0$/, '') + 'k';
    } else if (costRendered >= 1000000) {
        costRendered = (Math.floor(costRendered / 100000) / 10).toFixed(1).replace(/\.0$/, '') + 'm';
    }

    let clicksRendered = parseFloat(clicks.toFixed(1));
    if (clicksRendered >= 1000 && clicksRendered < 1000000) {
        clicksRendered = (Math.floor(clicksRendered / 100) / 10).toFixed(1).replace(/\.0$/, '') + 'k';
    } else if (clicksRendered >= 1000000) {
        clicksRendered = (Math.floor(clicksRendered / 100000) / 10).toFixed(1).replace(/\.0$/, '') + 'm';
    }

    let clickPowerRendered = parseFloat(clickPower.toFixed(1));
    if (clickPowerRendered >= 1000 && clickPowerRendered < 1000000) {
        clickPowerRendered = (Math.floor(clickPowerRendered / 100) / 10).toFixed(1).replace(/\.0$/, '') + 'k';
    } else if (clickPowerRendered >= 1000000) {
        clickPowerRendered = (Math.floor(clickPowerRendered / 100000) / 10).toFixed(1).replace(/\.0$/, '') + 'm';
    }

    let warpCostRendered = parseFloat(warpCost.toFixed(1));
    if (warpCostRendered >= 1000 && warpCostRendered < 1000000) {
        warpCostRendered = (Math.floor(warpCostRendered / 100) / 10).toFixed(1).replace(/\.0$/, '') + 'k';
    } else if (warpCostRendered >= 1000000) {
        warpCostRendered = (Math.floor(warpCostRendered / 100000) / 10).toFixed(1).replace(/\.0$/, '') + 'm';
    }

    let multiplier = countOfWarp === 1 ? 1 : countOfWarp * 0.8;
    count.innerText = clicksRendered;
    warpLVL.innerText = countOfWarp - 1;
    warp.innerText = 'warp\n' + warpCostRendered;
    upgradeLVL.innerText = clickPowerRendered;
    upgrade.innerText = 'upgrade\n' + costRendered;

    if (clicks == 67) {
        alert('67 67 67 SIX-SEVEEEEN 67 67 67')
    }
    
    if (isAuto) {
        autoLVL.innerText = 'ENABLED';
        autoLVL.className = 'enabled';
    } else {
        autoLVL.innerText = 'DISABLED';
        autoLVL.className = 'disabled';
    }

    if (clicks > upgradeCost - 1) {
        upgrade.removeAttribute('disabled');
    } else {
        upgrade.setAttribute('disabled', 'true');
    }

    if (clicks > 99) {
        auto.removeAttribute('disabled');
    } else {
        auto.setAttribute('disabled', 'true');
    }

    if (isAuto) {
        auto.setAttribute('disabled', 'true');
    }

    if (clicks > warpCost - 1) {
        warp.removeAttribute('disabled');
    } else {
        warp.setAttribute('disabled', 'true');
    }
}

function warpGame() {
    if (!clicksReq(warpCost)) return;
    clickPower = 1;
    upgradeCost = 10;
    clicks -= warpCost;
    countOfWarp += 1;
    warpCostMultiplyer *= 2;
    warpCost *= warpCostMultiplyer;
    isAuto = false;
    clicks = 0;
    renderClicks();
}

function autoClick() {
    if (!clicksReq(100)) return;
    clicks -= 100;
    isAuto = true;
    auto.setAttribute('disabled', 'true')
    renderClicks();
}

function buttonClick() {
    let multiplier = countOfWarp === 1 ? 1 : countOfWarp * 0.8;
    clicks += clickPower * multiplier;
    renderClicks();
}

function upgradeClick() {
    if (!clicksReq(upgradeCost)) return;
    clicks -= upgradeCost;
    upgradeCost *= 1.7;
    clickPower *= 1.5;
    renderClicks();
}

function debug() {
    console.log("=== DEBUG ===\n", `clicks: ${clicks}\n`, `clickPower: ${clickPower}\n`, `upgradeCost: ${upgradeCost}\n`, `countOfWarp: ${countOfWarp}\n`, `warpCost: ${warpCost}\n`, `warpCostMultiplyer: ${warpCostMultiplyer}\n`, `isAuto: ${isAuto}`);
}

setInterval(() => {
    if (isAuto) {
        let multiplier = countOfWarp === 1 ? 1 : countOfWarp * 0.8;
        clicks += clickPower * multiplier;
        renderClicks();
    }
}, 500);