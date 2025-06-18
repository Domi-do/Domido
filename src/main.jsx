import "@/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { ToastProvider } from "./store/ToastContext";

import { ErrorBoundary } from "@/components/Common/ErrorBoundary";
import ErrorFallback from "@/components/Common/ErrorFallback";
import GlobalPortal from "@/components/Common/GlobalPortal";
import routes from "@/routers/routes";
import "@/constants/modelPaths";

const root = document.getElementById("root");
const queryClient = new QueryClient();

createRoot(root).render(
  // <StrictMode>
  <ErrorBoundary
    fallback={ErrorFallback}
    onReset={() => (window.location.href = "/")}
  >
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools
        initialIsOpen={false}
        position="bottom-right"
      />
      <ToastProvider>
        <GlobalPortal>
          <RouterProvider router={routes} />
        </GlobalPortal>
      </ToastProvider>
    </QueryClientProvider>
  </ErrorBoundary>,
  // </StrictMode>,
);
