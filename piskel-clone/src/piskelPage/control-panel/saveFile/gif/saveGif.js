/* eslint-disable no-undef */
/* eslint-disable no-var */
import { createElement } from '../../../../utilites/common-functions';
import './LZWEncoder';
import './NeuQuant';
import './GIFEncoder';
import './b64';


export default function saveOnGif() {
  const buttonGif = createElement('button', 'button button_save-on-gif');
  buttonGif.textContent = 'Save as .gif';
  document.querySelector('.control-panel').insertAdjacentElement('beforeend', buttonGif);
  buttonGif.addEventListener('click', () => {
    var encoder = new GIFEncoder();
    encoder.setRepeat(0);
    encoder.setDelay(1000 / window.state.fps);
    encoder.start();
    window.state.allCanvases.forEach((canvas) => {
      encoder.addFrame(canvas.getContext('2d'));
    });
    encoder.finish();
    encoder.download('download.gif');
  });
}
