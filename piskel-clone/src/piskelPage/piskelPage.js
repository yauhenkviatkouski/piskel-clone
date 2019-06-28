import './piskelPage.css';
import header from './header/header';
import tools from './tools/tools';
import { frames } from './frames/frames';
import canvasBlock from './canvas-block/canvas-block';
import controlPanel from './control-panel/control-panel';

export default function piskelPage() {
  header();
  tools();
  canvasBlock();
  frames();
  controlPanel();
}
