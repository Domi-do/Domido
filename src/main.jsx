import "@/index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { ErrorBoundary } from "@/components/Common/ErrorBoundary";
import ErrorFallback from "@/components/Common/ErrorFallback";
import GlobalPortal from "@/components/Common/GlobalPortal";
import routes from "@/routers/routes";

const root = document.getElementById("root");

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary
      fallback={ErrorFallback}
      onReset={() => (window.location.href = "/")}
    >
      <GlobalPortal>
        <RouterProvider router={routes} />
      </GlobalPortal>
    </ErrorBoundary>
  </StrictMode>,
);
