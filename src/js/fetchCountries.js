export function fetchCountries(findTerm) {
  const baseURL = `https://restcountries.com/v3.1/name/${findTerm}`;
  const params = '?fields=name,capital,region,population,flags,languages';
  const url = `${baseURL}${params}`;
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => console.log(`${error.name}: ${error.message}`));
}
