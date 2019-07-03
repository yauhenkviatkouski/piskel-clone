import './rectangle.css';
import { createElement } from '../../../utilites/common-functions';

function rectanglePath(startX, startY, finishX, finishY) {
  const result = [];
  let x0 = startX;
  let y0 = startY;
  const x1 = finishX;
  const y1 = finishY;
  if (x0 < x1) {
    while (x0 <= x1) {
      result.push([x0, y0]);
      result.push([x0, y1]);
      x0 += 1;
    }
  } else {
    while (x1 <= x0) {
      result.push([x0, y0]);
      result.push([x0, y1]);
      x0 -= 1;
    }
  }
  x0 = startX;
  if (y0 < y1) {
    while (x0 <= y1) {
      result.push([x0, y0]);
      result.push([x1, y0]);
      y0 += 1;
    }
  } else {
    while (y1 <= y0) {
      result.push([x0, y0]);
      result.push([x1, y0]);
      y0 -= 1;
    }
  }
  return result;
}

export function rectangle(mouseEvent) {
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
      const finishX = Math.floor(move.offsetX / devider);
      const finishY = Math.floor(move.offsetY / devider);
      const path = rectanglePath(startX, startY, finishX, finishY);
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

export function rectangleTool() {
  const rectangleButton = createElement('button', 'button button_rectangle', 'rectangle');
  document.querySelector('.tools').insertAdjacentElement('beforeend', rectangleButton);
  rectangleButton.addEventListener('click', () => {
    document.getElementById(`${window.state.handlerId}`).style.border = '';
    document.querySelector('.button_rectangle').style.border = 'white 2px dashed';
    window.state.handlerMove = rectangle;
    window.state.handlerId = 'rectangle';
  });
}
