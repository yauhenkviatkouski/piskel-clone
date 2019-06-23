import './header.css';
import { createElement } from '../../utilites/common-functions';


export default function header() {
  document.body.insertAdjacentElement('beforeend', createElement('header', 'header'));
}
