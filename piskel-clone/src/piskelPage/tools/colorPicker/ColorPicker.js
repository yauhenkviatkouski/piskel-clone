import './colorPicker.css';
import { createElement } from '../../../utilites/common-functions';

function componentToHex(c) {
  const hex = c.toString(16);
  if (hex.length === 1) return `0${hex}`;
  return hex;
}

function rgbToHex(r, g, b) {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

function colorOfPointHex(x, y) {
  const canvas = document.querySelector('.canvas-field').firstChild;

  const rgbaArr = canvas.getContext('2d').getImageData(x, y, 1, 1).data;
  return rgbToHex(rgbaArr[0], rgbaArr[1], rgbaArr[2]);
}

export const colorpicker = function dithering(mouseEvent) {
  mouseEvent.preventDefault();
  const devider = 640 / window.state.canvasSize;

  const pointX = Math.floor(mouseEvent.offsetX / devider);
  const pointY = Math.floor(mouseEvent.offsetY / devider);

  if (mouseEvent.which === 1) {
    document.querySelector('.color-primary').value = colorOfPointHex(pointX, pointY);
    window.state.color1 = colorOfPointHex(pointX, pointY);
  }
  if (mouseEvent.which === 3) {
    document.querySelector('.color-secondary').value = colorOfPointHex(pointX, pointY);
    window.state.color2 = colorOfPointHex(pointX, pointY);
  }

  document.addEventListener('mouseup', (mouseUp) => {
    mouseUp.preventDefault();
  });
};

export default function colorpickerButton() {
  const buttonColorpicker = createElement('button', 'button button_colorpicker', 'colorpicker');
  document.querySelector('.tools').insertAdjacentElement('beforeend', buttonColorpicker);
  buttonColorpicker.addEventListener('click', () => {
    document.getElementById(`${window.state.handlerId}`).style.border = '';
    document.querySelector('.button_colorpicker').style.border = 'white 2px dashed';
    window.state.handlerMove = colorpicker;
    window.state.handlerId = 'colorpicker';
  });
}
