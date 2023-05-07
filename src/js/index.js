import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import '../css/styles.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
// const allLi = document.getElementsByTagName("li");

// console.log(allLi);
// allLi.style.listStyle = "square";

const handleSearchCountry = e => {
  const inputCountry = e.target.value.trim();
  countryList.innerHTML = '';
  if (inputCountry != '') {
    fetchCountries(inputCountry)
      .then(data => {
        if (data.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (2 < data.length && data.length <= 10) {
          const elementos = data
            .map(
              country =>
                `<li class="country-elements">
                  <div class="country-element">    
                    <div class="country-img">
                      <img src=${country.flags.png} alt="" width = 80px>
                    </div>
                    <div class="country-content">
                      <h2>${country.name.common}</h2>
                    </div>
                  </div>
                </li>`
            )
            .join('');
          countryList.insertAdjacentHTML('beforeend', elementos);
          countryList.style.listStyle = 'none';

          const countryElements = document.getElementsByClassName('country-element');        
          for (const countryElement of countryElements) {
            countryElement.style.display = 'flex';
            countryElement.style.alignItems = 'center';
            countryElement.style.gap = "10px";
          }
        } else if (data.length === 1) {
          const countryInfo = data
            .map(
              country =>
                `<li class="country-element">
                    <div class="img-text">
                        <img class="country-limg"src=${
                          country.flags.png
                        } width = 80px> 
                        <h2> ${country.name.common} </h2>
                    </div>
                    <p><b>Capital:</b> ${country.capital}</p>
                    <p><b>Poblacion:</b> ${country.population}</p>
                    <p><b>Idiomas:</b> ${Object.values(country.languages)}</p>
                </li>`
            )
            .join('');

          countryList.insertAdjacentHTML('beforeend', countryInfo);
        }
      })
      .catch(error => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  }
};

searchInput.addEventListener(
  'input',
  debounce(handleSearchCountry, DEBOUNCE_DELAY)
);
