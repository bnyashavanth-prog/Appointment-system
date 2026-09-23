"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-red-950 border border-red-500 rounded-3xl p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-4">Critical Application Error</h2>
        <p className="text-red-200 mb-6">The application crashed. This is the exact error message:</p>
        
        <div className="bg-black/50 p-4 rounded-xl overflow-auto mb-6">
          <pre className="text-red-400 font-mono text-sm whitespace-pre-wrap">
            {error.message || "Unknown Error"}
          </pre>
          {error.stack && (
            <pre className="text-red-400/70 font-mono text-xs whitespace-pre-wrap mt-4">
              {error.stack}
            </pre>
          )}
          {error.digest && (
            <p className="text-red-300/50 text-xs mt-4">Digest: {error.digest}</p>
          )}
        </div>

        <button
          onClick={() => reset()}
          className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-xl transition-all"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
