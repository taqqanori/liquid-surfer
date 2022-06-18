import {
  _decorator,
  input,
  Input,
  EventMouse,
  UITransformComponent,
  math,
} from "cc";
import { BoxBase } from "../../component/BoxBase";
const { ccclass, property } = _decorator;

@ccclass("Surfer")
export class Surfer extends BoxBase {
  @property(UITransformComponent)
  private field: UITransformComponent;
  @property(Number)
  private acceleration = 10;
  private direction: -1 | 0 | 1 = 0;

  start() {
    input.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
    input.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);
  }

  onDestroy() {
    input.off(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
    input.off(Input.EventType.MOUSE_UP, this.onMouseUp, this);
  }

  private onMouseDown(e: EventMouse): void {
    this.direction = e.getLocationX() < this.field.width / 2 ? 1 : -1;
  }

  private onMouseUp(e: EventMouse): void {
    this.direction = 0;
  }

  update(deltaTime: number) {
    this.rigitBody2D.linearVelocity = this.rigitBody2D.linearVelocity.add(
      new math.Vec2(deltaTime * this.acceleration * this.direction, 0).rotate(
        this.node.rotation.getEulerAngles(new math.Vec3()).z * (Math.PI / 180)
      )
    );
  }
}
