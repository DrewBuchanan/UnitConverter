/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/

const meterToFoot = 3.281;
const literToGallon = 0.264;
const kilogramToPound = 2.204

const numberInput = document.querySelector("#number-input");
const convertBtn = document.querySelector("#convert-btn");
const lengthOutput = document.querySelector("#length-output");
const volumeOutput = document.querySelector("#volume-output");
const massOutput = document.querySelector("#mass-output");

convertBtn.addEventListener("click", function () { convert(numberInput.value); });

function convert(number) {
    lengthOutput.innerHTML = generateText("meters", "feet", number, meterToFoot);
    volumeOutput.innerHTML = generateText("liters", "gallons", number, literToGallon);
    massOutput.innerHTML = generateText("kilos", "pounds", number, kilogramToPound);
}

function generateText(start, end, number, ratio) {
    return `${number} ${start} = ${(number * ratio).toFixed(3)} ${end} | ${number} ${end} = ${(number / ratio).toFixed(3)} ${start}`;
}

convertBtn.click();