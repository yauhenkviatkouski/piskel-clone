import './frames.css';
import { createElement } from '../../utilites/common-functions';

function drawFrames() { // draws all frames frome allCanvases
  document.querySelector('.frames').innerHTML = '';
  window.state.allCanvases.forEach((canvas) => {
    const canvasForFrame = createElement('canvas');
    canvasForFrame.getContext('2d').drawImage(canvas, 0, 0);
    document.querySelector('.frames').insertAdjacentElement('beforeend', canvasForFrame);
  });
}

export default function frames() {
  document.body.insertAdjacentElement('beforeend', createElement('div', 'frames'));
  drawFrames();
  // setTimeout(() => {
  //   drawFrames();
  // }, 3000);
  // setTimeout(() => {
  //   drawFrames();
  // }, 6000);
}
