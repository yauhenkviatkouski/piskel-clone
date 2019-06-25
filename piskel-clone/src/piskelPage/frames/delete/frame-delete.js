import './frame-delete.css';

export default function frameDelete() {
  document.querySelector('.frames').addEventListener('click', (event) => {
    if (event.target.className === 'button button_frame-delete') {
      if (document.querySelectorAll('.frame-wrapper').length > 1) {
        const deletedFrame = event.path[1];
        const indexDeletedFrame = Array.prototype.indexOf.call(document.querySelector('.frames').children, deletedFrame);
        document.querySelector('.frames').children[window.state.currentCanvas].style.border = '';
        deletedFrame.remove();
        window.state.allCanvases.splice(indexDeletedFrame, 1);
        window.state.currentCanvas = 0;
        document.querySelector('.canvas-field').lastChild.remove();
        document.querySelector('.canvas-field').insertAdjacentElement('beforeend', window.state.allCanvases[window.state.currentCanvas]);
        document.querySelector('.frames').children[window.state.currentCanvas].style.border = 'solid 4px #3D7939';
      } else {
        const canvasOnField = document.querySelector('.canvas-field').lastChild;
        canvasOnField.getContext('2d').clearRect(0, 0, window.state.canvasSize, window.state.canvasSize);
        const canvasOnFirstFrame = document.querySelector('.frame-wrapper').lastChild;
        canvasOnFirstFrame.getContext('2d').clearRect(0, 0, window.state.canvasSize, window.state.canvasSize);
      }
    }
  });
}
