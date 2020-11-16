import '../css/normalize.css';
import '../css/reset.css';
import '../css/main.min.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import AppendMarkup from './js/generateMarkup';

const renderMarkup = new AppendMarkup({
  inputElement: '.js-search',
  countriesBlock: '.countries'
})

renderMarkup.init();
