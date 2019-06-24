import './frames.css';
import { createElement } from '../../utilites/common-functions';
import frameAdd from './add/frame-add';
import './move/frame-move.css';

export function drawFrame(canvas) {
  const frameWrapper = createElement('div', 'frame-wrapper');
  frameWrapper.innerHTML = '<button class="button button_frame-move"></button><button class="button button_frame-copy"></button><button class="button button_frame-delete"></button>';
  const canvasForFrame = createElement('canvas');
  canvasForFrame.getContext('2d').drawImage(canvas, 0, 0);
  frameWrapper.insertAdjacentElement('beforeend', canvasForFrame);
  return frameWrapper;
}

export function drawAllFrames() {
  document.querySelectorAll('.frameWrapper').forEach((frameWrapper) => {
    frameWrapper.remove();
  });
  window.state.allCanvases.forEach((canvas) => {
    document.querySelector('.button_frame-add').insertAdjacentElement('beforebegin', drawFrame(canvas));
  });
}

function markCurrentFrame() {
  document.querySelector('.frames').children[window.state.currentCanvas].style.border = 'solid 2px #3D7939';
}

function changeCurrentFrame() {
  document.querySelector('.frames').addEventListener('click', (e) => {
    if (e.target.tagName === 'CANVAS') {
      document.querySelector('.frames').children[window.state.currentCanvas].style.border = '';
      const newCrurrentFrame = e.path[1];
      const indexNewCurentFrame = Array.prototype.indexOf.call(document.querySelector('.frames').children, newCrurrentFrame);
      window.state.currentCanvas = indexNewCurentFrame;
      markCurrentFrame();
    }
  });
}

export function frames() {
  document.body.insertAdjacentElement('beforeend', createElement('div', 'frames'));
  document.querySelector('.frames').insertAdjacentElement('beforeend', createElement('button', 'button button_frame-add'));
  drawAllFrames();
  markCurrentFrame();
  frameAdd();
  changeCurrentFrame();
}

// export function redrawCurrentFrame() {

// }

// document.querySelector('.frames').children[window.state.currentCanvas].lastChild
