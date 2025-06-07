import React from "react";

import { HTTP_ERROR_MESSAGE } from "@/constants/HTTPErrorMessage";

const ErrorFallback = ({ statusCode = 404, resetError, message }) => {
  const currentStatusCode = statusCode;
  const { HEADING, BODY, BUTTON } = HTTP_ERROR_MESSAGE[currentStatusCode];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
        <h2 className="text-xl font-bold mb-3 text-gray-800">{currentStatusCode}</h2>
        <h2 className="text-xl font-bold mb-3 text-gray-800">{HEADING}</h2>
        <p className="text-sm text-gray-600 mb-5">{BODY}</p>
        {message && <div className="text-xs text-red-500 mb-4">{message}</div>}
        <div className="flex justify-center gap-4">
          <button
            onClick={resetError}
            className="px-4 py-2 rounded-md border border-gray-300 bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors cursor-pointer"
          >
            {BUTTON}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
