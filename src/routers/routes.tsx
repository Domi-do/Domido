import { createBrowserRouter } from "react-router-dom";

import DominoScene from "@/pages/DominoScene";
import Home from "@/pages/Home";
import LogoutCallback from "@/pages/LogoutCallback";
import OAuthCallback from "@/pages/OAuthCallback";

const routes = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/oauth/callback", element: <OAuthCallback /> },
  { path: "/guest/projects/user/:userId", element: <Home /> },
  { path: "/projects", element: <Home /> },
  { path: "/projects/:projectId", element: <DominoScene /> },
  { path: "/guest/projects/:projectId", element: <DominoScene /> },
  { path: "/logout/callback", element: <LogoutCallback /> },
]);

export default routes;
