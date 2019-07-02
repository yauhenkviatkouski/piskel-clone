import './localStorage.css';
import { createElement, canvasesToData64 } from '../../../utilites/common-functions';

function saveOnLocalAuto() {
  canvasesToData64();
  localStorage.setItem('stateForReload', JSON.stringify(window.state));
  setTimeout(() => {
    saveOnLocalAuto();
  }, 3000);
}

export default function loadFromLocal() {
  const buttonLoadLocal = createElement('button', 'button button_load-from-local');
  buttonLoadLocal.textContent = 'Load latest Sprite';
  document.querySelector('header').insertAdjacentElement('afterbegin', buttonLoadLocal);
  document.querySelector('.canvas-field__canvasTemporary').addEventListener('mousedown', () => {
    saveOnLocalAuto();
  }, { once: true });
  buttonLoadLocal.addEventListener('click', () => {
    sessionStorage.setItem('localState', localStorage.getItem('stateForReload'));
    window.location.reload();
  });
}
