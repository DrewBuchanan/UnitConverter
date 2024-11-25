const meterToFoot = 3.281;
const literToGallon = 0.264;
const kilogramToPound = 2.204

const numberInput = document.querySelector("#number-input");
const lengthOutput = document.querySelector("#length-output");
const volumeOutput = document.querySelector("#volume-output");
const massOutput = document.querySelector("#mass-output");
const colorSection = document.querySelector("#color");
const colors = ["6D28D9", "BE123C", "B45309", "075985", "064E3B"]
const isRunningAsExtension = window.chrome && chrome.runtime && chrome.runtime.id;

init();

function init() {
    numberInput.addEventListener("input", function(e) {
        if (e.data === ".")
            return;
        if(!numberInput.value) {
            numberInput.value = 0;
        }
        if (!numberInput.value.includes(".")) {
            numberInput.value = parseInt(numberInput.value);
        }
        else if (numberInput.value.includes(".") && e.inputType !== "deleteContentBackward" && e.inputType !== "deleteContentForward") {
            const decimals = numberInput.value.substring(numberInput.value.indexOf(".") + 1).length === 1 ? 1 : 2;
            numberInput.value = parseFloat(numberInput.value).toFixed(decimals);
        }
        convert(numberInput.value);
    });
    document.querySelector("#light").addEventListener("click", function() {setTheme("light");});
    document.querySelector("#dark").addEventListener("click", function() {setTheme("dark");});

    convert(numberInput.value);
    
    generateColorButtons(colors);

    if (!localStorage.getItem("theme")) {
        setTheme("dark");
    }
    else {
        setTheme(localStorage.getItem("theme"));
    }
    
    if (!localStorage.getItem("color")) {
        setColor(colors[0]);
    }
    else {
        setColor(localStorage.getItem("color"));
    }

    /* If running as Chrome Extension, remove top padding */
    if (isRunningAsExtension) {
        let sheet = window.document.styleSheets[0];
        sheet.insertRule("body { margin-top: 0px; }", sheet.cssRules.length);
    }
}

function setColor(color) {
    localStorage.setItem("color", color);
    document.querySelector(":root").style.setProperty("---header-color", color);
}

function setTheme(theme) {
    localStorage.setItem("theme", theme);
    if (theme === "light") {
        document.body.classList = "lighttheme";
    }
    else {
        document.body.classList = "darktheme";
    }
}

function generateColorButtons(colorArray) {
    for (let i = 0; i < colorArray.length; i++) {
        let color = document.createElement("span");
        color.style = `background-color: #${colorArray[i]};`;
        color.classList.add("dot");
        color.addEventListener("click", function() { setColor(`#${colorArray[i]}`) });
        colorSection.appendChild(color);
    }
}

function convert(number) {
    lengthOutput.innerHTML = generateText("meters", "feet", number, meterToFoot);
    volumeOutput.innerHTML = generateText("liters", "gallons", number, literToGallon);
    massOutput.innerHTML = generateText("kilos", "pounds", number, kilogramToPound);
}

function generateText(start, end, number, ratio) {
    return `${number} ${start} = ${(number * ratio).toFixed(3)} ${end} | ${number} ${end} = ${(number / ratio).toFixed(3)} ${start}`;
}