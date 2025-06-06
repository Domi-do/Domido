import { createBrowserRouter } from "react-router-dom";

import DominoScene from "@/pages/DominoScene";
import Game from "@/pages/Game";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import OAuthCallback from "@/pages/OAuthCallback";

const routes = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "game", element: <DominoScene /> },
  { path: "projects/:projectId", element: <DominoScene /> },
  { path: "*", element: <NotFound /> },
  { path: "/oauth/callback", element: <OAuthCallback /> },
  { path: "/game", element: <Game /> },
]);

export default routes;
