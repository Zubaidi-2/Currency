"use strict";
const from = document.getElementById("from");
const to = document.getElementById("to");
const value = document.querySelector(".number");
const result = document.querySelector(".result");
const getCountries = async function () {
  try {
    let currencies = [];
    let currenciesNames = [];
    const countriesResponse = await fetch("https://restcountries.com/v3.1/all");
    const countries = await countriesResponse.json();
    // console.log(countries);
    countries.forEach((element) => {
      if (element.currencies) {
        // console.log(element);
        let currenciesKeys = Object.keys(element.currencies)[0];
        let currenciesValues = Object.values(element.currencies)[0].name;

        currencies.push(currenciesKeys);
        currenciesNames.push(currenciesValues);
      }
    });

    currencies = currencies.map((el) => {
      return el.toLowerCase();
    });
    let uniqueCurrSymbol = new Set(currencies);
    uniqueCurrSymbol.forEach((curr) => {
      from.innerHTML += `<option value="${curr}">${curr}</option>`;
      to.innerHTML += `<option value="${curr}">${curr}</option>`;
    });
    let uniqueCurrName = new Set(currenciesNames);

    return uniqueCurrSymbol;
  } catch (e) {
    console.log(e);
  }
};
getCountries();

const convert = async function () {
  try {
    // getting the user's selected options
    const selectedFrom = from.options[from.selectedIndex].value;
    const selectedTo = to.options[to.selectedIndex].value;

    console.log(selectedFrom);

    // get exchange rates from the user's selected value
    let rateResponse = await fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${selectedFrom}.json`
    );

    const rates = await rateResponse.json();
    // get the rate to the user's selected claue
    const rate = rates[selectedFrom][selectedTo];

    // only show 3 digits
    let conversion = value.value * rate;
    result.value = conversion.toFixed(3);
    // console.log(rates[selectedTo]);
  } catch (e) {
    // rest countries API might contain curriences that are not supported in RatesAPI or vise versa, this is to catch these errors.
    console.error("one of the currencies is not supported yet");
  }
};
// if change was backwards
const convertBackwards = async function () {
  try {
    // getting the user's selected options
    const selectedTo = from.options[from.selectedIndex].value;
    const selectedFrom = to.options[to.selectedIndex].value;

    console.log(selectedFrom);

    // get exchange rates from the user's selected value
    let rateResponse = await fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${selectedFrom}.json`
    );

    const rates = await rateResponse.json();
    // get the rate to the user's selected claue
    const rate = rates[selectedFrom][selectedTo];

    // only show 3 digits
    let conversion = result.value * rate;
    value.value = conversion.toFixed(3);
    // console.log(rates[selectedTo]);
  } catch (e) {
    // rest countries API might contain curriences that are not supported in RatesAPI or vise versa, this is to catch these errors.
    console.error("one of the currencies is not supported yet");
  }
};

value.addEventListener("keydown", convert);
from.addEventListener("change", convert);
to.addEventListener("change", convert);

result.addEventListener("keydown", convertBackwards);
