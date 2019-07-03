import './header.css';
import { createElement } from '../../utilites/common-functions';

export default function header() {
  document.body.insertAdjacentElement('beforeend', createElement('header', 'header'));
  const google = createElement('div', 'google-block');
  document.querySelector('.header').insertAdjacentElement('afterbegin', google);
  google.innerHTML = '<div class="g-signin2" data-onsuccess="onSignIn" data-theme="dark"></div>';
  const greeting = createElement('div', 'greeting-block');
  document.querySelector('.header').insertAdjacentElement('beforeend', greeting);
}
