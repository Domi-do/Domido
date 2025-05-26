import { createBrowserRouter } from "react-router-dom";

import DominoScene from "@/pages/DominoScene";
import Home from "@/pages/Home";

const routes = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "game", element: <DominoScene /> },
  { path: "projects/:projectId", element: <DominoScene /> },
]);

export default routes;
