import './canvas-wrapper.css';
import { createElement } from '../../common-functions';


export default function canvasWrapper() {
  document.body.insertAdjacentElement('beforeend', createElement('div', 'canvas-wrapper'));
}
