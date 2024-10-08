import { Link } from "react-router-dom";
import NoEventsFound from "../../components/NoEventsFound";
import LoadingPulse from "../../components/LoadingPulse";

const Table = ({
  events,
  setSortConfig,
  sortConfig,
  loading,
  error,
  pageSize,
}) => {
  const handleSort = (key, direction) => {
    setSortConfig({ key, direction });
  };

  const renderChevrons = (key) => {
    const isActive = sortConfig.key === key;
    const isAscending = isActive && sortConfig.direction === "ascending";
    const isDescending = isActive && sortConfig.direction === "descending";

    return (
      <span className="ml-2">
        {/* Up Chevron */}
        <span
          onClick={() => handleSort(key, "ascending")}
          className={`cursor-pointer ${
            isAscending ? "text-blue-500" : "text-gray-400"
          }`}
        >
          ▲
        </span>
        {/* Down Chevron */}
        <span
          onClick={() => handleSort(key, "descending")}
          className={`cursor-pointer ${
            isDescending ? "text-blue-500" : "text-gray-400"
          }`}
        >
          ▼
        </span>
      </span>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
              Event {renderChevrons("name")}{" "}
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
              Date & Time {renderChevrons("date")}
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
              Venue
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {loading ? (
            <LoadingPulse isForTable={true} pageSize={pageSize} />
          ) : (
            events?.map((event) => (
              <tr key={event.id} className="hover:bg-blue-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {event.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg
                      className="h-5 w-5 mr-2 text-blue-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    {new Date(event.dates.start.dateTime).toLocaleDateString(
                      [],
                      { year: "numeric", month: "long", day: "numeric" }
                    )}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <svg
                      className="h-5 w-5 mr-2 text-blue-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {new Date(event.dates.start.dateTime).toLocaleTimeString(
                      [],
                      { hour: "2-digit", minute: "2-digit" }
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg
                      className="h-5 w-5 mr-2 text-blue-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {event._embedded?.venues && event._embedded.venues[0].name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg
                      className="h-5 w-5 mr-2 text-blue-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="1" x2="12" y2="23" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                    {event.priceRanges
                      ? `${event.priceRanges[0].min} - ${event.priceRanges[0].max} ${event.priceRanges[0].currency}`
                      : "N/A"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      event.dates.status.code === "onsale"
                        ? "bg-green-100 text-green-800"
                        : event.dates.status.code === "rescheduled"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {event.dates.status.code}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    to={`/event/${event.id}`}
                    disabled={event.dates.status.code === "offsale"}
                    className="px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {error && <NoEventsFound />}
    </div>
  );
};

export default Table;
