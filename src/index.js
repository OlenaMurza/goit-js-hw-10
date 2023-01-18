import './css/styles.css';



const countriesNameInput = document.querySelector('#search-box');
const countriesList = document.querySelector('.country-list');
const countriesInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

//// ВИКЛИК HTTP
function fetchCountries(name) {
    const BASE_URL = 'https://restcountries.com/v3.1/name/united';
    const KEY = "XJlq9OFMcHAy8pAQK7xj";
    const options = {
        heders: {
            Authorization: `Bearer ${KEY}`
        }
    }

    return fetch(`${BASE_URL}`, options).then(resp => { if (!resp.ok) {
        throw new Error(resp.statusText)
    }
        
        return resp.json()
    })
}
fetchCountries().then(data => createMarkup(data))
////

//// фУНКЦІЯ, ЯКА ГЕНЕРУЄ РОЗМІТКУ ТА ПОМІЩАЄ ЇЇ В DOM
function createMarkup(arr) {
    const markup = arr.map(
    ({ name, capital, population, flags, languages }) =>
      `
      <img
        src="${flags.svg}" 
        alt="${name.official}" 
        width="120" 
        height="80">
      <h1 class="country-info__title">${name.official}</h1>
      <ul class="country-info__list">
          <li class="country-info__item">
          <span>Capital:</span>
        ${capital}
          </li>
          <li class="country-info__item">
          <span>Population:</span>
          ${population}
          </li>
          <li class="country-info__item">
          <span>Lenguages:</span>
          ${Object.values(languages)}
          </li>
      </ul>
  `
  );
}
    countriesList.insertAdjacentHTML('beforeend', markup)

////  









