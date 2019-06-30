/* eslint-disable array-callback-return */
import './paint-bucket.css';
import { createElement } from '../../../utilites/common-functions';

/* eslint-disable consistent-return */
/* eslint-disable max-len */
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
  if (x >= 0 && x < window.state.canvasSize && y >= 0 && y < window.state.canvasSize) return true;
}

function getNeighbors(x, y, pointsArray) {
  const neighbors = [];
  function isInArray(x0, y0) {
    if (pointsArray.length === 0) return false;
    return pointsArray.some((coordinates) => {
      if (coordinates[0] === x0 && coordinates[1] === y0) return true;
    });
  }
  if (isInsideCanvas(x - 1, y) && colorOfPoint(x - 1, y) === colorOfPoint(x, y) && !isInArray(x - 1, y)) {
    neighbors.push([x - 1, y]);
  }
  if (isInsideCanvas(x, y - 1) && colorOfPoint(x, y - 1) === colorOfPoint(x, y) && !isInArray(x, y - 1)) {
    neighbors.push([x, y - 1]);
  }
  if (isInsideCanvas(x + 1, y) && colorOfPoint(x + 1, y) === colorOfPoint(x, y) && !isInArray(x + 1, y)) {
    neighbors.push([x + 1, y]);
  }
  if (isInsideCanvas(x, y + 1) && colorOfPoint(x, y + 1) === colorOfPoint(x, y) && !isInArray(x, y + 1)) {
    neighbors.push([x, y + 1]);
  }
  return neighbors;
}

function bucket(pointsArray) {
  const canvas = document.querySelector('.canvas-field').firstChild;
  const ctxCanvas = canvas.getContext('2d');
  function fillUpPoint() {
    const lastPoints = pointsArray.pop();
    const x = lastPoints[0];
    const y = lastPoints[1];
    // eslint-disable-next-line no-param-reassign
    pointsArray = pointsArray.concat(getNeighbors(x, y, pointsArray));
    ctxCanvas.fillStyle = window.state.color1;
    ctxCanvas.fillRect(x, y, 1, 1);
  }
  while (pointsArray.length) {
    fillUpPoint();
  }
}

export function paintBucket(click) {
  global.console.log('bucket');
  const devider = 640 / window.state.canvasSize;
  const clickX = Math.floor(click.offsetX / devider);
  const clickY = Math.floor(click.offsetY / devider);
  const canvas = document.querySelector('.canvas-field').firstChild;
  const rgbaArr = canvas.getContext('2d').getImageData(clickX, clickX, 1, 1).data;
  if (rgbaArr.join() === '0,0,0,0') {
    bucket([[clickX, clickY]]);
  }
  if (rgbToHex(rgbaArr[0], rgbaArr[1], rgbaArr[2]) === window.state.color1) return;
  bucket([[clickX, clickY]]);
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
