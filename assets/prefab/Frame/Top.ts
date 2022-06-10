import { _decorator, math } from "cc";
import { WallBase } from "./WallBase";
const { ccclass } = _decorator;

@ccclass("Top")
export class Top extends WallBase {
  start() {
    this.setPosition(
      this.node.position.x,
      this.parentUiTransform.height * this.parentUiTransform.anchorPoint.y +
        this.thickness * this.uiTransform.anchorPoint.y
    );
    this.setSize(this.parentUiTransform.width, this.thickness);
  }
}
