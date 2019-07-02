/* eslint-disable max-len */
import './coordinates.css';
import { createElement } from '../../../utilites/common-functions';

export default function coordinatesBlock() {
  const coordinates = createElement('div', 'coordinates-block');
  coordinates.innerHTML = '<div class="pointX">point X:</div><div class="pointY">point Y:</div>';
  document.querySelector('.tools').insertAdjacentElement('beforeend', coordinates);
  document.querySelector('.canvas-field').addEventListener('mousemove', (move) => {
    const devider = 640 / window.state.canvasSize;
    const pointX = Math.floor(move.offsetX / devider);
    const pointY = Math.floor(move.offsetY / devider);
    document.querySelector('.pointX').textContent = `Point X: ${pointX + 1}`;
    document.querySelector('.pointY').textContent = `Point Y: ${pointY + 1}`;
  });
}
