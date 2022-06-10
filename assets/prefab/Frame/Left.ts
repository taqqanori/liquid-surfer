import { _decorator, math } from "cc";
import { WallBase } from "./WallBase";
const { ccclass } = _decorator;

@ccclass("Left")
export class Left extends WallBase {
  start() {
    this.node.position = new math.Vec3(
      -(
        this.parentUiTransform.width * this.parentUiTransform.anchorPoint.x +
        this.thickness * this.uiTransform.anchorPoint.x
      ),
      this.node.position.y
    );
    this.uiTransform.contentSize = new math.Size(
      this.thickness,
      this.parentUiTransform.height
    );
  }
}
