
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
export { fetchCountries };