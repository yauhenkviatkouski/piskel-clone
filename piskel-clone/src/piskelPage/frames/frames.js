import './frames.css';
import { createElement } from '../../common-functions';

export default function frames() {
  document.body.insertAdjacentElement('beforeend', createElement('div', 'frames'));
}
