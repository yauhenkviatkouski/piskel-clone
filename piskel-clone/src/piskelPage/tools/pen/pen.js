import './pen.css';
import { createElement } from '../../../utilites/common-functions';
import brezenham from '../common-utils';

const pen = function pen(mouseEvent) {
  const devider = 640 / window.state.canvasSize;
  const canvasTemporary = document.querySelector('.canvas-field__canvasTemporary');
  const ctxTemporary = canvasTemporary.getContext('2d');

  if (mouseEvent.type === 'click') {
    const clickX = Math.floor(mouseEvent.offsetX / devider);
    const clickY = Math.floor(mouseEvent.offsetY / devider);
    ctxTemporary.fillStyle = window.state.color1;
    ctxTemporary.fillRect(clickX, clickY, 1, 1);
  } else {
    let isMouseDown = true;
    let startX = Math.floor(mouseEvent.offsetX / devider);
    let startY = Math.floor(mouseEvent.offsetY / devider);
    canvasTemporary.addEventListener('mousemove', (moveEvent) => {
      if (isMouseDown) {
        const finishX = Math.floor(moveEvent.offsetX / devider);
        const finishY = Math.floor(moveEvent.offsetY / devider);
        const path = brezenham(startX, startY, finishX, finishY);
        for (let i = 0; i < path.length; i += 1) {
          ctxTemporary.fillStyle = window.state.color1;
          ctxTemporary.fillRect(path[i][0], path[i][1], 1, 1);
        }
        startX = finishX;
        startY = finishY;
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
};

export default function penButton() {
  const buttonPen = createElement('button', 'button button_pen');
  document.querySelector('.tools').insertAdjacentElement('beforeend', buttonPen);
  window.state.handlerMove = pen;
  document.querySelector('.button_pen').style.border = 'white 2px solid';
  buttonPen.addEventListener('click', () => {
    document.querySelector('.tools button').style.border = '';
    document.querySelector('.button_pen').style.border = 'white 2px solid';
    window.state.handlerMove = pen;
  });
}
