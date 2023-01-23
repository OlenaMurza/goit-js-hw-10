import './css/styles.css'
import { fetchCountries } from './fetchCountries'
import Notiflix from 'notiflix'
import debounce from 'lodash.debounce'

const DEBOUNCE_DELAY = 300;

const countriesNameInput = document.querySelector('#search-box')
const countriesList = document.querySelector('.country-list')
const countriesInfo = document.querySelector('.country-info')

countriesNameInput.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange() {
  const name = countriesNameInput.value.trim();

  if (name === '') {
    return (countriesList.innerHTML = ''),
  (countriesInfo.innerHTML = '')
  }

  fetchCountries(name)
    .then(countries => {
      countriesList.innerHTML = ''
      countriesInfo.innerHTML = ''
      if (countries.length === 1) {
        countriesList.insertAdjacentHTML('beforeend', createMarkupList(countries))
        countriesInfo.insertAdjacentHTML('beforeend', createMarkupInfo(countries))
      } else if (countries.length >= 10) {
        alertTooManyMatches()
      } else {
        countriesList.insertAdjacentHTML('beforeend', createMarkupList(countries))
      }
    })
    .catch(alertWrongName)
}
       
function createMarkupList(countries) {
    const markup = countries.map(
        ({ name, flags }) => {
            return `
      <li class="country-list__item">
        <img class="country-list__img" 
          src="${flags.svg}" 
          alt="${name.official}" 
          width="60" 
          height="40">
       <h2 class="country-list_name">${name.official}</h2>
      </li> `
        })
    .join('')
    return markup
    }   

function createMarkupInfo(countries) {
    const markup = countries.map(
        ({ capital, population, languages }) => {
            return `
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
          <span>Languages:</span>
          ${Object.values(languages).join(', ')}</li>
        </ul>`
    })
    .join('')
  return markup
}


function alertWrongName() {
  Notiflix.Notify.failure(`Oops, there is no country with that name`)
}

function alertTooManyMatches() {
  Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
}
