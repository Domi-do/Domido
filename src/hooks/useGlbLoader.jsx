import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const glbCache = new Map();

export default function useGlbLoader(paths = []) {
  const loader = new GLTFLoader();

  paths.forEach((url) => {
    if (glbCache.has(url)) return;

    loader.load(
      url,
      (glb) => {
        glbCache.set(url, glb);
      },
      undefined,
      (err) => {
        console.error("GLB 로드 실패:", url, err);
      },
    );
  });

  const get = (url) => glbCache.get(url);

  return { get };
}
