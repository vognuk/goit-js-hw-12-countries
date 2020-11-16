import { error } from "@pnotify/core";

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
          .catch(error=> console.log(error))
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
