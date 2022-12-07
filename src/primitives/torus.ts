import {Mesh, MeshBasicMaterial, TorusGeometry} from "three";

export default class Torus extends Mesh {
  constructor(radius?: number) {
    super();
    this.geometry = new TorusGeometry(radius, 0.1, 4, 24);
    this.material = new MeshBasicMaterial({ depthTest: false });
    this.visible = false;
  }
}
