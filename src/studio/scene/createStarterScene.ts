import {
  ArcRotateCamera,
  Color3,
  Color4,
  DirectionalLight,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  Scene,
  StandardMaterial,
  Vector3
} from "@babylonjs/core";
import { REQUIRED_SCREEN_MESH } from "./screenBinding";

export type StarterSceneResult = {
  scene: Scene;
  screenMesh: Mesh;
};

export function createStarterScene(
  engineScene: Scene,
  canvas: HTMLCanvasElement
): StarterSceneResult {
  const scene = engineScene;
  scene.clearColor = new Color4(0.02, 0.04, 0.08, 1);

  const camera = new ArcRotateCamera(
    "StudioCamera",
    Math.PI / 2,
    Math.PI / 2.6,
    8,
    new Vector3(0, 1.5, 0),
    scene
  );
  camera.lowerRadiusLimit = 5;
  camera.upperRadiusLimit = 12;
  camera.attachControl(canvas, true);

  const ambient = new HemisphericLight("StudioAmbientLight", new Vector3(0, 1, 0), scene);
  ambient.intensity = 0.7;

  const keyLight = new DirectionalLight("StudioKeyLight", new Vector3(-0.4, -0.8, 0.6), scene);
  keyLight.position = new Vector3(2, 6, -4);
  keyLight.intensity = 0.85;

  const floorMaterial = new StandardMaterial("DevelopmentFloorMaterial", scene);
  floorMaterial.diffuseColor = new Color3(0.08, 0.11, 0.17);
  floorMaterial.specularColor = new Color3(0.08, 0.12, 0.16);

  const accentMaterial = new StandardMaterial("DevelopmentAccentMaterial", scene);
  accentMaterial.diffuseColor = new Color3(0.1, 0.22, 0.34);
  accentMaterial.emissiveColor = new Color3(0.01, 0.05, 0.09);

  const screenMaterial = new StandardMaterial("DevelopmentScreenMaterial", scene);
  screenMaterial.diffuseColor = new Color3(0.04, 0.08, 0.14);
  screenMaterial.emissiveColor = new Color3(0.02, 0.14, 0.22);
  screenMaterial.specularColor = new Color3(0.25, 0.45, 0.55);
  screenMaterial.backFaceCulling = false;

  const floor = MeshBuilder.CreateGround("DevelopmentStudioFloor", { width: 9, height: 7 }, scene);
  floor.material = floorMaterial;

  const backWall = MeshBuilder.CreateBox(
    "DevelopmentStudioBackdrop",
    { width: 9, height: 3.8, depth: 0.18 },
    scene
  );
  backWall.position = new Vector3(0, 1.9, 2.4);
  backWall.material = accentMaterial;

  const leftWing = MeshBuilder.CreateBox(
    "DevelopmentStudioLeftWing",
    { width: 0.22, height: 3.2, depth: 4 },
    scene
  );
  leftWing.position = new Vector3(-4.2, 1.6, 0.6);
  leftWing.rotation.y = -0.25;
  leftWing.material = accentMaterial;

  const rightWing = MeshBuilder.CreateBox(
    "DevelopmentStudioRightWing",
    { width: 0.22, height: 3.2, depth: 4 },
    scene
  );
  rightWing.position = new Vector3(4.2, 1.6, 0.6);
  rightWing.rotation.y = 0.25;
  rightWing.material = accentMaterial;

  const screenFrame = MeshBuilder.CreateBox(
    "DevelopmentScreenFrame",
    { width: 3.9, height: 2.25, depth: 0.12 },
    scene
  );
  screenFrame.position = new Vector3(0, 1.85, 2.28);
  screenFrame.material = floorMaterial;

  const screenMesh = MeshBuilder.CreatePlane(
    REQUIRED_SCREEN_MESH,
    { width: 3.5, height: 1.95 },
    scene
  );
  screenMesh.position = new Vector3(0, 1.85, 2.2);
  screenMesh.rotation.y = Math.PI;
  screenMesh.material = screenMaterial;

  return { scene, screenMesh };
}
