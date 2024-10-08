import React from "react";

export default function LoadingPulse({ isForTable, pageSize = 10 }) {
  return (
    <>
      {isForTable ? (
        Array.from({ length: pageSize }).map((_, index) => (
          <tr key={index} className="animate-pulse">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="h-8 bg-gray-200 rounded w-24"></div>
            </td>
          </tr>
        ))
      ) : (
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-64 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      )}
    </>
  );
}
