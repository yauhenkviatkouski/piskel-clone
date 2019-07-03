import './tools.css';
import { createElement } from '../../utilites/common-functions';
import { penButton } from './penAndEraser/penAndEraser';
import eraserButton from './penAndEraser/eraser';
import colorSelect from './colorSelect/colorSelect';
import { bucketButton } from './bucket/paint-bucket';
import coordinates from './coordinates/coordinates';
import { strokeTool } from './stroke/stroke';
import lightenButton from './lighten/lighten';
import ditheringButton from './dithering/dithering';
import colorpicker from './colorPicker/ColorPicker';

export default function tools() {
  document.body.insertAdjacentElement('beforeend', createElement('div', 'tools'));
  eraserButton();
  bucketButton();
  colorSelect();
  colorpicker();
  strokeTool();
  lightenButton();
  ditheringButton();
  penButton();
  setTimeout(coordinates, 0);
}
