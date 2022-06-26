import {
  _decorator,
  Component,
  Node,
  BoxCollider2D,
  Contact2DType,
  Collider2D,
  IPhysics2DContact,
  math,
  UITransformComponent,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("MoneyArea")
export class MoneyArea extends Component {
  public moneyCount = 0;
  public started = true;
  @property(Number)
  private otherColliderTag: number;
  @property(Number)
  private moneyRelocationIntervalSeconds: number = 5;
  private timeAfterMoneyRelocateSeconds = 0;
  private contacted = false;

  start() {
    this.moneyBoxCollider2D.on(
      Contact2DType.BEGIN_CONTACT,
      this.onMoneyContact,
      this
    );
    this.relocateMoney();
  }

  update(deltaTime: number) {
    this.money.active = this.started;
    if (!this.started) {
      this.timeAfterMoneyRelocateSeconds = 0;
      return;
    }
    this.timeAfterMoneyRelocateSeconds += deltaTime;
    if (
      this.moneyRelocationIntervalSeconds <
        this.timeAfterMoneyRelocateSeconds ||
      this.contacted
    ) {
      this.relocateMoney();
      this.contacted = false;
    }
  }

  private onMoneyContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ): void {
    if (this.otherColliderTag == otherCollider.tag) {
      this.moneyCount++;
      this.contacted = true;
    }
  }

  private relocateMoney(): void {
    const halfWidth = this.uiTransform.width / 2;
    const halfHeight = this.uiTransform.height / 2;
    const moneyHalfWidth = this.moneyUITransform.width / 2;
    const moneyHalfHeight = this.moneyUITransform.height / 2;
    this.money.position = new math.Vec3(
      math.randomRange(-halfWidth + moneyHalfWidth, halfWidth - moneyHalfWidth),
      math.randomRange(
        -halfHeight + moneyHalfHeight,
        halfHeight - moneyHalfHeight
      )
    );
    this.timeAfterMoneyRelocateSeconds = 0;
  }

  private get uiTransform(): UITransformComponent {
    return this.node.getComponent(UITransformComponent);
  }

  private get money(): Node {
    return this.node.getChildByName("Money");
  }

  private get moneyBoxCollider2D(): BoxCollider2D {
    return this.money.getComponent(BoxCollider2D);
  }

  private get moneyUITransform(): UITransformComponent {
    return this.money.getComponent(UITransformComponent);
  }
}
