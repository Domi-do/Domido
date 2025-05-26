import { createBrowserRouter } from "react-router-dom";

import DominoScene from "@/pages/DominoScene";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";

const routes = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "game", element: <DominoScene /> },
  { path: "projects/:projectId", element: <DominoScene /> },
  { path: "*", element: <NotFound /> },
]);

export default routes;
