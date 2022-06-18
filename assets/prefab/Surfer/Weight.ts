import { _decorator } from "cc";
import { BoxBase } from "../../component/BoxBase";
const { ccclass, property } = _decorator;

@ccclass("Weight")
export class Weight extends BoxBase {
  @property(Boolean)
  visible = false;

  start() {
    this.sprite.enabled = this.visible;
  }
}
