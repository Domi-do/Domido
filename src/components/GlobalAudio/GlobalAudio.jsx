import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

import useSettingStore from "@/store/useSettingStore";
import AudioController from "@/utils/AudioController";

const GlobalAudio = () => {
  const { camera } = useThree();
  const volumeLevel = useSettingStore((state) => state.volumeLevel);
  const audioControllerRef = useRef(new AudioController());

  useEffect(() => {
    audioControllerRef.current.init(camera, volumeLevel);

    return () => {
      audioControllerRef.current.cleanup(camera);
    };
  }, []);

  useEffect(() => {
    audioControllerRef.current.setVolume(volumeLevel);
  }, [volumeLevel]);

  return null;
};

export default GlobalAudio;
