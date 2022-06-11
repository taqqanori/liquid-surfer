import { _decorator } from "cc";
import { BoxBase } from "../../component/BoxBase";
const { ccclass, property } = _decorator;

@ccclass("Mover")
export class Mover extends BoxBase {
  @property(Number)
  private frequency = 1;
  private t = 0;
  start() {
    this.setSize(this.parentUiTransform.height, this.parentUiTransform.height);
  }

  update(deltaTime: number) {
    this.t += deltaTime;
    while (2 * Math.PI < this.frequency * this.t) {
      this.t -= 2 * Math.PI;
    }
    this.setPosition(
      ((this.parentUiTransform.width - this.uiTransform.width) / 2) *
        Math.sin(this.frequency * this.t),
      this.node.position.y
    );
  }
}
