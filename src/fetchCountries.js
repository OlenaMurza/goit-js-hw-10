const fields = 'fields=name,capital,population,flags,languages';
const BASE_URL = 'https://restcountries.com/v3.1/name/';
    const KEY = "XJlq9OFMcHAy8pAQK7xj";
const options = {
    heders: {
        Authorization: `Bearer ${KEY}`
    }
}
export function fetchCountries(name) {
  return fetch(`${BASE_URL}${name}?${fields}`, options)
    .then(response => response.json())
    .catch(error => console.log(error))
}