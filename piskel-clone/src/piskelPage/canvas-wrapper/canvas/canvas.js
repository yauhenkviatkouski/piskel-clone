import './canvas.css';
import { createElement, brezenhamLine } from '../../../common-functions';
import state from '../../../piskel-state';

export default function canvasHandler() {
  function devider() {
    return 640 / state.canvasSize;
  }

  const canvasField = createElement('div', 'canvas-field');
  document.querySelector('.canvas-wrapper').insertAdjacentElement('beforeend', canvasField);
  const canvas = createElement('canvas', 'canvas-field__canvas');
  document.querySelector('.canvas-field').insertAdjacentElement('beforeend', canvas);

  canvas.width = state.canvasSize;
  canvas.height = canvas.width;
  const ctx = canvas.getContext('2d');

  const canvasTemporary = createElement('canvas', 'canvas-field__canvasTamporary');
  const ctxTemporary = canvasTemporary.getContext('2d');
  document.querySelector('.canvas-field').insertAdjacentElement('afterbegin', canvasTemporary);

  canvasTemporary.width = state.canvasSize;
  canvasTemporary.height = canvasTemporary.width;

  let isMouseDown = false;
  const begin = {};
  canvasField.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    begin.x = Math.floor(e.offsetX / devider());
    begin.y = Math.floor(e.offsetY / 5);
  });
  canvasField.addEventListener('mouseup', () => {
    isMouseDown = false;
    ctx.drawImage(canvasTemporary, 0, 0);
    ctxTemporary.clearRect(0, 0, canvasTemporary.width, canvasTemporary.height);
  });
  canvasField.addEventListener('mouseleave', () => {
    isMouseDown = false;
    ctx.drawImage(canvasTemporary, 0, 0);
    ctxTemporary.clearRect(0, 0, canvasTemporary.width, canvasTemporary.height);
  });
  canvasField.addEventListener('mousemove', (e) => {
    if (isMouseDown) {
      const end = { x: Math.floor(e.offsetX / 5), y: Math.floor(e.offsetY / 5) };
      const path = brezenhamLine(begin.x, begin.y, end.x, end.y);
      ctxTemporary.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < path.length; i += 1) {
        ctxTemporary.fillRect(path[i][0], path[i][1], 1, 1);
      }
    }
  });
}
