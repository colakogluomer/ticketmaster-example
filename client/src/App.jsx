import React, { useState, useEffect } from "react";
import Table from "./Table";
import Pagination from "./Pagination";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EventDetail from "./EventDetail";
import useDebounce from "./hooks/useDebounce";
import { fetchEvents } from "./services/Events";
import Search from "./Search";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Fetch events dynamically with the updated page information and search query
  useEffect(() => {
    setLoading(true); // Set loading to true before starting the fetch
    setError(false);

    fetchEvents(debouncedSearchQuery || "", currentPage, pageSize)
      .then((data) => {
        setEvents(data._embedded.events);
        setTotalPages(data.page.totalPages);
        setTotalElements(data.page.totalElements);
        setPageSize(data.page.size);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setEvents([]);
        setError(true);
      });
  }, [debouncedSearchQuery, currentPage, pageSize]);

  // Sorting logic remains the same
  const sortedEvents = React.useMemo(() => {
    let sortableEvents = [...events];
    if (sortConfig.key) {
      sortableEvents.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableEvents;
  }, [events, sortConfig]);

  return (
    <Router>
      <div className="bg-gray-50">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6 text-blue-800">
            Upcoming Events
          </h1>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Search setSearchQuery={setSearchQuery} />
                  <Table
                    events={sortedEvents}
                    setSortConfig={setSortConfig}
                    sortConfig={sortConfig}
                    loading={loading}
                    error={error}
                    pageSize={pageSize}
                  />
                  <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                    totalElements={totalElements}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                  />
                </>
              }
            />
            <Route path="/event/:eventId" element={<EventDetail />} />{" "}
            {/* Event detail route */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
