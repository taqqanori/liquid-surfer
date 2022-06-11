import { _decorator } from "cc";
import { WallBase } from "./WallBase";
const { ccclass } = _decorator;

@ccclass("Right")
export class Right extends WallBase {
  start() {
    this.setPosition(
      this.parentUiTransform.width *
        (1 - this.parentUiTransform.anchorPoint.x) +
        this.thickness * (1 - this.uiTransform.anchorPoint.x),
      this.node.position.y
    );
    this.setSize(this.thickness, this.parentUiTransform.height);
  }
}
