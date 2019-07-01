import './penAndEraser.css';
import { createElement } from '../../../utilites/common-functions';
import brezenham from '../common-utils';

export const penAndEraser = function pen(mouseEvent) {
  mouseEvent.preventDefault();
  const devider = 640 / window.state.canvasSize;
  const canvasTemporary = document.querySelector('.canvas-field__canvasTemporary');
  const ctxTemporary = canvasTemporary.getContext('2d');
  const clickX = Math.floor(mouseEvent.offsetX / devider);
  const clickY = Math.floor(mouseEvent.offsetY / devider);
  if (mouseEvent.which === 3) {
    ctxTemporary.fillStyle = window.state.color2;
  } else {
    ctxTemporary.fillStyle = window.state.color1;
  }
  if (window.state.handlerId === 'pen') {
    ctxTemporary.fillRect(clickX, clickY, 1, 1);
  } else {
    window.state.allCanvases[window.state.currentCanvas].getContext('2d').clearRect(clickX, clickY, 1, 1);
    const currentFrame = document.querySelectorAll('.frame-wrapper')[window.state.currentCanvas].lastChild;
    currentFrame.getContext('2d').clearRect(clickX, clickY, 1, 1);
  }

  let isMouseDown = true;
  let startX = Math.floor(mouseEvent.offsetX / devider);
  let startY = Math.floor(mouseEvent.offsetY / devider);

  canvasTemporary.addEventListener('mousemove', (moveEvent) => {
    if (isMouseDown) {
      const finishX = Math.floor(moveEvent.offsetX / devider);
      const finishY = Math.floor(moveEvent.offsetY / devider);
      const path = brezenham(startX, startY, finishX, finishY);
      for (let i = 0; i < path.length; i += 1) {
        if (moveEvent.which === 3) {
          ctxTemporary.fillStyle = window.state.color2;
        } else {
          ctxTemporary.fillStyle = window.state.color1;
        }
        if (window.state.handlerId === 'pen') {
          ctxTemporary.fillRect(path[i][0], path[i][1], 1, 1);
        } else {
          window.state.allCanvases[window.state.currentCanvas].getContext('2d').clearRect(path[i][0], path[i][1], 1, 1);
          const currentFrame = document.querySelectorAll('.frame-wrapper')[window.state.currentCanvas].lastChild;
          currentFrame.getContext('2d').clearRect(path[i][0], path[i][1], 1, 1);
        }
      }
      startX = finishX;
      startY = finishY;
    }
  });

  document.addEventListener('mouseup', (mouseUp) => {
    mouseUp.preventDefault();
    isMouseDown = false;

    window.state.allCanvases[window.state.currentCanvas].getContext('2d').drawImage(canvasTemporary, 0, 0);
    const currentFrame = document.querySelectorAll('.frame-wrapper')[window.state.currentCanvas].lastChild;
    currentFrame.getContext('2d').drawImage(canvasTemporary, 0, 0);
    ctxTemporary.clearRect(0, 0, canvasTemporary.width, canvasTemporary.height);
  });
};

export function penButton() {
  const buttonPen = createElement('button', 'button button_pen', 'pen');
  document.querySelector('.tools').insertAdjacentElement('beforeend', buttonPen);
  window.state.handlerMove = penAndEraser;
  document.getElementById(`${window.state.handlerId}`).style.border = '';
  document.querySelector('.button_pen').style.border = 'white 2px dashed';
  window.state.handlerId = 'pen';
  buttonPen.addEventListener('click', () => {
    document.getElementById(`${window.state.handlerId}`).style.border = '';
    document.querySelector('.button_pen').style.border = 'white 2px dashed';
    window.state.handlerMove = penAndEraser;
    window.state.handlerId = 'pen';
  });
}
