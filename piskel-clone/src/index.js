import './normalize.css';
import piskelPage from './piskelPage/piskelPage';
import { createElement, canvasesFromData64 } from './utilites/common-functions';

if (sessionStorage.getItem('localState')) {
  window.state = JSON.parse(sessionStorage.getItem('localState'));
  sessionStorage.clear();
  canvasesFromData64();
} else {
  window.state = {
    canvasSize: 32,
    handlerMove: {},
    handlerClick: {},
    allCanvases: [],
    allCanvasesData64: [],
    currentCanvas: 0,
    color1: '#000000',
    color2: '#ffffff',
    handlerId: 'pen',
    fps: 1,
  };
  window.state.allCanvases.push(createElement('canvas'));
}
setTimeout(piskelPage, 0);
