import '../css/normalize.css';
import '../css/reset.css';
import '../css/main.min.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import GenerateMarkup from './js/generateMarkup';

const renderMarkup = new GenerateMarkup(
  {
  inputElement: '.js-search',
  countriesBlock: '.countries',
  searchBlock: '.countries__search',
  countriesList: 'countries__geted-list'
  }
);
