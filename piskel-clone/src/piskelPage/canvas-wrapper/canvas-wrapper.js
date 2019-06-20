import './canvas-wrapper.css';
import { createElement } from '../../common-functions';
import canvasHandler from './canvas/canvas';

export default function canvasWrapper() {
  document.body.insertAdjacentElement('beforeend', createElement('div', 'canvas-wrapper'));
  canvasHandler();
}
