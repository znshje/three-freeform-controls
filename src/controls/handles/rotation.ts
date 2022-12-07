import {
  BufferGeometry,
  Float32BufferAttribute,
  MeshBasicMaterial
} from "three";
import {
  DEFAULT_COLOR_RING,
  DEFAULT_RING_NUM_POINTS,
  DEFAULT_RING_RADIUS,
  DEFAULT_HIGHLIGHT_COLOR_ADD
} from "../../utils/constants";
import Line from "../../primitives/line";
import Octahedron from "../../primitives/octahedron";
import { RotationGroup } from "./index";
import Torus from "src/primitives/torus";

export default class Rotation extends RotationGroup {
  public readonly ring: Line;
  private readonly color: string;
  private readonly handlebar: Torus;

  constructor(color = DEFAULT_COLOR_RING, ringRadius = DEFAULT_RING_RADIUS) {
    super();
    this.color = color;
    const ringNumberOfPoints = DEFAULT_RING_NUM_POINTS;
    const ringGeometry = new BufferGeometry();
    const angle = (2 * Math.PI) / ringNumberOfPoints;
    const vertices  =[];
    for (let i = 1; i < ringNumberOfPoints + 1; i++) {
      vertices.push(ringRadius * Math.cos(i * angle), ringRadius * Math.sin(i * angle), 0);
    }
    ringGeometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
    this.ring = new Line(color, ringGeometry);
    this.add(this.ring);

    this.handlebar = new Torus(ringRadius)
    this.add(this.handlebar);
  }

  /**
   * @hidden
   */
  public getInteractiveObjects = () => {
    return [this.handlebar];
  };

  public setColor = (color: string) => {
    const ringMaterial = this.ring.material as MeshBasicMaterial;
    // const handlebarMaterial = this.handlebar.material as MeshBasicMaterial;
    ringMaterial.color.set(color);
    // handlebarMaterial.color.set(color);
  };

  public setHighLightColor(highlight: boolean): void {
    const ringMaterial = this.ring.material as MeshBasicMaterial;
    ringMaterial.color.set(this.color);
    if (highlight) {
      ringMaterial.color.addScalar(DEFAULT_HIGHLIGHT_COLOR_ADD);
    }
    ringMaterial.needsUpdate = true;
  }
}
