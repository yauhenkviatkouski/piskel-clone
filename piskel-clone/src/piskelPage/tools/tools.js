import './tools.css';
import { createElement } from '../../utilites/common-functions';
import penButton from './pen/pen';

export default function tools() {
  document.body.insertAdjacentElement('beforeend', createElement('div', 'tools'));
  penButton();
}
