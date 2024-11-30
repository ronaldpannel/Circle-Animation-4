/**@type{HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;
this.outRad = 200;

class Effect {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.outRad = 250;
    this.numMover = 20;
    this.numStatic = 5;
    this.moverArray = [];
    this.staticArray = [];
    this.scaler = 0.01;
    this.scaler1 = 0;
    this.phase = 0;

    const sSlider = document.getElementById("sSlider");
    const sLabelValue = document.getElementById("sLabelValue");

    const sSlider1 = document.getElementById("sSlider1");
    const sLabel1Value = document.getElementById("sLabel1Value");

    const fixedPointsSlider = document.getElementById("fixedPoints");
    const fixedPointsSLabelValue = document.getElementById(
      "fixedPointsLabelValue"
    );

    const movingPointsSlider = document.getElementById("movingPoints");
    let movingPointsLabelValue = document.getElementById(
      "movingPointsLabelValue"
    );

    const phaseSlider = document.getElementById("phase");
    let phaseLabelValue = document.getElementById("phaseLabelValue");

    sSlider.addEventListener("change", (e) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.moverArray = [];
      this.scaler = Number(e.target.value);
      sLabelValue.innerHTML = Number(e.target.value);
      this.drawMover();
    });

    sSlider1.addEventListener("change", (e) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.staticArray = [];
      this.scaler1 = Number(e.target.value);
      sLabel1Value.innerHTML = Number(e.target.value);
      this.drawStaticPoints();
    });

    fixedPointsSlider.addEventListener("change", (e) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.numStatic = 0;
      this.staticArray = [];
      this.numStatic = Number(e.target.value);
      fixedPointsSLabelValue.innerHTML = Number(e.target.value);
      this.drawStaticPoints();
    });

    movingPointsSlider.addEventListener("change", (e) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.numMover = 0;
      this.moverArray = [];
      this.numMover = Number(e.target.value);
      movingPointsLabelValue.innerHTML = Number(e.target.value);
      this.drawMover();
    });

    phaseSlider.addEventListener("change", (e) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.moverArray = [];
      this.phase = Number(e.target.value);
      phaseLabelValue.innerHTML = Number(e.target.value);
      this.drawMover();
    });

    this.drawMover();
    this.drawStaticPoints();
  }
  drawCircle(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = `blue`;
    ctx.arc(this.width / 2, this.height / 2, this.outRad, 0, Math.PI * 2);
    ctx.stroke();
  }
  drawMover() {
    for (let i = 0; i < this.numMover; i++) {
      let angle = ((Math.PI * 2) / this.numMover + this.phase) * i;
      this.moverArray.push(new Mover(this, 0, 0, angle, this.scaler));
    }
  }
  drawStaticPoints() {
    for (let i = 0; i < this.numStatic; i++) {
      let angle = ((Math.PI * 2) / this.numStatic) * i;
      this.staticArray.push(new StaticPoint(this, 0, 0, angle, this.scaler1));
    }
  }
  drawLines(ctx) {
    for (let i = 0; i < this.staticArray.length; i++) {
      for (let j = 0; j < this.moverArray.length; j++) {
        let staticP = this.staticArray[i];
        let moveP = this.moverArray[j];
        let hue = i * this.numMover * 10;
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.moveTo(staticP.x, staticP.y);
        ctx.lineTo(moveP.x, moveP.y);
        ctx.stroke();
      }
    }
  }
  render(ctx) {
    this.drawCircle(ctx);

    for (let i = 0; i < this.moverArray.length; i++) {
      this.moverArray[i].update();
      this.moverArray[i].draw(ctx);
    }
    for (let i = 0; i < this.staticArray.length; i++) {
      this.staticArray[i].update();
      this.staticArray[i].draw(ctx);
    }
    this.drawLines(ctx);
  }
}

const effect = new Effect(canvas.width, canvas.height);
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  requestAnimationFrame(animate);
  effect.render(ctx);
}
animate();

window.addEventListener("resize", () => {
  canvas.width = canvas.width;
  canvas.height = canvas.height;
});
