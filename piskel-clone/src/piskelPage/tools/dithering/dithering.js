import './dithering.css';
import { createElement } from '../../../utilites/common-functions';

export const dithering = function dithering(mouseEvent) {
  mouseEvent.preventDefault();
  const devider = 640 / window.state.canvasSize;
  const canvasTemporary = document.querySelector('.canvas-field__canvasTemporary');

  const ctxCanvas = window.state.allCanvases[window.state.currentCanvas].getContext('2d');
  const ctxCurrentFrame = document.querySelectorAll('.frame-wrapper')[window.state.currentCanvas].lastChild.getContext('2d');

  let isMouseDown = true;

  canvasTemporary.addEventListener('mousemove', (moveEvent) => {
    if (isMouseDown) {
      const pointX = Math.floor(moveEvent.offsetX / devider);
      const pointY = Math.floor(moveEvent.offsetY / devider);
      if ((pointX % 2 === 0 && pointY % 2 === 0) || (pointX % 2 !== 0 && pointY % 2 !== 0)) {
        ctxCanvas.fillStyle = window.state.color1;
        ctxCurrentFrame.fillStyle = window.state.color1;
      } else {
        ctxCanvas.fillStyle = window.state.color2;
        ctxCurrentFrame.fillStyle = window.state.color2;
      }
      ctxCanvas.fillRect(pointX, pointY, 1, 1);
      ctxCurrentFrame.fillRect(pointX, pointY, 1, 1);
    }
  });

  document.addEventListener('mouseup', (mouseUp) => {
    mouseUp.preventDefault();
    isMouseDown = false;
  });
};

export default function ditheringButton() {
  const buttonDithering = createElement('button', 'button button_dithering', 'dithering');
  document.querySelector('.tools').insertAdjacentElement('beforeend', buttonDithering);
  buttonDithering.addEventListener('click', () => {
    document.getElementById(`${window.state.handlerId}`).style.border = '';
    document.querySelector('.button_dithering').style.border = 'white 2px dashed';
    window.state.handlerMove = dithering;
    window.state.handlerId = 'dithering';
  });
}
