import {
  Vector3,
  BufferGeometry,
  Float32BufferAttribute,
  MeshBasicMaterial
} from "three";
import Cone from "../../primitives/cone";
import {
  DEFAULT_COLOR_ARROW,
  DEFAULT_CONE_HEIGHT,
  DEFAULT_CONE_RADIUS,
  DEFAULT_LINE_HEIGHT,
  DEFAULT_HIGHLIGHT_COLOR_ADD
} from "../../utils/constants";
import Line from "../../primitives/line";
import { TranslationGroup } from "./index";
import Cylinder from "src/primitives/cylinder";

export default class Translation extends TranslationGroup {
  public readonly cone: Cone;
  public readonly line: Line;
  private readonly color: string;
  private readonly cylinder: Cylinder;
  public parallel = new Vector3(0, 1, 0);

  constructor(color = DEFAULT_COLOR_ARROW) {
    super();
    this.color = color;
    this.cone = new Cone(color);
    const lineGeometry = new BufferGeometry();
    lineGeometry.setAttribute( 'position', new Float32BufferAttribute([
      0, 0, 0,
      0, DEFAULT_LINE_HEIGHT, 0
    ], 3 ));

    this.line = new Line(color, lineGeometry);
    this.cone.geometry.scale(DEFAULT_CONE_RADIUS, DEFAULT_CONE_HEIGHT, DEFAULT_CONE_RADIUS);
    this.cone.translateY(DEFAULT_LINE_HEIGHT + 0.5 * DEFAULT_CONE_HEIGHT * DEFAULT_CONE_HEIGHT);

    this.add(this.cone);
    this.add(this.line);

    this.cylinder = new Cylinder(DEFAULT_CONE_RADIUS, DEFAULT_CONE_HEIGHT + DEFAULT_LINE_HEIGHT * 2);
    this.add(this.cylinder);
  }

  /**
   * @hidden
   */
  public getInteractiveObjects = () => {
    return [this.cone, this.cylinder];
  };

  public setColor = (color: string) => {
    const coneMaterial = this.cone.material as MeshBasicMaterial;
    const lineMaterial = this.line.material as MeshBasicMaterial;
    coneMaterial.color.set(color);
    lineMaterial.color.set(color);
  };
  
  public setHighLightColor(highlight: boolean): void {
    const coneMaterial = this.cone.material as MeshBasicMaterial;
    const lineMaterial = this.line.material as MeshBasicMaterial;
    coneMaterial.color.set(this.color);
    lineMaterial.color.set(this.color);
    if (highlight) {
      coneMaterial.color.addScalar(DEFAULT_HIGHLIGHT_COLOR_ADD);
      lineMaterial.color.addScalar(DEFAULT_HIGHLIGHT_COLOR_ADD);
    }
    coneMaterial.needsUpdate = true;
    lineMaterial.needsUpdate = true;
  }
}
