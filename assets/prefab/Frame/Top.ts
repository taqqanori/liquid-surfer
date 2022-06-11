import { _decorator } from "cc";
import { WallBase } from "./WallBase";
const { ccclass } = _decorator;

@ccclass("Top")
export class Top extends WallBase {
  start() {
    this.setPosition(
      this.node.position.x,
      this.parentUiTransform.height *
        (1 - this.parentUiTransform.anchorPoint.y) +
        this.thickness * (1 - this.uiTransform.anchorPoint.y)
    );
    this.setSize(this.parentUiTransform.width, this.thickness);
  }
}
