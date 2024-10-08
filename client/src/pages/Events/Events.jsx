import { useEffect, useMemo, useState } from "react";
import { fetchEvents } from "../../services/Events";
import useDebounce from "../../hooks/useDebounce";
import Table from "./Table";
import Pagination from "./Pagination";
import Search from "./Search";

const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Fetch events dynamically with the updated page information and search query
  useEffect(() => {
    setLoading(true);
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
        setTotalElements(0);
        setTotalPages(1);
      });
  }, [debouncedSearchQuery, currentPage, pageSize]);

  // Sorting logic
  const sortedEvents = useMemo(() => {
    let sortableEvents = [...events];

    if (sortConfig.key) {
      sortableEvents.sort((a, b) => {
        let aValue, bValue;

        // Check if sorting by name
        if (sortConfig.key === "name") {
          aValue = a.name.toLowerCase(); // Ensure case-insensitive sorting
          bValue = b.name.toLowerCase();
        }
        // Check if sorting by date
        else if (sortConfig.key === "date") {
          aValue = new Date(a.dates.start.dateTime).getTime(); // Convert to timestamp for comparison
          bValue = new Date(b.dates.start.dateTime).getTime();
        }

        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    return sortableEvents;
  }, [events, sortConfig]);

  return (
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
  );
};

export default Events;
