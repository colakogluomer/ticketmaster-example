import React, { useState, useMemo, useEffect } from "react";

export default function NoEventsFound() {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-blue-50 rounded-lg shadow-inner">
      <svg
        className="w-16 h-16 text-blue-400 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        />
      </svg>
      <h2 className="text-2xl font-bold text-blue-700 mb-2">No Events Found</h2>
      <p className="text-blue-600 text-center">
        We could not find any events at the moment. Please check back later or
        try a different search.
      </p>
    </div>
  );
}
