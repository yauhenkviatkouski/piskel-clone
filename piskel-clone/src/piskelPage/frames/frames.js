import './frames.css';
import './add/frame-add.css';
import './move/frame-move.css';
import './copy/frame-copy.css';
import './delete/frame-delete.css';
import { createElement } from '../../utilites/common-functions';

function markCurrentFrame() {
  document.querySelector('.frames').children[window.state.currentCanvas].style.border = 'solid 4px #3D7939';
}

export function redrawCurrentCanvas() {
  document.querySelector('.canvas-field').firstChild.remove();
  document.querySelector('.canvas-field').insertAdjacentElement('afterbegin', window.state.allCanvases[window.state.currentCanvas]);
}

export function drawFrame(canvas) {
  const frameWrapper = createElement('div', 'frame-wrapper');
  frameWrapper.draggable = true;
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

function frameMove() {
  document.querySelector('.frames').addEventListener('mousedown', (event) => {
    if (event.target.className === 'button button_frame-move') {
      const startFrame = event.path[1];
      const start = Array.prototype.indexOf.call(document.querySelector('.frames').children, startFrame);
      document.querySelector('.frames').addEventListener('dragend', (eventUp) => {
        const elementDragEnd = document.elementFromPoint(eventUp.clientX, eventUp.clientY);
        if (elementDragEnd.parentNode.className === 'frame-wrapper') {
          const endFrame = elementDragEnd.parentNode;
          const end = Array.prototype.indexOf.call(document.querySelector('.frames').children, endFrame);
          const canvases = window.state.allCanvases;
          [canvases[start], canvases[end]] = [canvases[end], canvases[start]];
          drawAllFrames();
          redrawCurrentCanvas();
        }
      }, { once: true });
    }
  });
}

function frameAdd() {
  document.querySelector('.button_frame-add').addEventListener('click', () => {
    const newCanvas = createElement('canvas');
    window.state.allCanvases.push(newCanvas);
    document.querySelector('.button_frame-add').insertAdjacentElement('beforebegin', drawFrame(newCanvas));
  });
}

function frameCopy() {
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

function frameDelete() {
  document.querySelector('.frames').addEventListener('click', (event) => {
    if (event.target.className === 'button button_frame-delete') {
      if (document.querySelectorAll('.frame-wrapper').length > 1) {
        const deletedFrame = event.path[1];
        const indexDeletedFrame = Array.prototype.indexOf.call(document.querySelector('.frames').children, deletedFrame);
        document.querySelector('.frames').children[window.state.currentCanvas].style.border = '';
        deletedFrame.remove();
        window.state.allCanvases.splice(indexDeletedFrame, 1);
        window.state.currentCanvas = 0;
        redrawCurrentCanvas();
        markCurrentFrame();
      } else {
        const canvasOnField = document.querySelector('.canvas-field').firstChild;
        canvasOnField.getContext('2d').clearRect(0, 0, window.state.canvasSize, window.state.canvasSize);
        const canvasOnFirstFrame = document.querySelector('.frame-wrapper').lastChild;
        canvasOnFirstFrame.getContext('2d').clearRect(0, 0, window.state.canvasSize, window.state.canvasSize);
      }
    }
  });
}

function changeCurrentFrame() {
  document.querySelector('.frames').addEventListener('click', (event) => {
    if (event.target.tagName === 'CANVAS') {
      document.querySelector('.frames').children[window.state.currentCanvas].style.border = '';
      const newCrurrentFrame = event.path[1];
      const indexNewCurentFrame = Array.prototype.indexOf.call(document.querySelector('.frames').children, newCrurrentFrame);
      window.state.currentCanvas = indexNewCurentFrame;
      redrawCurrentCanvas();
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
  frameDelete();
  frameMove();
}
