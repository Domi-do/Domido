import { render } from "@testing-library/react";

import { ToastProvider } from "@/store/ToastContext";

export const renderWithProviders = (ui) => render(<ToastProvider>{ui}</ToastProvider>);
