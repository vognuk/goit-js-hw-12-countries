import FetchCountries   from './fetchCountries';
import countryListTpl   from '../templates/dropdown.hbs';
import countriesListTpl from '../templates/countries-list.hbs';
import countryInfoTpl   from '../templates/country-viewer.hbs';
import { notification } from './notification';

const debounce = require('lodash.debounce');

export default class GenerateMarkup {
  constructor({ inputElement, countriesBlock, searchBlock, countriesList }) {
    this.refs = {
      input:           document.querySelector(inputElement),
      countriesMarkup: document.querySelector(countriesBlock),
      searchBlock:     document.querySelector(searchBlock),
      countriesList:   document.querySelector(countriesList)
    }
    this.init();
  }
  
  init() {
    this.debounce = debounce(this.onSearch.bind(this), 500);
    this.refs.input.addEventListener('input', this.debounce);
  }

  onSearch(event) {
    const fetchCountries = new FetchCountries();
    this.clearCountriesMarkUp.apply(this);
    fetchCountries.query = event.target.value.trim();

    if (fetchCountries.query === '') {
      this.clearInputField.bind(this);
      return;
    }

    fetchCountries.getCountryListWithSamePartOfName()
      .then(this.appendCountriesMarkUp.bind(this))
      .then(this.clearInputField.bind(this))
      .catch(this.onCatchError.bind(this))
  }

  appendCountriesMarkUp(countries) {
    const { length } = countries;
    this.clearCountriesMarkUp();

    if(countries.find (code => code.status === '404')){
      return notification();
    }

    if (length < 2) {
      this.showCountryInfo(countries);
      return;
    }
    
    if (length >= 2 && length <= 10) {
      this.clearCountriesMarkUp.apply(this);
      this.showCountryListDropdown(countries);
      this.showCountryListStatic(countries);
      return;
    }
    
    if (length > 10) {
      notification();
      return;
    }
  }

  showCountryInfo(countries) {
    document.querySelector(".countries__geted-list").remove();
    this.refs.countriesMarkup.insertAdjacentHTML('beforeend', countryInfoTpl(countries));
  }

  showCountryListDropdown(countries) {
    this.refs.countriesMarkup.insertAdjacentHTML('beforeend', countryListTpl(countries));
    
    let inputCountry = document.querySelector('.js-search');
    inputCountry.setAttribute("list", "countries-list");
  }

  showCountryListStatic(countries) {
    this.refs.searchBlock.insertAdjacentHTML('beforeend', countriesListTpl(countries));  
  }

  clearCountriesMarkUp() {
    return this.refs.countriesMarkup.innerHTML = '';
  }

  clearInputField() {
    return this.refs.input.value = '';
  }

  onCatchError() {
    this.clearInputField();
    notification();
    return;
  }
}
