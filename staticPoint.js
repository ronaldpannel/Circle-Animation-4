class StaticPoint {
  constructor(effect, x, y, angle, scaler) {
    this.effect = effect;
    this.x = x;
    this.y = y;
    this.rad = 1;
    this.scaler = scaler
    this.angle = angle;
  }
  update() {
    this.x = effect.width / 2 + effect.outRad * Math.cos(this.angle);
    this.y = effect.height / 2 + effect.outRad * Math.sin(this.angle);
    this.angle += this.scaler;
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.fillStyle = "white";
    ctx.arc(this.x, this.y, this.rad, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();
  }
}
