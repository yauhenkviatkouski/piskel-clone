import './frames.css';
import { createElement } from '../../utilites/common-functions';
import frameAdd from './add/frame-add';
import frameCopy from './copy/frame-copy';

function markCurrentFrame() {
  document.querySelector('.frames').children[window.state.currentCanvas].style.border = 'solid 4px #3D7939';
}

export function drawFrame(canvas) {
  const frameWrapper = createElement('div', 'frame-wrapper');
  frameWrapper.innerHTML = '<button class="button button_frame-move"></button><button class="button button_frame-copy"></button><button class="button button_frame-delete"></button>';
  const canvasForFrame = createElement('canvas');
  canvasForFrame.getContext('2d').drawImage(canvas, 0, 0);
  frameWrapper.insertAdjacentElement('beforeend', canvasForFrame);
  return frameWrapper;
}

export function drawAllFrames() {
  document.querySelectorAll('.frame-wrapper').forEach((frameWrapper) => {
    frameWrapper.remove();
  });
  window.state.allCanvases.forEach((canvas) => {
    document.querySelector('.button_frame-add').insertAdjacentElement('beforebegin', drawFrame(canvas));
  });
  markCurrentFrame();
}

function changeCurrentFrame() {
  document.querySelector('.frames').addEventListener('click', (event) => {
    if (event.target.tagName === 'CANVAS') {
      document.querySelector('.frames').children[window.state.currentCanvas].style.border = '';
      const newCrurrentFrame = event.path[1];
      const indexNewCurentFrame = Array.prototype.indexOf.call(document.querySelector('.frames').children, newCrurrentFrame);
      window.state.currentCanvas = indexNewCurentFrame;
      document.querySelector('.canvas-field').lastChild.remove();
      document.querySelector('.canvas-field').insertAdjacentElement('beforeend', window.state.allCanvases[indexNewCurentFrame]);
      // e.target.getContext('2d').drawImage(window.state.allCanvases[indexNewCurentFrame]);
      // drawAllFrames();
      markCurrentFrame();
    }
  });
}

export function frames() {
  document.body.insertAdjacentElement('beforeend', createElement('div', 'frames'));
  document.querySelector('.frames').insertAdjacentElement('beforeend', createElement('button', 'button button_frame-add'));
  drawAllFrames();
  frameAdd();
  changeCurrentFrame();
  frameCopy();
}

// export function redrawCurrentFrame() {

// }

// document.querySelector('.frames').children[window.state.currentCanvas].lastChild
