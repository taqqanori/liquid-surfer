import { _decorator, Component, Node } from "cc";
import { BoxBase } from "../../component/BoxBase";
const { ccclass, property } = _decorator;

@ccclass("WallBase")
export class WallBase extends BoxBase {
  @property(Number)
  protected thickness: number = 1;
}
