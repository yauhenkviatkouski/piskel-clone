/* eslint-disable max-len */
import './preview.css';
import { createElement } from '../../../utilites/common-functions';

let canvasNumber = 0;

function drawPreviewCanvas() {
  if (canvasNumber >= window.state.allCanvases.length) {
    canvasNumber = 0;
  }
  const ctxPreviewCanvas = document.querySelector('.preview canvas').getContext('2d');
  ctxPreviewCanvas.clearRect(0, 0, window.state.canvasSize, window.state.canvasSize);
  ctxPreviewCanvas.drawImage(window.state.allCanvases[canvasNumber], 0, 0);
  canvasNumber += 1;
  const milliseconds = 1000 / window.state.fps;
  setTimeout(drawPreviewCanvas, milliseconds);
}

function frameControl() {
  document.querySelector('.control-panel input').addEventListener('input', (input) => {
    const newValue = Number(input.srcElement.value);
    window.state.fps = newValue;
    document.querySelector('.fps-value').textContent = newValue;
  });
}

function fullScreen() {
  document.querySelector('.button_full-screen').addEventListener('click', () => {
    document.querySelector('.preview canvas').requestFullscreen();
  });
}

export default function preview() {
  // document.querySelector('.control-panel').insertAdjacentElement('afterbegin', createElement('div', 'preview-wrapper'));
  // document.querySelector('.preview-wrapper').insertAdjacentElement('afterbegin', createElement('div', 'preview-wrapper'));

  document.querySelector('.control-panel').innerHTML = '<div class="preview"><h4>FPS: <span class="fps-value">1</span></h4><input type="range" name="fps" min="1" max="25" value="1"><button class="button_full-screen">Full screen</button></div>';
  document.querySelector('.preview').insertAdjacentElement('afterbegin', createElement('canvas'));
  drawPreviewCanvas();
  frameControl();
  fullScreen();
}
