import './resize-canvas.css';
import { createElement, canvasesToData64 } from '../../../utilites/common-functions';

function resizeCanvas(newSize) {
  sessionStorage.clear();
  const previousSize = window.state.canvasSize;
  window.state.canvasSize = newSize;
  document.querySelector('.sizeValue').textContent = `Canvas size: ${window.state.canvasSize}px`;
  window.state.allCanvases.forEach((canvas) => {
    const copyCanvas = createElement('canvas');
    copyCanvas.getContext('2d').drawImage(canvas, 0, 0);
    canvas.getContext('2d').clearRect(0, 0, previousSize, previousSize);
    canvas.getContext('2d').drawImage(copyCanvas, 0, 0);
  });
  canvasesToData64();
  sessionStorage.setItem('localState', JSON.stringify(window.state));
  window.location.reload();
}

export default function resizeBlock() {
  const resizeWrapper = createElement('div', 'resize-wrapper');
  resizeWrapper.innerHTML = '<h4><span class="sizeValue"></span></h4><button class="button button_resize-32">32px</button><button class="button button_resize-64">64px</button><button class="button button_resize-128">128px</button>';
  document.querySelector('.control-panel').insertAdjacentElement('beforeend', resizeWrapper);
  document.querySelector('.sizeValue').textContent = `Canvas size: ${window.state.canvasSize}px`;
  document.querySelector('.resize-wrapper').addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      let newSize;
      switch (event.target.className) {
        case 'button button_resize-32':
          newSize = 32;
          break;
        case 'button button_resize-64':
          newSize = 64;
          break;
        case 'button button_resize-128':
          newSize = 128;
          break;
        default:
          break;
      }
      resizeCanvas(newSize);
    }
  });
}
