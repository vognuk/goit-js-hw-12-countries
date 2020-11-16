import FetchCountries from './fetchCountries';
import countryListTpl from '../templates/dropdown.hbs';
import countryInfoTpl from '../templates/country-viewer.hbs';
import { notification } from './notification';

const debounce = require('lodash.debounce');

export default class AppendMarkup {
  constructor({ inputElement, countriesBlock }) {
    this.refs = {
      input: document.querySelector(inputElement),
      countriesMarkup: document.querySelector(countriesBlock)
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
    

        if (fetchCountries.query === '' ) {
            this.clearInputField.bind(this);
            notification('error', "Enter country name!");
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
		
        if (length <= 2) {
            this.showCountryInfo(countries);
            return;
        }
        
        if (length >= 2 && length <= 10) {
            this.clearCountriesMarkUp.apply(this);
            this.showCountryList(countries);
            return;
        }
        
        if (length > 10) {
            notification('error', "Too many matches found. Please enter a more specific query!");
            return;
        }
    }

    showCountryInfo(countries) {
        this.refs.countriesMarkup.insertAdjacentHTML('beforeend', countryInfoTpl(countries));
    }

    showCountryList(countries) {
        this.refs.countriesMarkup.insertAdjacentHTML('beforeend', countryListTpl(countries));
        let inputCountry = document.querySelector('.js-search');
        inputCountry.setAttribute("list", "countries-list");
        const clickEventEmulation = document.createEvent('click');
        inputCountry.setAttribute("placeholder", "Check from list, bro ->");
    }

    clearCountriesMarkUp() {
        return this.refs.countriesMarkup.innerHTML= '';
    }

    clearInputField() {
        this.refs.input.value = '';
    }

    onCatchError() {
      this.clearInputField();
      notification('error', "Enter country name!");
      return;
    }
}
