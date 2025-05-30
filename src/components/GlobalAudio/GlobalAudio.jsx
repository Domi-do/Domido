import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

import useSettingStore from "@/store/useSettingStore";
import audioController from "@/utils/audioController";

const GlobalAudio = () => {
  const { camera } = useThree();
  const volumeLevel = useSettingStore((state) => state.volumeLevel);

  useEffect(() => {
    audioController.init(camera, volumeLevel);

    return () => {
      audioController.cleanup(camera);
    };
  }, []);

  useEffect(() => {
    audioController.setVolume(volumeLevel);
  }, [volumeLevel]);

  return null;
};

export default GlobalAudio;
