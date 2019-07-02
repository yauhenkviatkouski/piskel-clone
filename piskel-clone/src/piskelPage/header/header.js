import './header.css';
import { createElement } from '../../utilites/common-functions';
import loadFromLocal from './localStorage/localSorage';
// import saveToFile from './saveFile/saveFile';


export default function header() {
  document.body.insertAdjacentElement('beforeend', createElement('header', 'header'));
  setTimeout(() => {
    loadFromLocal();
  }, 0);
  // saveToFile();
}
