import './control-panel.css';
import { createElement } from '../../utilites/common-functions';
import preview from './preview/preview';


export default function controlPanel() {
  document.body.insertAdjacentElement('beforeend', createElement('div', 'control-panel'));
  preview();
}
