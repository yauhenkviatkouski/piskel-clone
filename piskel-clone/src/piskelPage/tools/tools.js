/* eslint-disable no-unused-vars */
/* eslint-disable vars-on-top */
/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */
/* eslint-disable prefer-template */
/* eslint-disable quotes */
/* eslint-disable no-var */
import './tools.css';
import { createElement } from '../../utilites/common-functions';
import { penButton } from './penAndEraser/penAndEraser';
import eraserButton from './penAndEraser/eraser';
import colorSelect from './colorSelect/colorSelect';
import { bucketButton } from './bucket/paint-bucket';
import coordinates from './coordinates/coordinates';
import { strokeTool } from './stroke/stroke';

export default function tools() {
  document.body.insertAdjacentElement('beforeend', createElement('div', 'tools'));
  eraserButton();
  bucketButton();
  colorSelect();
  penButton();
  setTimeout(coordinates, 0);
  strokeTool();
}
