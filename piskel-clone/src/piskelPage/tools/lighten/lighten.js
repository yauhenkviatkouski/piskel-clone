import './lighten.css';
import { createElement } from '../../../utilites/common-functions';

export const lighten = function pen(mouseEvent) {
  mouseEvent.preventDefault();
  const devider = 640 / window.state.canvasSize;
  const canvasTemporary = document.querySelector('.canvas-field__canvasTemporary');
  const ctxTemporary = canvasTemporary.getContext('2d');
  const clickX = Math.floor(mouseEvent.offsetX / devider);
  const clickY = Math.floor(mouseEvent.offsetY / devider);
  ctxTemporary.fillStyle = 'rgba(255,255,255,0.15)';
  ctxTemporary.fillRect(clickX, clickY, 1, 1);

  const ctxCanvas = window.state.allCanvases[window.state.currentCanvas].getContext('2d');
  const ctxCurrentFrame = document.querySelectorAll('.frame-wrapper')[window.state.currentCanvas].lastChild.getContext('2d');

  let isMouseDown = true;

  canvasTemporary.addEventListener('mousemove', (moveEvent) => {
    if (isMouseDown) {
      const pointX = Math.floor(moveEvent.offsetX / devider);
      const pointY = Math.floor(moveEvent.offsetY / devider);
      ctxCanvas.fillStyle = 'rgba(255,255,255,0.15)';
      ctxCanvas.fillRect(pointX, pointY, 1, 1);
      ctxCurrentFrame.fillStyle = 'rgba(255,255,255,0.15)';
      ctxCurrentFrame.fillRect(pointX, pointY, 1, 1);
    }
  });

  document.addEventListener('mouseup', (mouseUp) => {
    mouseUp.preventDefault();
    isMouseDown = false;
  });
};

export default function lightenButton() {
  const buttonLighten = createElement('button', 'button button_lighten', 'lighten');
  document.querySelector('.tools').insertAdjacentElement('beforeend', buttonLighten);
  buttonLighten.addEventListener('click', () => {
    document.getElementById(`${window.state.handlerId}`).style.border = '';
    document.querySelector('.button_lighten').style.border = 'white 2px dashed';
    window.state.handlerMove = lighten;
    window.state.handlerId = 'lighten';
  });
}
