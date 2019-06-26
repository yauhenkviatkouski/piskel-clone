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

export default function preview() {
  document.querySelector('.control-panel').innerHTML = '<div class="preview"></div><h4>FPS: <span class="fps-value">0</span></h4><div class="fps-bar"><div class="fps-bar__slider"></div></div><button class="button_full-screen">Full screen</button>';
  document.querySelector('.preview').insertAdjacentElement('afterbegin', createElement('canvas'));
  drawPreviewCanvas();
}
