import './colorSelect.css';
import { createElement } from '../../../utilites/common-functions';

export default function colorSelect() {
  const colorBlock = createElement('div', 'color-block');
  document.querySelector('.tools').lastChild.insertAdjacentElement('afterend', colorBlock);
  const inputSecondary = createElement('input', 'color-secondary');
  colorBlock.insertAdjacentElement('afterbegin', inputSecondary);
  inputSecondary.type = 'color';
  inputSecondary.value = '#ffffff';
  const inputPrimary = createElement('input', 'color-primary');
  colorBlock.insertAdjacentElement('beforeend', inputPrimary);
  inputPrimary.type = 'color';
  inputPrimary.value = 'black';
  inputPrimary.addEventListener('input', (colorPrimary) => {
    window.state.color1 = colorPrimary.srcElement.value;
  });
  inputSecondary.addEventListener('input', (colorSecondary) => {
    window.state.color2 = colorSecondary.srcElement.value;
  });
}
