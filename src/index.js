import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import debounce from 'lodash.debounce';
import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInformation = document.querySelector('.country-info');

const findCountry = event => {
  const findTerm = searchInput.value.trim();
  fetchCountries(findTerm)
    .then(data => {
      countriesData(data);
    })
    .catch(error => {
      if (findTerm !== '') {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
    });
  event.preventDefault();
};

function countriesData(data) {
  console.log(data);
  if (data.length > 10) {
    countryList.innerHTML = '';
    countryInformation.innerHTML = '';
    // console.log(clearData);
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (data.length > 1 && data.length <= 10) {
    countryList.innerHTML = '';
    countryInformation.innerHTML = '';
    return (countryList.innerHTML = data
      .map(
        item =>
          `<li class = 'country'><img src ='${item.flags.svg}'/>
          <p>${item.name.official}</p></li>`
      )
      .join(''));
  } else {
    countryList.innerHTML = '';
    countryInformation.innerHTML = '';
    return (countryInformation.innerHTML = data

      .map(
        item => ` <div class = 'country'>
                <img src='${item.flags.svg}'/>
                    <div class ='country-body'>
        <h2>${item.name.official}</h2>
         <p><b>Region: </b>${item.region}</p>
        <p><b>Capital: </b>${item.capital}</p>
        <p><b>Population: </b>${item.population.toLocaleString()}</p>
        <p><b>Languages: </b>${Object.values(item.languages).join(', ')}</p>
        </div>
    </div>
    `
      )
      .join(''));
  }
}
searchInput.addEventListener('input', debounce(findCountry, DEBOUNCE_DELAY));
searchInput.insertAdjacentHTML('beforebegin', '<h1>Country Finder</h1>');
