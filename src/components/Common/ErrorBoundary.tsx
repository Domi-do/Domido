import React, { ComponentType, ReactNode } from "react";

import { HTTPError } from "@/utils/HTTPError";
import { StatusCodeType } from "@/types/statusType";

export interface ErrorProps {
  statusCode?: StatusCodeType;
  resetError?: () => void;
  message?: string;
}

interface ErrorBoundaryProps {
  fallback: ComponentType<ErrorProps>;
  onReset: () => void;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | HTTPError | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
    this.captureReject = this.captureReject.bind(this);
    this.resetError = this.resetError.bind(this);
  }

  static getDerivedStateFromError(error: Error | HTTPError) {
    return { hasError: true, error };
  }

  componentDidMount() {
    window.addEventListener("unhandledrejection", this.captureReject);
  }

  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.captureReject);
  }
  captureReject(event: PromiseRejectionEvent) {
    event.preventDefault();
    const error = event.reason;
    this.setState({ hasError: true, error });
  }

  resetError() {
    this.props.onReset();
    this.setState({ hasError: false, error: null });
  }

  render() {
    const { fallback: Fallback, children } = this.props;
    if (this.state.hasError) {
      return (
        <Fallback
          statusCode={
            this.state.error instanceof HTTPError ?
              (this.state.error.statusCode as StatusCodeType)
            : undefined
          }
          resetError={this.resetError}
        />
      );
    }

    return children;
  }
}
