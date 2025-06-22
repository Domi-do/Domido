import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

import { GAME_THEME } from "@/constants/gameThema";
import useSettingStore from "@/store/useSettingStore";
import AudioController from "@/utils/AudioController";

const GlobalAudio = (): null => {
  const themaType = useSettingStore((state) => state.themaType);
  const bgmPath = GAME_THEME[themaType].sound;

  const { camera } = useThree();
  const volumeLevel = useSettingStore((state) => state.volumeLevel);

  const audioControllerRef = useRef<AudioController>(new AudioController());

  useEffect(() => {
    const audioController = audioControllerRef.current;
    audioController.init(camera as THREE.Camera, volumeLevel, true);

    const handleFirstClick = () => {
      audioController.play(bgmPath);
      window.removeEventListener("click", handleFirstClick);
    };

    window.addEventListener("click", handleFirstClick);

    return () => {
      window.removeEventListener("click", handleFirstClick);
      audioController.cleanup(camera as THREE.Camera);
    };
  }, [bgmPath, camera]);

  useEffect(() => {
    audioControllerRef.current.setVolume(volumeLevel);
  }, [volumeLevel]);

  return null;
};

export default GlobalAudio;
