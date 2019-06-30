// const canvasTemporary = document.querySelector('.canvas-field__canvasTemporary');
// canvasTemporary.addEventListener('click', (click) => {

//   function matchStartColor(pixelPos)
//   {
//     var r = colorLayer.data[pixelPos];
//     var g = colorLayer.data[pixelPos+1];
//     var b = colorLayer.data[pixelPos+2];

//     return (r == startR && g == startG && b == startB);
//   }

//   function colorPixel(pixelPos)
//   {
//     colorLayer.data[pixelPos] = fillColorR;
//     colorLayer.data[pixelPos+1] = fillColorG;
//     colorLayer.data[pixelPos+2] = fillColorB;
//     colorLayer.data[pixelPos+3] = 255;
//   }

//   click.preventDefault();
//   global.console.log(click);
//   const devider = 640 / window.state.canvasSize;

//   const ctxTemporary = canvasTemporary.getContext('2d');
//   const clickX = Math.floor(click.offsetX / devider);
//   const clickY = Math.floor(click.offsetY / devider);
//   const pixelStack = [[clickX, clickY]];

//   while (pixelStack.length) {
//     let newPos = [];
//     let x;
//     let y;
//     let pixelPos;
//     let reachLeft;
//     let reachRight;

//     newPos = pixelStack.pop();

//     x = newPos[0];
//     y = newPos[1];

//     pixelPos = (y * window.state.canvasSize + x) * 4;
//     while (y -= 1 >== 0 && matchStartColor(pixelPos)) {
//       pixelPos -= window.state.canvasSize * 4;
//     }
//     pixelPos += window.state.canvasSize * 4;
//     y += 1;
//     reachLeft = false;
//     reachRight = false;
//     while(y +=1 < canvasHeight - 1 && matchStartColor(pixelPos))
//     {
//       colorPixel(pixelPos);

//       if(x > 0)
//       {
//         if(matchStartColor(pixelPos - 4))
//         {
//           if(!reachLeft){
//             pixelStack.push([x - 1, y]);
//             reachLeft = true;
//           }
//         }
//         else if(reachLeft)
//         {
//           reachLeft = false;
//         }
//       }

//       if(x < window.state.canvasSize-1)
//       {
//         if(matchStartColor(pixelPos + 4))
//         {
//           if(!reachRight)
//           {
//             pixelStack.push([x + 1, y]);
//             reachRight = true;
//           }
//         }
//         else if(reachRight)
//         {
//           reachRight = false;
//         }
//       }

//       pixelPos += window.state.canvasSize * 4;
//     }
//   }
//   context.putImageData(colorLayer, 0, 0);

// })
