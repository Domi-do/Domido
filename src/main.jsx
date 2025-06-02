import "@/index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import GlobalPortal from "@/components/Common/GlobalPortal";
import routes from "@/routers/routes";

const root = document.getElementById("root");

createRoot(root).render(
  <StrictMode>
    <GlobalPortal>
      <RouterProvider router={routes} />
    </GlobalPortal>
  </StrictMode>,
);
