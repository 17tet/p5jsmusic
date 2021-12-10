let canvas;

let sketch = function (p) {
  p.setup = function () {
    canvas = p.createCanvas(800, 640);
    canvas.id("canvas");

    p.colorMode(p.HSB);
  };

  p.draw = function () {
    let draw_keyboard = true;
    p.clear();

    // Draw a keyboard
    if (draw_keyboard) {
      let x = 0;
      for (let i = 0; i < 10; i++) {
        // Draw the key
        let border_stroke_color;
        border_stroke_color = p.stroke(0);
        p.strokeWeight(1);
        p.noFill();
        p.rect(i * 80, 0, 80, p.height);
        x += 100;
      }
      draw_keyboard = false;
    }

    if (detections != undefined) {
      if (detections.multiHandLandmarks != undefined) {
        //p.drawHands();
        // p.drawParts();

        p.drawLines([0, 5, 9, 13, 17, 0]); //palm
        p.drawLines([0, 1, 2, 3, 4]); //thumb
        p.drawLines([5, 6, 7, 8]); //index finger
        p.drawLines([9, 10, 11, 12]); //middle finger
        p.drawLines([13, 14, 15, 16]); //ring finger
        p.drawLines([17, 18, 19, 20]); //pinky

        p.drawLandmarks([0, 1], 0); //palm base
        p.drawLandmarks([1, 5], 60); //thumb
        p.drawLandmarks([5, 9], 120); //index finger
        p.drawLandmarks([9, 13], 180); //middle finger
        p.drawLandmarks([13, 17], 240); //ring finger
        p.drawLandmarks([17, 21], 300); //pinky
      }
    }
  };

  p.drawHands = function () {
    for (let i = 0; i < detections.multiHandLandmarks.length; i++) {
      for (let j = 0; j < detections.multiHandLandmarks[i].length; j++) {
        let x = detections.multiHandLandmarks[i][j].x * p.width;
        let y = detections.multiHandLandmarks[i][j].y * p.height;
        let z = detections.multiHandLandmarks[i][j].z;
        // p.strokeWeight(0);
        // p.textFont('Helvetica Neue');
        // p.text(j, x, y);
        p.stroke(255);
        p.strokeWeight(10);
        p.point(x, y);
      }
    }
  };

  p.drawLandmarks = function (indexArray, hue) {
    p.noFill();
    p.strokeWeight(8);
    for (let i = 0; i < detections.multiHandLandmarks.length; i++) {
      for (let j = indexArray[0]; j < indexArray[1]; j++) {
        let x = detections.multiHandLandmarks[i][j].x * p.width;
        let y = detections.multiHandLandmarks[i][j].y * p.height;
        // console.log("For hand " + i + ", 8 position " + detections.multiHandLandmarks[i][8].x * 100)
        let z = detections.multiHandLandmarks[i][j].z;

        p.stroke(hue, 40, 255);
        p.point(x, y);

        if (
          detections.multiHandLandmarks[i][8].x > 0 &&
          detections.multiHandLandmarks[i][8].x < 0.1 &&
          detections.multiHandLandmarks[i][8].y > 0 &&
          detections.multiHandLandmarks[i][8].y < p.height
        ) {
          p.rect(0, 0, 80, p.height);
        } else if (
          detections.multiHandLandmarks[i][8].x > 0.1 &&
          detections.multiHandLandmarks[i][8].x < 0.2 &&
          detections.multiHandLandmarks[i][8].y > 0 &&
          detections.multiHandLandmarks[i][8].y < p.height
        ) {
          p.rect(80, 0, 80, p.height);
        }
      }
    }
  };

  p.drawLines = function (index) {
    p.stroke(0, 0, 255);
    p.strokeWeight(3);
    for (let i = 0; i < detections.multiHandLandmarks.length; i++) {
      for (let j = 0; j < index.length - 1; j++) {
        let x = detections.multiHandLandmarks[i][index[j]].x * p.width;
        let y = detections.multiHandLandmarks[i][index[j]].y * p.height;
        // let z = detections.multiHandLandmarks[i][index[j]].z;

        let _x = detections.multiHandLandmarks[i][index[j + 1]].x * p.width;
        let _y = detections.multiHandLandmarks[i][index[j + 1]].y * p.height;
        // let _z = detections.multiHandLandmarks[i][index[j+1]].z;
        p.line(x, y, _x, _y);
      }
    }
  };
};

let myp5 = new p5(sketch);
