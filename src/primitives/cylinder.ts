import {CylinderGeometry, Mesh, MeshBasicMaterial} from "three";

export default class Cylinder extends Mesh {
  constructor(radius?: number, height?: number) {
    super();
    this.geometry = new CylinderGeometry(radius, 0, height, 4);
    this.material = new MeshBasicMaterial({ depthTest: false });
    this.visible = false;
  }
}
