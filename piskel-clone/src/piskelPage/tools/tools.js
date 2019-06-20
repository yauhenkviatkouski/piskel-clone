import './tools.css';
import { createElement } from '../../common-functions';

export default function tools() {
  document.body.insertAdjacentElement('beforeend', createElement('div', 'tools'));
}
