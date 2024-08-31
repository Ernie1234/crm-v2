"use client";

// components/ErrorBoundary.tsx
import React, { useState, useEffect } from "react";

interface Props {
  children: React.ReactNode;
}

const ErrorBoundary: React.FC<Props> = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  // Error handling function
  const handleError = (error: Error) => {
    console.error("Error Boundary caught an error:", error);
    setHasError(true);
  };

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      handleError(new Error(event.message));
    };

    window.addEventListener("error", errorHandler);

    return () => {
      window.removeEventListener("error", errorHandler);
    };
  }, []);

  if (hasError) {
    return (
      <p className="text-red-500">
        Something went wrong while fetching data. Please try again later.
      </p>
    );
  }

  return <>{children}</>;
};

export default ErrorBoundary;
