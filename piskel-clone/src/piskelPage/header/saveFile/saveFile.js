/* eslint-disable no-alert */
import './saveFile.css';
import { createElement, canvasesToData64 } from '../../../utilites/common-functions';

export default function saveToFile() {
  const linkForSave = createElement('a', 'link-for-save');
  document.querySelector('header').insertAdjacentElement('afterbegin', linkForSave);
  const buttonSave = createElement('button', 'button button_save-to-file');
  buttonSave.textContent = 'Save to file';
  linkForSave.insertAdjacentElement('afterbegin', buttonSave);
  buttonSave.addEventListener('click', () => {
    canvasesToData64();
    const spriteData = JSON.stringify(window.state);
    const fileName = `${prompt('Enter the file name', 'My sprite')}.ownFormat`;
    linkForSave.href = `data:text/json;charset=utf-8,${encodeURIComponent(spriteData)}`;
    linkForSave.download = fileName;
  });
}
