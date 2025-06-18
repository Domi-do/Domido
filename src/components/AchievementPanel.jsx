import useAchievementStore from "@/store/useAchievementStore";

const AchievementPanel = () => {
  const { achievements } = useAchievementStore();
  const allAchievements = [
    { name: "first_domino", title: "첫 도미노!", description: "도미노를 하나라도 놓기" },
    { name: "hundred_domino", title: "열정의 100개", description: "도미노를 100개 놓기" },
    { name: "color_used", title: "색감 장인", description: "색상을 바꿔서 도미노 배치하기" },
    { name: "undo_used", title: "실수는 누구에게나", description: "Undo 버튼 1회 사용" },
    { name: "reset_used", title: "처음부터 다시 시작", description: "Reset 버튼 1회 사용" },
    { name: "hide_used", title: "호그와트 신입생", description: "도미노 숨기기 기능 사용" },
    {
      name: "invited_friend",
      title: "친구와 함게 도미노",
      description: "초대코드를 통해 입장한 유저 1명 이상",
    },
    {
      name: "all_domino_fallen",
      title: "완벽한 연쇄",
      description: "배치한 모든 도미노를 쓰러뜨리는 데 성공",
    },
  ];

  const total = allAchievements.length;
  const achieved = allAchievements.filter((a) => achievements[a.name]?.achieved).length;
  const percent = Math.round((achieved / total) * 100);

  return (
    <div className="top-12 left-0 right-8 w-80 bg-white p-4 rounded-xl shadow-lg z-50 absolute">
      <h2 className="text-xl font-bold mb-4">🏆 업적 달성률: {percent}%</h2>
      <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
        <div
          className="h-full bg-yellow-500 rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>
      <ul className="space-y-2 max-h-64 overflow-y-auto pr-2">
        {allAchievements.map((achieve) => {
          const isAchieved = achievements[achieve.name]?.achieved;
          return (
            <li
              key={achieve.name}
              className="flex justify-between items-center"
            >
              <div>
                <div className="font-semibold">{achieve.title}</div>
                <div className="text-sm text-gray-500">{achieve.description}</div>
              </div>
              <div className="text-right text-sm">
                {isAchieved ?
                  <span className="text-green-600">달성 ✅</span>
                : <span className="text-gray-400">미달성 ❌</span>}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AchievementPanel;
