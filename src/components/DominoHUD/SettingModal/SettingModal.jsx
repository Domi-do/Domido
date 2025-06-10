import tileGrass from "/images/tile/grass.png";
import tileWoodDark from "/images/tile/wood_dark.png";
import tileWoodLight from "/images/tile/wood_light.png";

import useSettingStore from "@/store/useSettingStore";
import SettingGroup from "@/components/DominoHUD/SettingModal/SettingGroup";
import GroundTypeButton from "@/components/DominoHUD/SettingModal/GroundTypeButton";
import ModalOverlay from "@/components/Common/ModalOverlay";

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { useToast } from "@/store/ToastContext";

import { ImCopy } from "react-icons/im";

const GROUND_OPTIONS = [
  { type: "grass", image: tileGrass },
  { type: "wood_dark", image: tileWoodDark },
  { type: "wood_light", image: tileWoodLight },
];

const SettingModal = ({ closeModal }) => {
  const { projectId } = useParams();
  const [inviteCode, setInviteCode] = useState("");
  const navigate = useNavigate();
  const { showToast } = useToast();

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

  useEffect(() => {
    if (projectId) {
      setInviteCode(projectId);
    }
  }, [projectId]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(projectId);
    showToast({ message: "복사 완료 ✅  ", placement: "center" });
  };
  const handleJoin = async () => {
    if (!inviteCode)
      return showToast({ message: "초대 코드를 입력해주세요 ❗", placement: "center" });

    const token = localStorage.getItem("dominoAccessToken");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/projects/${inviteCode}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error("존재하지 않는 프로젝트입니다.");
      }

      navigate(`/projects/${inviteCode}`);
    } catch (err) {
      console.error("프로젝트 유효성 검사 실패:", err.message);
      showToast({ message: "존재하지 않는 프로젝트입니다 ❗", placement: "center" });
    }
  };

  return (
    <ModalOverlay closeModal={closeModal}>
      <section>
        <SettingGroup title="민감도">
          <input
            id="sensitivity"
            type="range"
            min={0.01}
            max={10}
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
            {GROUND_OPTIONS.map(({ type, image }) => (
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
        <SettingGroup title="초대 코드">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                placeholder={projectId}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
              <button onClick={handleCopy}>
                <ImCopy className="text-2xl" />
              </button>
            </div>

            <button
              onClick={handleJoin}
              className="w-full px-4 py-2 text-sm font-semibold text-white bg-[#fc9d16] rounded-lg shadow hover:bg-orange-400 transition"
            >
              이동하기
            </button>
          </div>
        </SettingGroup>
      </section>
    </ModalOverlay>
  );
};

export default SettingModal;
