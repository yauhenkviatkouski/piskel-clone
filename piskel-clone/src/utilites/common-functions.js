export function createElement(tag, className) {
  const element = document.createElement(`${tag}`);
  if (className) {
    element.className = className;
  }
  if (tag === 'canvas') {
    element.width = window.state.canvasSize;
    element.height = element.width;
    element.getContext('2d');
  }
  return element;
}

export function canvasesToData64() {
  window.state.allCanvasesData64 = [];
  window.state.allCanvases.forEach((canvas, index) => {
    window.state.allCanvasesData64[index] = canvas.toDataURL();
  });
}

export function canvasesFromData64() {
  window.state.allCanvases = [];
  window.state.allCanvasesData64.forEach((canvas64, index) => {
    const img = new Image();
    img.onload = () => {
      window.state.allCanvases[index] = createElement('canvas');
      window.state.allCanvases[index].getContext('2d').drawImage(img, 0, 0);
    };
    img.src = canvas64;
  });
}


export function brezenhamLine(x0, y0, x1, y1) {
  const arrayPoints = [];
  let x; let y; let xe; let ye;
  const deltaX = x1 - x0;
  const deltaY = y1 - y0;
  const deltaXpositive = Math.abs(deltaX);
  const deltaYpositive = Math.abs(deltaY);
  let xErr = 2 * deltaYpositive - deltaXpositive;
  let yErr = 2 * deltaXpositive - deltaYpositive;
  if (deltaYpositive <= deltaXpositive) {
    if (deltaX >= 0) {
      x = x0; y = y0; xe = x1;
    } else {
      x = x1; y = y1; xe = x0;
    }
    arrayPoints.push([x, y]);
    for (let i = 0; x < xe; i += 1) {
      x += 1;
      if (xErr < 0) {
        xErr += 2 * deltaYpositive;
      } else {
        if ((deltaX < 0 && deltaY < 0) || (deltaX > 0 && deltaY > 0)) {
          y += 1;
        } else {
          y -= 1;
        }
        xErr += 2 * (deltaYpositive - deltaXpositive);
      }
      arrayPoints.push([x, y]);
    }
  } else {
    if (deltaY >= 0) {
      x = x0; y = y0; ye = y1;
    } else {
      x = x1; y = y1; ye = y0;
    }
    arrayPoints.push([x, y]);
    for (let i = 0; y < ye; i += 1) {
      y += 1;
      if (yErr <= 0) {
        yErr += 2 * deltaXpositive;
      } else {
        if ((deltaX < 0 && deltaY < 0) || (deltaX > 0 && deltaY > 0)) {
          x += 1;
        } else {
          x -= 1;
        }
        yErr += 2 * (deltaXpositive - deltaYpositive);
      }
      arrayPoints.push([x, y]);
    }
  }
  return arrayPoints;
}

// brezenhamLine(1,1,11,5);
// 0: (2) [1, 1]
// 1: (2) [2, 1]
// 2: (2) [3, 2]
// 3: (2) [4, 2]
// 4: (2) [5, 3]
// 5: (2) [6, 3]
// 6: (2) [7, 3]
// 7: (2) [8, 4]
// 8: (2) [9, 4]
// 9: (2) [10, 5]
// 10: (2) [11, 5]

// brezenhamLine(5,9,21,1);
// 0: (2) [5, 9]
// 1: (2) [6, 8]
// 2: (2) [7, 8]
// 3: (2) [8, 7]
// 4: (2) [9, 7]
// 5: (2) [10, 6]
// 6: (2) [11, 6]
// 7: (2) [12, 5]
// 8: (2) [13, 5]
// 9: (2) [14, 4]
// 10: (2) [15, 4]
// 11: (2) [16, 3]
// 12: (2) [17, 3]
// 13: (2) [18, 2]
// 14: (2) [19, 2]
// 15: (2) [20, 1]
// 16: (2) [21, 1]

// brezenhamLine(1,9,8,2);
// 0: (2) [1, 9]
// 1: (2) [2, 8]
// 2: (2) [3, 7]
// 3: (2) [4, 6]
// 4: (2) [5, 5]
// 5: (2) [6, 4]
// 6: (2) [7, 3]
// 7: (2) [8, 2]
