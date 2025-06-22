export const API_PATHS = {
  PROJECTS: "/projects",
  PROJECT_DETAIL: (id: string) => `/projects/${id}`,
  HOME: "/",
} as const;
