import useUserStore from "@/store/useUserStore";

const getPrefix = () => {
  const { userInfo } = useUserStore.getState();
  return userInfo?.isMember ? "" : "/guest";
};

const getUserId = () => {
  const { userInfo } = useUserStore.getState();
  return userInfo?.userID;
};

export const API_PATHS = {
  get PROJECTS() {
    const prefix = getPrefix();
    const userId = getUserId();
    return prefix === "" ? "/projects" : `${prefix}/projects/user/${userId}`;
  },
  PROJECT_DETAIL: (id: string) => `${getPrefix()}/projects/${id}`,
  DOMINO: (projectId: string) => `${getPrefix()}/dominos/${projectId}`,
  PROJECT_INVITE: (code: string) => `/projects/${code}`,
  HOME: "/",
} as const;
