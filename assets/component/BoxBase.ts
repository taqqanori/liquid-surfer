import { BoxCollider2D, Component, math, UITransformComponent } from "cc";

export class BoxBase extends Component {
  protected get boxCollider2D(): BoxCollider2D {
    return this.node.getComponent(BoxCollider2D);
  }

  protected get uiTransform(): UITransformComponent {
    return this.node.getComponent(UITransformComponent);
  }

  protected get parentUiTransform(): UITransformComponent {
    return this.node.parent.getComponent(UITransformComponent);
  }

  protected setPosition(x: number, y: number): void {
    this.node.position = new math.Vec3(x, y);
  }

  protected setSize(width: number, height: number): void {
    const size = new math.Size(width, height);
    this.uiTransform.contentSize = size;
    this.boxCollider2D.size = size;
    this.boxCollider2D.apply();
  }
}
