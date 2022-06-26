import {
  _decorator,
  Component,
  RichTextComponent,
  PhysicsSystem2D,
  Input,
  input,
  sys,
  director,
} from "cc";
import { MoneyArea } from "../prefab/MoneyArea/MoneyArea";
import { Mover } from "../prefab/Shaker/Mover";
const { ccclass, property } = _decorator;

const bestScoreKey = "LIQUID_SURFER_BEST_SCORE";

@ccclass("Main")
export class Main extends Component {
  @property(Number)
  private oneGameTimeSeconds = 60;

  @property(RichTextComponent)
  private messageComponent: RichTextComponent;

  @property(RichTextComponent)
  private scoreComponent: RichTextComponent;

  @property(RichTextComponent)
  private bestScoreComponent: RichTextComponent;

  @property(RichTextComponent)
  private timeLeftComponent: RichTextComponent;

  @property(Mover)
  private mover: Mover;

  @property(MoneyArea)
  private moneyArea: MoneyArea;

  private started = false;
  private timeLeftSeconds = 0;
  private score: number;
  private bestScore: number;

  start() {
    this.setGameStarted(false);
    input.on(Input.EventType.MOUSE_DOWN, this.onClick, this);
    input.on(Input.EventType.TOUCH_START, this.onClick, this);
    this.started = false;
    this.timeLeftSeconds = this.oneGameTimeSeconds;
    this.score = 0;
    this.bestScore = 0;
    const bestScoreStr = sys.localStorage.getItem(bestScoreKey);
    if (bestScoreStr != null) {
      this.bestScore = parseFloat(bestScoreStr);
    }
    this.updateValues();
  }

  onDestroy() {
    input.off(Input.EventType.MOUSE_DOWN, this.onClick, this);
    input.off(Input.EventType.KEY_DOWN, this.onClick, this);
  }

  update(deltaTime: number) {
    if (!this.started) {
      return;
    }
    this.timeLeftSeconds -= deltaTime;
    this.score = this.moneyArea.moneyCount;
    if (this.bestScore < this.score) {
      this.bestScore = this.score;
    }
    if (this.timeLeftSeconds <= 0) {
      sys.localStorage.setItem(bestScoreKey, this.bestScore.toString());
      director.loadScene("Main");
      return;
    }
    this.updateValues();
  }

  private onClick() {
    this.messageComponent.enabled = false;
    this.setGameStarted(true);
    input.off(Input.EventType.KEY_DOWN, this.onClick, this);
  }

  private setGameStarted(enabled: boolean): void {
    this.started = enabled;
    PhysicsSystem2D.instance.enable = enabled;
    this.mover.started = enabled;
    this.moneyArea.started = enabled;
    this.messageComponent.enabled = !enabled;
  }

  private updateValues(): void {
    this.setValueText(
      "Time Left",
      this.timeLeftSeconds,
      this.timeLeftComponent,
      (v) => v.toFixed(2)
    );
    this.setValueText("Score", this.score, this.scoreComponent);
    this.setValueText("Best Score", this.bestScore, this.bestScoreComponent);
  }

  private setValueText(
    header: string,
    value: number,
    component: RichTextComponent,
    formatter = (v: number) => v.toFixed()
  ): void {
    component.string = `${header}: ${formatter(value)}`;
  }
}
