import './canvas-block.css';
import { createElement } from '../../utilites/common-functions';

export default function canvasBlock() {
  document.querySelector('.tools').insertAdjacentElement('afterend', createElement('div', 'canvas-block'));
  const canvasField = createElement('div', 'canvas-field');
  document.querySelector('.canvas-block').insertAdjacentElement('afterbegin', canvasField);
  const canvasTemporary = createElement('canvas', 'canvas-field__canvasTemporary');
  canvasTemporary.getContext('2d');
  canvasTemporary.width = window.state.canvasSize;
  canvasTemporary.height = canvasTemporary.width;
  document.querySelector('.canvas-field').insertAdjacentElement('afterbegin', canvasTemporary);
  document.querySelector('.canvas-field').insertAdjacentElement('afterbegin', window.state.allCanvases[window.state.currentCanvas]);
  canvasTemporary.addEventListener('mousedown', (mouseDown) => {
    window.state.handlerMove(mouseDown);
  });
  canvasTemporary.addEventListener('click', (click) => {
    window.state.handlerMove(click);
  });
  canvasTemporary.addEventListener('contextmenu', (contextmenu) => {
    contextmenu.preventDefault();
  });
}
