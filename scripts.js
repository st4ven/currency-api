// key and API
const key = "1fc70b2412fc90bd87388b44";
const link = "https://v6.exchangerate-api.com/v6/";

// variables
const amount = document.querySelector(".converted");
const convertButton = document.querySelector(".convert");
const fromOptions = document.getElementById("from");
const toOptions = document.getElementById("to");
const amountInput = document.getElementById("money");

// supported currencies list
const currencies = [["AED","UAE Dirham"],["AFN","Afghan Afghani"],["ALL","Albanian Lek"],["AMD","Armenian Dram"],["ANG","Netherlands Antillian Guilder"],["AOA","Angolan Kwanza"],["ARS","Argentine Peso"],["AUD","Australian Dollar"],["AWG","Aruban Florin"],["AZN","Azerbaijani Manat"],["BAM","Bosnia and Herzegovina Convertible Mark"],["BBD","Barbados Dollar"],["BDT","Bangladeshi Taka"],["BGN","Bulgarian Lev"],["BHD","Bahraini Dinar"],["BIF","Burundian Franc"],["BMD","Bermudian Dollar"],["BND","Brunei Dollar"],["BOB","Bolivian Boliviano"],["BRL","Brazilian Real"],["BSD","Bahamian Dollar"],["BTN","Bhutanese Ngultrum"],["BWP","Botswana Pula"],["BYN","Belarusian Ruble"],["BZD","Belize Dollar"],["CAD","Canadian Dollar"],["CDF","Congolese Franc"],["CHF","Swiss Franc"],["CLP","Chilean Peso"],["CNY","Chinese Renminbi"],["COP","Colombian Peso"],["CRC","Costa Rican Colon"],["CUP","Cuban Peso"],["CVE","Cape Verdean Escudo"],["CZK","Czech Koruna"],["DJF","Djiboutian Franc"],["DKK","Danish Krone"],["DOP","Dominican Peso"],["DZD","Algerian Dinar"],["EGP","Egyptian Pound"],["ERN","Eritrean Nakfa"],["ETB","Ethiopian Birr"],["EUR","Euro"],["FJD","Fiji Dollar"],["FKP","Falkland Islands Pound"],["FOK","Faroese Kr\u00f3na"],["GBP","Pound Sterling"],["GEL","Georgian Lari"],["GGP","Guernsey Pound"],["GHS","Ghanaian Cedi"],["GIP","Gibraltar Pound"],["GMD","Gambian Dalasi"],["GNF","Guinean Franc"],["GTQ","Guatemalan Quetzal"],["GYD","Guyanese Dollar"],["HKD","Hong Kong Dollar"],["HNL","Honduran Lempira"],["HRK","Croatian Kuna"],["HTG","Haitian Gourde"],["HUF","Hungarian Forint"],["IDR","Indonesian Rupiah"],["ILS","Israeli New Shekel"],["IMP","Manx Pound"],["INR","Indian Rupee"],["IQD","Iraqi Dinar"],["IRR","Iranian Rial"],["ISK","Icelandic Kr\u00f3na"],["JEP","Jersey Pound"],["JMD","Jamaican Dollar"],["JOD","Jordanian Dinar"],["JPY","Japanese Yen"],["KES","Kenyan Shilling"],["KGS","Kyrgyzstani Som"],["KHR","Cambodian Riel"],["KID","Kiribati Dollar"],["KMF","Comorian Franc"],["KRW","South Korean Won"],["KWD","Kuwaiti Dinar"],["KYD","Cayman Islands Dollar"],["KZT","Kazakhstani Tenge"],["LAK","Lao Kip"],["LBP","Lebanese Pound"],["LKR","Sri Lanka Rupee"],["LRD","Liberian Dollar"],["LSL","Lesotho Loti"],["LYD","Libyan Dinar"],["MAD","Moroccan Dirham"],["MDL","Moldovan Leu"],["MGA","Malagasy Ariary"],["MKD","Macedonian Denar"],["MMK","Burmese Kyat"],["MNT","Mongolian T\u00f6gr\u00f6g"],["MOP","Macanese Pataca"],["MRU","Mauritanian Ouguiya"],["MUR","Mauritian Rupee"],["MVR","Maldivian Rufiyaa"],["MWK","Malawian Kwacha"],["MXN","Mexican Peso"],["MYR","Malaysian Ringgit"],["MZN","Mozambican Metical"],["NAD","Namibian Dollar"],["NGN","Nigerian Naira"],["NIO","Nicaraguan C\u00f3rdoba"],["NOK","Norwegian Krone"],["NPR","Nepalese Rupee"],["NZD","New Zealand Dollar"],["OMR","Omani Rial"],["PAB","Panamanian Balboa"],["PEN","Peruvian Sol"],["PGK","Papua New Guinean Kina"],["PHP","Philippine Peso"],["PKR","Pakistani Rupee"],["PLN","Polish Z\u0142oty"],["PYG","Paraguayan Guaran\u00ed"],["QAR","Qatari Riyal"],["RON","Romanian Leu"],["RSD","Serbian Dinar"],["RUB","Russian Ruble"],["RWF","Rwandan Franc"],["SAR","Saudi Riyal"],["SBD","Solomon Islands Dollar"],["SCR","Seychellois Rupee"],["SDG","Sudanese Pound"],["SEK","Swedish Krona"],["SGD","Singapore Dollar"],["SHP","Saint Helena Pound"],["SLE","Sierra Leonean Leone"],["SLL","Sierra Leonean Leone"],["SOS","Somali Shilling"],["SRD","Surinamese Dollar"],["SSP","South Sudanese Pound"],["STN","S\u00e3o Tom\u00e9 and Pr\u00edncipe Dobra"],["SYP","Syrian Pound"],["SZL","Eswatini Lilangeni"],["THB","Thai Baht"],["TJS","Tajikistani Somoni"],["TMT","Turkmenistan Manat"],["TND","Tunisian Dinar"],["TOP","Tongan Pa\u02bbanga"],["TRY","Turkish Lira"],["TTD","Trinidad and Tobago Dollar"],["TVD","Tuvaluan Dollar"],["TWD","New Taiwan Dollar"],["TZS","Tanzanian Shilling"],["UAH","Ukrainian Hryvnia"],["UGX","Ugandan Shilling"],["USD","United States Dollar"],["UYU","Uruguayan Peso"],["UZS","Uzbekistani So'm"],["VES","Venezuelan Bol\u00edvar Soberano"],["VND","Vietnamese \u0110\u1ed3ng"],["VUV","Vanuatu Vatu"],["WST","Samoan T\u0101l\u0101"],["XAF","Central African CFA Franc"],["XCD","East Caribbean Dollar"],["XDR","Special Drawing Rights"],["XOF","West African CFA franc"],["XPF","CFP Franc"],["YER","Yemeni Rial"],["ZAR","South African Rand"],["ZMW","Zambian Kwacha"],["ZWL","Zimbabwean Dollar"]];


// load all the options from currencies list
loadOptions();

/// currency converter
async function getCurr(fromElement, toElement, currAmount) {
    // call the API
    const response = await fetch(link + key + "/pair/" + fromElement + "/" + toElement + "/" + currAmount);
    let data = await response.json();
    
    // display the converted amount
    amount.innerHTML = data.conversion_result + " " + toElement;
}

/// if the convert button is clicked, get the selections and call getCurr function
convertButton.addEventListener('click', getSelected);

/// This function gets the selected values from the options and calls getCurr function
function getSelected() {
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

/// This function loads the options from the supported currencies list
function loadOptions() {
    currencies.forEach((currency) => {
        let newOption = document.createElement("option");

        newOption.value = currency[0];
        newOption.text = currency[0] + " - " + currency[1];
        fromOptions.add(newOption);
    });

    currencies.forEach((currency) => {
        let newOption = document.createElement("option");

        newOption.value = currency[0];
        newOption.text = currency[0] + " - " + currency[1];
        toOptions.add(newOption);
    });
}