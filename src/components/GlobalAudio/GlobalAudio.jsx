import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

const GlobalAudio = () => {
  const { camera } = useThree();

  useEffect(() => {
    const listener = new THREE.AudioListener();
    camera.add(listener);

    const sound = new THREE.Audio(listener);

    const audioLoader = new THREE.AudioLoader();
    audioLoader.load("/sounds/bgm.mp3", (buffer) => {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(0.5);
      sound.play();
    });
  }, [camera]);

  return null;
};

export default GlobalAudio;
