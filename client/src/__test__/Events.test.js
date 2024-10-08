import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Search from "../pages/Events/Search";
import Table from "../pages/Events/Table";
import "@testing-library/jest-dom";

const mockEvents = [
  {
    id: "1",
    name: "Event 1",
    dates: {
      start: { dateTime: "2024-10-10T18:00:00Z" },
      status: { code: "onsale" },
    },
    _embedded: { venues: [{ name: "Venue 1" }] },
    priceRanges: [{ min: 50, max: 100, currency: "USD" }],
  },
  {
    id: "2",
    name: "Event 2",
    dates: {
      start: { dateTime: "2024-10-15T20:00:00Z" },
      status: { code: "offsale" },
    },
    _embedded: { venues: [{ name: "Venue 2" }] },
    priceRanges: [{ min: 60, max: 120, currency: "USD" }],
  },
];

describe("User Flow Tests", () => {
  let setSortConfig;
  let setSearchQuery;

  beforeEach(() => {
    setSortConfig = jest.fn();
    setSearchQuery = jest.fn();
  });

  test("Search component updates query", () => {
    render(<Search setSearchQuery={setSearchQuery} />);

    const searchInput = screen.getByPlaceholderText(
      "Search events or venues..."
    );

    fireEvent.change(searchInput, { target: { value: "Event 1" } });

    expect(setSearchQuery).toHaveBeenCalledWith("Event 1");
  });

  test("Table renders events and handles sorting", () => {
    render(
      <Router>
        <Table
          events={mockEvents}
          setSortConfig={setSortConfig}
          sortConfig={{ key: "name", direction: "ascending" }}
          loading={false}
          error={false}
          pageSize={2}
        />
      </Router>
    );

    // Check if events are rendered
    expect(screen.getByText("Event 1")).toBeInTheDocument();
    expect(screen.getByText("Venue 1")).toBeInTheDocument();
    expect(screen.getByText("Event 2")).toBeInTheDocument();
    expect(screen.getByText("Venue 2")).toBeInTheDocument();

    // Test sorting by clicking the chevrons
    const eventNameChevron = screen.getAllByText("▲")[0]; // Assuming the first is for the name
    fireEvent.click(eventNameChevron);

    expect(setSortConfig).toHaveBeenCalledWith({
      key: "name",
      direction: "ascending",
    });
  });

  test("Table displays error state", () => {
    render(
      <Table
        events={[]}
        setSortConfig={setSortConfig}
        sortConfig={{ key: "name", direction: "ascending" }}
        loading={false}
        error={true}
        pageSize={2}
      />
    );

    // Check for error message
    expect(screen.getByText("No Events Found")).toBeInTheDocument();
  });
});
