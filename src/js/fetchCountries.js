import { error } from "@pnotify/core";
import { notification } from './notification';

export default class FetchCountries {
  constructor() {
    this.searchQuery = '';
  }

  getCountryListWithSamePartOfName() {
    return fetch(`https://restcountries.eu/rest/v2/name/${this.searchQuery}`)
      .then(
          res => res.json(),
          res => res.status)
      .then(countries => {return countries;})
      .catch(error=> notification('error', "Enter country name!"))
  }

  checkInput() {
    if(this.searchQuery = '') {
      return;
    }
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
