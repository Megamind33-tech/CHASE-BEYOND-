import { StandardMaterial, Texture, VideoTexture, type Mesh, type Scene } from "@babylonjs/core";
import type { SourceManifest } from "../../schemas/sourceManifestSchema";

export type VideoSourceBinding = {
  texture: VideoTexture;
  video: HTMLVideoElement;
  dispose: () => void;
};

function waitForVideoFrame(
  video: HTMLVideoElement,
  sourceUrl: string,
  signal?: AbortSignal
): Promise<void> {
  if (video.readyState >= video.HAVE_CURRENT_DATA && video.videoWidth > 0 && video.videoHeight > 0) {
    return Promise.resolve();
  }

  if (signal?.aborted) {
    return Promise.reject(new Error("Video source loading aborted."));
  }

  return new Promise((resolve, reject) => {
    const cleanup = () => {
      video.removeEventListener("loadeddata", handleReady);
      video.removeEventListener("canplay", handleReady);
      video.removeEventListener("error", handleError);
      signal?.removeEventListener("abort", handleAbort);
    };
    const handleReady = () => {
      if (
        video.readyState >= video.HAVE_CURRENT_DATA &&
        video.videoWidth > 0 &&
        video.videoHeight > 0
      ) {
        cleanup();
        resolve();
      }
    };
    const handleError = () => {
      cleanup();
      reject(new Error(`Source could not be loaded: ${sourceUrl}`));
    };
    const handleAbort = () => {
      cleanup();
      reject(new Error("Video source loading aborted."));
    };

    video.addEventListener("loadeddata", handleReady);
    video.addEventListener("canplay", handleReady);
    video.addEventListener("error", handleError);
    signal?.addEventListener("abort", handleAbort, { once: true });
    video.load();
  });
}

export async function attachVideoSourceToScreen(
  scene: Scene,
  screenMesh: Mesh,
  source: SourceManifest,
  signal?: AbortSignal
): Promise<VideoSourceBinding | null> {
  if (source.type !== "sample-video" || !source.url) {
    return null;
  }

  const sourceUrl = source.url;
  const video = document.createElement("video");
  video.muted = true;
  video.loop = true;
  video.autoplay = true;
  video.playsInline = true;
  video.crossOrigin = "anonymous";
  video.preload = "auto";
  video.src = sourceUrl;

  await waitForVideoFrame(video, sourceUrl, signal);

  const texture = new VideoTexture(
    `${source.id}-texture`,
    video,
    scene,
    false,
    false,
    Texture.TRILINEAR_SAMPLINGMODE
  );
  const material = new StandardMaterial(`${source.id}-screen-material`, scene);
  material.diffuseTexture = texture;
  material.emissiveTexture = texture;
  material.specularColor.set(0.12, 0.18, 0.2);
  material.backFaceCulling = false;
  screenMesh.material = material;

  try {
    await video.play();
  } catch (error) {
    throw new Error("Source could not be played. Check browser media permissions.", {
      cause: error
    });
  }

  return {
    texture,
    video,
    dispose: () => {
      video.pause();
      video.removeAttribute("src");
      video.load();
      texture.dispose();
      material.dispose();
    }
  };
}
