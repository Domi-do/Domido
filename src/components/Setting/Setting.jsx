import tileGrass from "/images/tile/grass.png";
import tileWoodDark from "/images/tile/wood_dark.png";
import tileWoodLight from "/images/tile/wood_light.png";

import useSettingStore from "@/store/useSettingStore";
import SettingGroup from "@/components/Setting/SettingGroup";
import GroundTypeButton from "@/components/GroundTypeButton/GroundTypeButton";

const DominoHUD = ({ rotationSensitivity, onChangeSensitivity }) => {
  const { groundType, setGroundType } = useSettingStore();

  const groundOptions = [
    { type: "grass", image: tileGrass },
    { type: "wood_dark", image: tileWoodDark },
    { type: "wood_light", image: tileWoodLight },
  ];

  return (
    <section>
      <SettingGroup title="민감도">
        <input
          id="sensitivity"
          type="range"
          min={1}
          max={50}
          step={0.01}
          value={rotationSensitivity}
          onChange={onChangeSensitivity}
          className="w-full mb-[16px] appearance-none h-[8px] rounded bg-gray-200 custom-slider"
        />
      </SettingGroup>
      <SettingGroup title="음량">
        <input
          id="volume"
          type="range"
          value={0}
          disabled
          className="w-full mb-[16px] appearance-none h-[8px] rounded bg-gray-100 cursor-not-allowed"
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
  );
};

export default DominoHUD;
