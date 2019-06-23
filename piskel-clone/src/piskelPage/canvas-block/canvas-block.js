import './canvas-block.css';
import { createElement } from '../../utilites/common-functions';
import canvasHandler from './canvas/canvas';

export default function canvasBlock() {
  document.body.insertAdjacentElement('beforeend', createElement('div', 'canvas-block'));
  canvasHandler();
}
