import './stroke.css';
import brezenham from '../common-utils';
import { createElement } from '../../../utilites/common-functions';

export function stroke(mouseEvent) {
  const devider = 640 / window.state.canvasSize;
  const canvasTemporary = document.querySelector('.canvas-field__canvasTemporary');
  const ctxTemporary = canvasTemporary.getContext('2d');
  if (mouseEvent.which === 3) {
    ctxTemporary.fillStyle = window.state.color2;
  } else {
    ctxTemporary.fillStyle = window.state.color1;
  }
  let isMouseDown = true;
  const startX = Math.floor(mouseEvent.offsetX / devider);
  const startY = Math.floor(mouseEvent.offsetY / devider);

  document.body.addEventListener('mousemove', (move) => {
    if (isMouseDown) {
      // const end = { x: Math.floor(e.offsetX / devider, y: Math.floor(e.offsetY / devider) };
      const finishX = Math.floor(move.offsetX / devider);
      const finishY = Math.floor(move.offsetY / devider);
      const path = brezenham(startX, startY, finishX, finishY);
      ctxTemporary.clearRect(0, 0, canvasTemporary.width, canvasTemporary.height);
      if (mouseEvent.which === 3) {
        ctxTemporary.fillStyle = window.state.color2;
      } else {
        ctxTemporary.fillStyle = window.state.color1;
      }
      for (let i = 0; i < path.length; i += 1) {
        ctxTemporary.fillRect(path[i][0], path[i][1], 1, 1);
      }
    }
  });
  document.addEventListener('mouseup', () => {
    isMouseDown = false;
    window.state.allCanvases[window.state.currentCanvas].getContext('2d').drawImage(canvasTemporary, 0, 0);
    const currentFrame = document.querySelectorAll('.frame-wrapper')[window.state.currentCanvas].lastChild;
    currentFrame.getContext('2d').drawImage(canvasTemporary, 0, 0);
    ctxTemporary.clearRect(0, 0, canvasTemporary.width, canvasTemporary.height);
  });
}

export function strokeTool() {
  const srtokeButton = createElement('button', 'button button_stroke', 'stroke');
  document.querySelector('.tools').insertAdjacentElement('beforeend', srtokeButton);
  srtokeButton.addEventListener('click', () => {
    document.getElementById(`${window.state.handlerId}`).style.border = '';
    document.querySelector('.button_stroke').style.border = 'white 2px dashed';
    window.state.handlerMove = stroke;
    window.state.handlerId = 'stroke';
  });
}
