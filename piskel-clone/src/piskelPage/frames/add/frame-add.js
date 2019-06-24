import './frame-add.css';
import { createElement } from '../../../utilites/common-functions';

function drawFrame(canvas) {
  const frameWrapper = createElement('div', 'frame-wrapper');
  frameWrapper.innerHTML = '<button class="button button_frame-move"></button><button class="button button_frame-copy"></button><button class="button button_frame-delete"></button>';
  const canvasForFrame = createElement('canvas');
  canvasForFrame.getContext('2d').drawImage(canvas, 0, 0);
  frameWrapper.insertAdjacentElement('beforeend', canvasForFrame);
  return frameWrapper;
}

export default function frameAdd() {
  document.querySelector('.button_frame-add').addEventListener('click', () => {
    const newCanvas = createElement('canvas');
    window.state.allCanvases.push(newCanvas);
    document.querySelector('.button_frame-add').insertAdjacentElement('beforebegin', drawFrame(newCanvas));
  });
}
