'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-stone-50 text-stone-800">
      <h2 className="text-2xl font-bold text-stone-900 mb-2">Something went wrong!</h2>
      <p className="text-stone-600 text-sm mb-6 max-w-md">
        An error occurred while loading this page.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm transition"
      >
        Try again
      </button>
    </div>
  );
}
