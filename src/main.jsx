import "@/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import GlobalPortal from "@/components/Common/GlobalPortal";
import routes from "@/routers/routes";

const root = document.getElementById("root");
const queryClient = new QueryClient();

createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalPortal>
        <RouterProvider router={routes} />
      </GlobalPortal>
    </QueryClientProvider>
  </StrictMode>,
);
