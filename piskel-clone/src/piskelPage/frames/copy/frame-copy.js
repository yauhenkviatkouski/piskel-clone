import './frame-copy.css';
import { createElement } from '../../../utilites/common-functions';

function drawFrame(canvas) {
  const frameWrapper = createElement('div', 'frame-wrapper');
  frameWrapper.innerHTML = '<button class="button button_frame-move"></button><button class="button button_frame-copy"></button><button class="button button_frame-delete"></button>';
  const canvasForFrame = createElement('canvas');
  canvasForFrame.getContext('2d').drawImage(canvas, 0, 0);
  frameWrapper.insertAdjacentElement('beforeend', canvasForFrame);
  return frameWrapper;
}

export default function frameCopy() {
  document.querySelector('.frames').addEventListener('click', (event) => {
    if (event.target.className === 'button button_frame-copy') {
      const newCanvas = createElement('canvas');
      window.state.allCanvases.push(newCanvas);
      const copiedFrame = event.path[1];
      const indexCopiedFrame = Array.prototype.indexOf.call(document.querySelector('.frames').children, copiedFrame);
      newCanvas.getContext('2d').drawImage(window.state.allCanvases[indexCopiedFrame], 0, 0);
      document.querySelector('.button_frame-add').insertAdjacentElement('beforebegin', drawFrame(newCanvas));
    }
  });
}
