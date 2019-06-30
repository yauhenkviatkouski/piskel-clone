
import './paint-bucket.css';
import { createElement } from '../../../utilites/common-functions';

function colorOfPoint(x, y) {
  const canvas = document.querySelector('.canvas-field').firstChild;

  const rgbaArr = canvas.getContext('2d').getImageData(x, y, 1, 1).data;
  return `rgba(${rgbaArr[0]},${rgbaArr[1]},${rgbaArr[2]},${rgbaArr[3]})`;
}

function componentToHex(c) {
  const hex = c.toString(16);
  if (hex.length === 1) return `0${hex}`;
  return hex;
}

function rgbToHex(r, g, b) {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

function isInsideCanvas(x, y) {
  let result = false;
  const size = window.state.canvasSize;
  if (x >= 0 && x < size && y >= 0 && y < size) result = true;
  return result;
}

function bucket(pointsArray) {
  function isInArray(x0, y0) {
    const result = pointsArray.some(point => (point[0] === x0 && point[1] === y0));
    return result;
  }
  const canvas = document.querySelector('.canvas-field').firstChild;
  const ctxCanvas = canvas.getContext('2d');
  const currentFrame = document.querySelectorAll('.frame-wrapper')[window.state.currentCanvas].lastChild;
  const ctxCurrentFrame = currentFrame.getContext('2d');
  while (pointsArray.length) {
    if (pointsArray.length > 10) return;
    const cursorPoint = pointsArray.shift();
    const x = cursorPoint[0];
    let y = cursorPoint[1];
    const colorStartPoint = colorOfPoint(x, y);
    while (isInsideCanvas(x, y - 1) && colorOfPoint(x, y - 1) === colorStartPoint) {
      y -= 1;
    }
    let reachLeft = false;
    let reachRight = false;
    while (isInsideCanvas(x, y) && colorOfPoint(x, y) === colorStartPoint) {
      ctxCanvas.fillStyle = window.state.color1;
      ctxCurrentFrame.fillStyle = window.state.color1;
      ctxCanvas.fillRect(x, y, 1, 1);
      ctxCurrentFrame.fillRect(x, y, 1, 1);
      if (isInsideCanvas(x - 1, y) && colorOfPoint(x - 1, y) === colorStartPoint) {
        if (!reachLeft) {
          if (!isInArray(x - 1, y)) {
            pointsArray.push([x - 1, y]);
            reachLeft = true;
          }
        }
      } else {
        reachLeft = false;
      }
      if (isInsideCanvas(x + 1, y) && colorOfPoint(x + 1, y) === colorStartPoint) {
        if (!reachRight) {
          if (!isInArray(x + 1, y)) {
            pointsArray.push([x + 1, y]);
            reachRight = true;
          }
        }
      } else {
        reachRight = false;
      }
      y += 1;
    }
  }
}

export function paintBucket(click) {
  global.console.log('bucket');
  const devider = 640 / window.state.canvasSize;
  const clickX = Math.floor(click.offsetX / devider);
  const clickY = Math.floor(click.offsetY / devider);
  const canvas = document.querySelector('.canvas-field').firstChild;
  const rgbaArr = canvas.getContext('2d').getImageData(clickX, clickY, 1, 1).data;
  function startbucket() {
    if (rgbaArr.join() === '0,0,0,0') {
      bucket([[clickX, clickY]]);
      return;
    }
    if (rgbToHex(rgbaArr[0], rgbaArr[1], rgbaArr[2]) === window.state.color1) return;
    bucket([[clickX, clickY]]);
  }
  setTimeout(startbucket, 0);
}

export function bucketButton() {
  const buttonBucket = createElement('button', 'button button_bucket', 'paintBucket');
  document.querySelector('.tools').insertAdjacentElement('beforeend', buttonBucket);
  buttonBucket.addEventListener('click', () => {
    document.getElementById(`${window.state.handlerId}`).style.border = '';
    window.state.handlerMove = paintBucket;
    document.querySelector('.button_bucket').style.border = 'white 2px dashed';
    window.state.handlerClick = paintBucket;
    window.state.handlerId = 'paintBucket';
  });
}
