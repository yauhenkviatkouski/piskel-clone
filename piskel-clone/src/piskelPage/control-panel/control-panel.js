import './control-panel.css';
import { createElement } from '../../common-functions';

export default function controlPanel() {
  document.body.insertAdjacentElement('beforeend', createElement('div', 'control-panel'));
}
