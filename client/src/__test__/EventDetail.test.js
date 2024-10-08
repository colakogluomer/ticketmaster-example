import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import { fetchEventDetails } from "../services/Events";
import EventDetail from "../pages/EventDetail/EventDetail";

// Mock the fetchEventDetails function
jest.mock("../services/Events", () => ({
  fetchEventDetails: jest.fn(),
}));

const mockEventDetails = {
  id: "1",
  name: "Event 1",
  description: "This is a detailed description of Event 1.",
  dates: {
    start: { dateTime: "2024-10-10T18:00:00Z" },
  },
  images: [{ url: "image_url_1" }, { url: "image_url_2" }],
  _embedded: {
    venues: [{ name: "Venue 1", address: { line1: "123 Venue St" } }],
  },
  priceRanges: [{ min: 50, max: 100, currency: "USD" }],
  seatmap: { staticUrl: "seatmap_url" },
};

describe("EventDetail Component", () => {
  test("displays event details", async () => {
    fetchEventDetails.mockResolvedValueOnce(mockEventDetails); // Simulate fetching event details

    render(
      <Router>
        <EventDetail />
      </Router>
    );

    // Wait for the event details to be rendered
    await waitFor(() =>
      expect(screen.getByText("Event 1")).toBeInTheDocument()
    );

    // Check if event details are displayed correctly
    expect(
      screen.getByText("This is a detailed description of Event 1.")
    ).toBeInTheDocument();
    expect(screen.getByText("Venue 1")).toBeInTheDocument();
    expect(screen.getByText("123 Venue St")).toBeInTheDocument();
    expect(screen.getByText("Price: 50 - 100 USD")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /buy tickets/i })
    ).toBeInTheDocument();
  });

  test("displays the seat map", async () => {
    fetchEventDetails.mockResolvedValueOnce(mockEventDetails); // Simulate fetching event details

    render(
      <Router>
        <EventDetail />
      </Router>
    );

    await waitFor(() =>
      expect(screen.getByText("Event 1")).toBeInTheDocument()
    );

    // Check if the seat map is displayed correctly
    expect(screen.getByAltText("Event seat plan")).toHaveAttribute(
      "src",
      "seatmap_url"
    );
  });
});
