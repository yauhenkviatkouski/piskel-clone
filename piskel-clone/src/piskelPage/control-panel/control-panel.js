import './control-panel.css';
import { createElement } from '../../utilites/common-functions';
import preview from './preview/preview';
import resizeBlock from './resize-canvas/resize-canvas';
import loadFromLocal from './localStorage/localSorage';
import saveToFile from './saveFile/saveFile';
import openFile from './open-file/openFile';


export default function controlPanel() {
  document.body.insertAdjacentElement('beforeend', createElement('div', 'control-panel'));
  preview();
  resizeBlock();
  setTimeout(() => {
    loadFromLocal();
  }, 0);
  saveToFile();
  openFile();
}
