import { createBrowserRouter } from "react-router-dom";

import DominoScene from "@/pages/DominoScene";
import Home from "@/pages/Home";
import LogoutCallback from "@/pages/LogoutCallback";
import NotFound from "@/pages/NotFound";
import OAuthCallback from "@/pages/OAuthCallback";

const routes = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "*", element: <NotFound /> },
  { path: "/oauth/callback", element: <OAuthCallback /> },
  { path: "projects", element: <DominoScene /> },
  { path: "projects/:projectId", element: <DominoScene /> },
  { path: "/logout/callback", element: <LogoutCallback /> },
]);

export default routes;
