const meterToFoot = 3.281;
const literToGallon = 0.264;
const kilogramToPound = 2.204

const numberInput = document.querySelector("#number-input");
const lengthOutput = document.querySelector("#length-output");
const volumeOutput = document.querySelector("#volume-output");
const massOutput = document.querySelector("#mass-output");

numberInput.addEventListener("input", function() { if(!numberInput.value) {numberInput.value = 0;} convert(numberInput.value); })

function convert(number) {
    lengthOutput.innerHTML = generateText("meters", "feet", number, meterToFoot);
    volumeOutput.innerHTML = generateText("liters", "gallons", number, literToGallon);
    massOutput.innerHTML = generateText("kilos", "pounds", number, kilogramToPound);
}

function generateText(start, end, number, ratio) {
    return `${number} ${start} = ${(number * ratio).toFixed(3)} ${end} | ${number} ${end} = ${(number / ratio).toFixed(3)} ${start}`;
}

convert(numberInput.value);

/* If running as Chrome Extension, remove top padding */
if (window.chrome && chrome.runtime && chrome.runtime.id) {
    let sheet = window.document.styleSheets[0];
    sheet.insertRule("body { margin-top: 0px; }", sheet.cssRules.length);
}