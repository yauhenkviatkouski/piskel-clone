import './canvas-block.css';
import { createElement } from '../../utilites/common-functions';
import canvasHandler from './canvas/canvas';

// function showCanvas() { // ------=============++++++-------------так а нахуя она нужна бл???
//   const oldCanvas = document.querySelector('.canvas-field').lastChild;
//   if (oldCanvas.tagName === 'CANVAS') {
//     oldCanvas.remove();
//   }
// eslint-disable-next-line max-len
//   document.querySelector('.canvas-field').insertAdjacentElement('beforeend', window.state.allCanvases[window.state.currentCanvas]);
// }

export default function canvasBlock() {
  document.body.insertAdjacentElement('beforeend', createElement('div', 'canvas-block'));
  const canvasField = createElement('div', 'canvas-field');
  document.querySelector('.canvas-block').insertAdjacentElement('afterbegin', canvasField); // поле вставляется в канвас блок
  const canvasTemporary = createElement('canvas', 'canvas-field__canvasTemporary');
  canvasTemporary.getContext('2d');
  canvasTemporary.width = window.state.canvasSize;
  canvasTemporary.height = canvasTemporary.width;
  document.querySelector('.canvas-field').insertAdjacentElement('afterbegin', canvasTemporary); // временный канвас  вставляется в канвас-поле  (в начало)
  document.querySelector('.canvas-field').insertAdjacentElement('afterbegin', window.state.allCanvases[window.state.currentCanvas]);
  canvasHandler();
}
