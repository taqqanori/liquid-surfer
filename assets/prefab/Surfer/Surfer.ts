import {
  _decorator,
  Component,
  Node,
  input,
  Input,
  UITransformComponent,
  math,
  RigidBody2D,
  SpriteComponent,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("Surfer")
export class Surfer extends Component {
  @property(UITransformComponent)
  private field: UITransformComponent;
  @property(Number)
  private acceleration = 10;
  private direction: -1 | 0 | 1 = 0;

  start() {
    this.hideFires();
    input.on(Input.EventType.MOUSE_DOWN, this.startFire, this);
    input.on(Input.EventType.TOUCH_START, this.startFire, this);
    input.on(Input.EventType.MOUSE_UP, this.endFire, this);
    input.on(Input.EventType.TOUCH_END, this.endFire, this);
  }

  onDestroy() {
    input.off(Input.EventType.MOUSE_DOWN, this.startFire, this);
    input.off(Input.EventType.TOUCH_START, this.startFire, this);
    input.off(Input.EventType.MOUSE_UP, this.endFire, this);
    input.off(Input.EventType.TOUCH_END, this.endFire, this);
  }

  private get surfer(): Node {
    return this.node.getChildByName("Surfer");
  }

  private get surferRigidBody(): RigidBody2D {
    return this.surfer.getComponent(RigidBody2D);
  }

  private get leftFireSprite(): SpriteComponent {
    return this.node.getChildByName("LeftFire").getComponent(SpriteComponent);
  }

  private get rightFireSprite(): SpriteComponent {
    return this.node.getChildByName("RightFire").getComponent(SpriteComponent);
  }

  private hideFires(): void {
    this.leftFireSprite.enabled = false;
    this.rightFireSprite.enabled = false;
  }

  private startFire(e: { getLocationX: () => number }): void {
    this.direction = e.getLocationX() < this.field.width / 2 ? 1 : -1;
    const scale = this.node.scale;
    this.surfer.scale.set(this.direction, scale.y, scale.z);
    this.hideFires();
    switch (this.direction) {
      case -1:
        this.rightFireSprite.enabled = true;
        break;
      case 1:
        this.leftFireSprite.enabled = true;
    }
  }

  private endFire(): void {
    this.direction = 0;
    this.hideFires();
  }

  update(deltaTime: number) {
    this.surferRigidBody.linearVelocity =
      this.surferRigidBody.linearVelocity.add(
        new math.Vec2(deltaTime * this.acceleration * this.direction, 0).rotate(
          this.node.rotation.getEulerAngles(new math.Vec3()).z * (Math.PI / 180)
        )
      );
  }
}
