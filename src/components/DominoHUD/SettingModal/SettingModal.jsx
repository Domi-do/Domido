import tileGrass from "/images/tile/grass.png";
import tileWoodDark from "/images/tile/wood_dark.png";
import tileWoodLight from "/images/tile/wood_light.png";

import useSettingStore from "@/store/useSettingStore";
import SettingGroup from "@/components/DominoHUD/SettingModal/SettingGroup";
import GroundTypeButton from "@/components/DominoHUD/SettingModal/GroundTypeButton";
import ModalOverlay from "@/components/Common/ModalOverlay";

const groundOptions = [
  { type: "grass", image: tileGrass },
  { type: "wood_dark", image: tileWoodDark },
  { type: "wood_light", image: tileWoodLight },
];

const SettingModal = ({ closeModal }) => {
  const {
    rotationSensitivity,
    setRotationSensitivity,
    groundType,
    setGroundType,
    volumeLevel,
    setVolumeLevel,
    objectVolume,
    setObjectVolume,
  } = useSettingStore();

  return (
    <ModalOverlay closeModal={closeModal}>
      <section>
        <SettingGroup title="민감도">
          <input
            id="sensitivity"
            type="range"
            min={1}
            max={50}
            step={0.01}
            value={rotationSensitivity}
            onChange={(e) => setRotationSensitivity(e.target.value)}
            className="w-full mb-[16px] appearance-none h-[8px] rounded bg-gray-200 custom-slider"
          />
        </SettingGroup>
        <SettingGroup title="배경 음악 음량">
          <input
            id="volume"
            type="range"
            max={4}
            step={0.01}
            value={volumeLevel}
            onChange={(e) => setVolumeLevel(parseFloat(e.target.value))}
            className="w-full mb-[16px] appearance-none h-[8px] rounded bg-gray-100 custom-slider"
          />
        </SettingGroup>
        <SettingGroup title="효과음 음량">
          <input
            id="object-volume"
            type="range"
            max={4}
            step={0.01}
            value={objectVolume}
            onChange={(e) => setObjectVolume(parseFloat(e.target.value))}
            className="w-full mb-[16px] appearance-none h-[8px] rounded bg-gray-100 custom-slider"
          />
        </SettingGroup>

        <SettingGroup title="배경">
          <ul className="flex gap-[10px]">
            {groundOptions.map(({ type, image }) => (
              <li key={type}>
                <GroundTypeButton
                  type={type}
                  image={image}
                  selected={groundType === type}
                  onClick={setGroundType}
                />
              </li>
            ))}
          </ul>
        </SettingGroup>
      </section>
    </ModalOverlay>
  );
};

export default SettingModal;
