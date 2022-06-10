import { Component, UITransformComponent } from "cc";

export class WallBase extends Component {
  protected thickness = 1;
  protected get uiTransform(): UITransformComponent {
    return this.node.getComponent(UITransformComponent);
  }
  protected get parentUiTransform(): UITransformComponent {
    return this.node.parent.getComponent(UITransformComponent);
  }
}
