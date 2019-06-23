import './tools.css';
import { createElement } from '../../utilites/common-functions';

export default function tools() {
  document.body.insertAdjacentElement('beforeend', createElement('div', 'tools'));
}
