import { createElement } from '../../../utilites/common-functions';
import { penAndEraser } from './penAndEraser';

export default function eraserButton() {
  const buttonEraser = createElement('button', 'button_eraser', 'eraser');
  document.querySelector('.tools').insertAdjacentElement('beforeend', buttonEraser);
  buttonEraser.addEventListener('click', () => {
    document.getElementById(`${window.state.handlerId}`).style.border = '';
    document.querySelector('.button_eraser').style.border = 'white 2px solid';
    window.state.handlerMove = penAndEraser;
    window.state.handlerId = 'eraser';
  });
}
