import './piskelPage.css';
import header from './header/header';
import tools from './tools/tools';
import frames from './frames/frames';
import canvasWrapper from './canvas-wrapper/canvas-wrapper';
import controlPanel from './control-panel/control-panel';

export default function piskelPage() {
  header();
  tools();
  frames();
  canvasWrapper();
  controlPanel();
}
