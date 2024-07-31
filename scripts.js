const key = "1fc70b2412fc90bd87388b44";
const link = "https://v6.exchangerate-api.com/v6/";

const amount = document.querySelector(".converted");
const convertButton = document.querySelector(".convert");
const fromOptions = document.getElementById("from");
const toOptions = document.getElementById("to");
const amountInput = document.getElementById("money");

async function getCurr(fromElement, toElement, currAmount) {
    try {
        const response = await fetch(link + key + "/pair/" + fromElement + "/" + toElement + "/" + currAmount);
        let data = await response.json();
    
        switch (toElement) {
            case 'HKD':
            case 'CAD':
            case 'AUD':
            case 'USD':
                amount.innerHTML = '$';
                break;
            case 'GBP':
            case 'EUR':
                amount.innerHTML = '£';
                break;
            case 'CHF':
                amount.innerHTML = 'CHF';
                break;
            case 'JPY':
            case 'CNY':
                amount.innerHTML = '¥';
                break;
            case 'VND':
                amount.innerHTML = '₫';
                break;
        }
        amount.innerHTML += data.conversion_result;
    } catch (error) {
        alert("Please enter a sufficient amount!");
    }
}

convertButton.addEventListener('click', getOptions);

function getOptions() {
    let fromElement = fromOptions.options[fromOptions.selectedIndex].value;
    let toElement = toOptions.options[toOptions.selectedIndex].value;
    let currAmount = amountInput.value;

    if (currAmount) {
        getCurr(fromElement, toElement, currAmount);

        currAmount.value = "";
    } else {
        alert("Please enter an amount!");
    }
}