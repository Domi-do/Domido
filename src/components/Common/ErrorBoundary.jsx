import * as React from "react";

import { HTTPError } from "@/utils/HTTPError";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.captureReject = this.captureReject.bind(this);
    this.resetError = this.resetError.bind(this);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidMount() {
    window.addEventListener("unhandledrejection", this.captureReject);
  }

  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.captureReject);
  }
  captureReject(event) {
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
            this.state.error instanceof HTTPError ? this.state.error.statusCode : undefined
          }
          resetError={this.resetError}
        />
      );
    }

    return children;
  }
}
