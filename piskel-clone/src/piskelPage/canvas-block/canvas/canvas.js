
import { brezenhamLine } from '../../../utilites/common-functions';

export default function canvasHandler() {
  function devider() {
    return 640 / window.state.canvasSize;
  }
  const canvasField = document.querySelector('.canvas-field');
  const canvasTemporary = document.querySelector('.canvas-field__canvasTemporary');
  const ctxTemporary = canvasTemporary.getContext('2d');

  let isMouseDown = false;
  const begin = {};
  canvasField.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    begin.x = Math.floor(e.offsetX / devider());
    begin.y = Math.floor(e.offsetY / devider());
  });
  document.addEventListener('mouseup', () => {
    isMouseDown = false;
    window.state.allCanvases[window.state.currentCanvas].getContext('2d').drawImage(canvasTemporary, 0, 0);
    const currentFrame = document.querySelectorAll('.frame-wrapper')[window.state.currentCanvas].lastChild;
    currentFrame.getContext('2d').drawImage(canvasTemporary, 0, 0);
    ctxTemporary.clearRect(0, 0, canvasTemporary.width, canvasTemporary.height);
  });
  document.body.addEventListener('mousemove', (e) => {
    if (isMouseDown) {
      const end = { x: Math.floor(e.offsetX / devider()), y: Math.floor(e.offsetY / devider()) };
      const path = brezenhamLine(begin.x, begin.y, end.x, end.y);
      ctxTemporary.clearRect(0, 0, canvasTemporary.width, canvasTemporary.height);
      for (let i = 0; i < path.length; i += 1) {
        ctxTemporary.fillStyle = window.state.color1;
        ctxTemporary.fillRect(path[i][0], path[i][1], 1, 1);
      }
    }
  });
}
