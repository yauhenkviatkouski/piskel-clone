import './tools.css';
import { createElement } from '../../utilites/common-functions';
import { penButton } from './penAndEraser/penAndEraser';
import eraserButton from './penAndEraser/eraser';

export default function tools() {
  document.body.insertAdjacentElement('beforeend', createElement('div', 'tools'));
  penButton();
  eraserButton();
}
