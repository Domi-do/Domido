import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

import useSettingStore from "@/store/useSettingStore";
import AudioController from "@/utils/AudioController";

const BGM_PATH = "/sounds/bgm.mp3";

const GlobalAudio = () => {
  const { camera } = useThree();
  const volumeLevel = useSettingStore((state) => state.volumeLevel);
  const audioController = useRef(new AudioController());

  useEffect(() => {
    const audioController = audioController.current;

    audioController.init(camera, volumeLevel, true);
    audioController.play(BGM_PATH);

    return () => {
      audioController.cleanup(camera);
    };
  }, []);

  useEffect(() => {
    audioController.current.setVolume(volumeLevel);
  }, [volumeLevel]);

  return null;
};

export default GlobalAudio;
