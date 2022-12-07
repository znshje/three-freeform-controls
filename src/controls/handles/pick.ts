import { DEFAULT_HIGHLIGHT_COLOR_ADD } from "src/utils/constants";
import {

MeshBasicMaterial
} from "three";
import Octahedron from "../../primitives/octahedron";
import { PickGroup } from "./index";

export default class Pick extends PickGroup {
  public readonly octahedron: Octahedron;

  constructor() {
    super();
    this.octahedron = new Octahedron("#e0e0e0");
    this.add(this.octahedron);
  }

  /**
   * @hidden
   */
  public getInteractiveObjects = () => {
    return [this.octahedron];
  };

  public setColor = (color: string) => {
    const octahedronMaterial = this.octahedron.material as MeshBasicMaterial;
    octahedronMaterial.color.set(color);
  };

  public setHighLightColor(highlight: boolean): void {
    const octahedronMaterial = this.octahedron.material as MeshBasicMaterial;
    octahedronMaterial.color.set("#e0e0e0");
    if (highlight) {
      octahedronMaterial.color.addScalar(DEFAULT_HIGHLIGHT_COLOR_ADD);
    }
    octahedronMaterial.needsUpdate = true;
  }
}
