import './openFile.css';
import { createElement } from '../../../utilites/common-functions';

export default function openFile() {
  const inputFileWrapper = createElement('div', 'input-file-wrapper');
  inputFileWrapper.textContent = 'Upload .ownFormat';
  document.querySelector('.control-panel').insertAdjacentElement('beforeend', inputFileWrapper);
  const inputOpenFile = createElement('input', 'input-file');
  inputOpenFile.textContent = 'Open sprite';
  inputOpenFile.type = 'file';
  inputFileWrapper.insertAdjacentElement('beforeend', inputOpenFile);

  function onReaderLoad(event) {
    sessionStorage.setItem('localState', event.target.result);
    window.location.reload();
  }

  inputOpenFile.addEventListener('change', (file) => {
    const reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(file.target.files[0]);
  });
}
