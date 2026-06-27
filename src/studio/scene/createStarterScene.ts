import {
  Color3,
  Color4,
  DirectionalLight,
  HemisphericLight,
  Mesh,
  MeshBuilder,
  Scene,
  StandardMaterial,
  UniversalCamera,
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

  const camera = new UniversalCamera("StudioCamera", new Vector3(0, 2.15, -7), scene);
  camera.setTarget(new Vector3(0, 1.65, 1.65));
  camera.speed = 0.15;
  camera.attachControl(canvas, true);

  const ambient = new HemisphericLight("StudioAmbientLight", new Vector3(0, 1, 0), scene);
  ambient.intensity = 0.7;

  const keyLight = new DirectionalLight("StudioKeyLight", new Vector3(-0.4, -0.8, 0.6), scene);
  keyLight.position = new Vector3(2, 6, -4);
  keyLight.intensity = 0.85;

  const floorMaterial = new StandardMaterial("DevelopmentFloorMaterial", scene);
  floorMaterial.diffuseColor = new Color3(0.06, 0.08, 0.13);
  floorMaterial.specularColor = new Color3(0.08, 0.12, 0.16);

  const accentMaterial = new StandardMaterial("DevelopmentAccentMaterial", scene);
  accentMaterial.diffuseColor = new Color3(0.08, 0.17, 0.28);
  accentMaterial.emissiveColor = new Color3(0.01, 0.05, 0.09);

  const wallMaterial = new StandardMaterial("StarterStudioWallMaterial", scene);
  wallMaterial.diffuseColor = new Color3(0.05, 0.08, 0.14);
  wallMaterial.emissiveColor = new Color3(0.005, 0.018, 0.035);

  const platformMaterial = new StandardMaterial("StarterStudioPlatformMaterial", scene);
  platformMaterial.diffuseColor = new Color3(0.12, 0.16, 0.22);
  platformMaterial.specularColor = new Color3(0.1, 0.14, 0.18);

  const lightStripMaterial = new StandardMaterial("StarterStudioLightStripMaterial", scene);
  lightStripMaterial.diffuseColor = new Color3(0.04, 0.36, 0.46);
  lightStripMaterial.emissiveColor = new Color3(0.02, 0.42, 0.52);

  const screenMaterial = new StandardMaterial("DevelopmentScreenMaterial", scene);
  screenMaterial.diffuseColor = new Color3(0.02, 0.13, 0.2);
  screenMaterial.emissiveColor = new Color3(0.02, 0.28, 0.38);
  screenMaterial.specularColor = new Color3(0.45, 0.75, 0.85);
  screenMaterial.backFaceCulling = false;

  const floor = MeshBuilder.CreateGround(
    "DevelopmentStudioFloor",
    { width: 10, height: 7.2 },
    scene
  );
  floor.material = floorMaterial;

  const backWall = MeshBuilder.CreateBox(
    "DevelopmentStudioBackdrop",
    { width: 9.4, height: 3.8, depth: 0.16 },
    scene
  );
  backWall.position = new Vector3(0, 1.9, 2.4);
  backWall.material = wallMaterial;

  const leftWing = MeshBuilder.CreateBox(
    "DevelopmentStudioLeftWing",
    { width: 0.24, height: 3.25, depth: 4.6 },
    scene
  );
  leftWing.position = new Vector3(-4.45, 1.62, 0.25);
  leftWing.rotation.y = -0.32;
  leftWing.material = accentMaterial;

  const rightWing = MeshBuilder.CreateBox(
    "DevelopmentStudioRightWing",
    { width: 0.24, height: 3.25, depth: 4.6 },
    scene
  );
  rightWing.position = new Vector3(4.45, 1.62, 0.25);
  rightWing.rotation.y = 0.32;
  rightWing.material = accentMaterial;

  const stageBase = MeshBuilder.CreateCylinder(
    "StarterStudioStageBase",
    { diameter: 5.2, height: 0.22, tessellation: 64 },
    scene
  );
  stageBase.position = new Vector3(0, 0.12, -0.65);
  stageBase.scaling.z = 0.46;
  stageBase.material = platformMaterial;

  const frontStep = MeshBuilder.CreateBox(
    "StarterStudioFrontStep",
    { width: 5.6, height: 0.16, depth: 0.5 },
    scene
  );
  frontStep.position = new Vector3(0, 0.18, -1.92);
  frontStep.material = platformMaterial;

  const leftLightStrip = MeshBuilder.CreateBox(
    "StarterStudioLeftLightStrip",
    { width: 0.08, height: 2.8, depth: 0.06 },
    scene
  );
  leftLightStrip.position = new Vector3(-2.3, 1.75, 2.05);
  leftLightStrip.material = lightStripMaterial;

  const rightLightStrip = MeshBuilder.CreateBox(
    "StarterStudioRightLightStrip",
    { width: 0.08, height: 2.8, depth: 0.06 },
    scene
  );
  rightLightStrip.position = new Vector3(2.3, 1.75, 2.05);
  rightLightStrip.material = lightStripMaterial;

  const headerLight = MeshBuilder.CreateBox(
    "StarterStudioHeaderLight",
    { width: 4.7, height: 0.08, depth: 0.08 },
    scene
  );
  headerLight.position = new Vector3(0, 3.16, 2.05);
  headerLight.material = lightStripMaterial;

  const screenFrame = MeshBuilder.CreateBox(
    "DevelopmentScreenFrame",
    { width: 3.95, height: 2.2, depth: 0.14 },
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
