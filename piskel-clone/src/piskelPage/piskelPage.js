import './piskelPage.css';
import header from './header/header';
import tools from './tools/tools';
import { frames } from './frames/frames';
import canvasBlock from './canvas-block/canvas-block';
import controlPanel from './control-panel/control-panel';
import { createElement } from '../utilites/common-functions';
import state from '../piskel-state';

export default function piskelPage() {
  state.allCanvases.push(createElement('canvas'));
  header();
  tools();
  canvasBlock();
  controlPanel();
  frames();
}
