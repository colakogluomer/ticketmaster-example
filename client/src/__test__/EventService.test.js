import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { fetchEventDetails, fetchEvents } from "../services/Events";

const __API_URL__ = "https://app.ticketmaster.com/discovery/v2"; // Replace with your actual API URL
const __API_KEY__ = "zkZP8oiYTuWce3gXFP5KKEhNFQEdCMD0"; // Replace with your actual API key
global.__API_URL__ = __API_URL__;
global.__API_KEY__ = __API_KEY__;

const mock = new MockAdapter(axios);

describe("Event API", () => {
  afterEach(() => {
    mock.reset(); // Reset the mock after each test
  });

  describe("fetchEvents", () => {
    it("should fetch events successfully", async () => {
      const keyword = "music";
      const page = 1;
      const pageSize = 10;
      const mockEventsResponse = {
        events: [{ id: 1, name: "Concert" }],
        totalPages: 2,
      };

      // Mock the API response
      mock.onGet(`${__API_URL__}/events.json`).reply(200, mockEventsResponse);

      const result = await fetchEvents(keyword, page, pageSize);

      expect(result).toEqual(mockEventsResponse);
    });

    it("should handle fetch events error", async () => {
      const keyword = "music";
      const page = 1;
      const pageSize = 10;

      // Mock an error response
      mock.onGet(`${__API_URL__}/events.json`).reply(500);

      const result = await fetchEvents(keyword, page, pageSize);

      expect(result).toEqual({ events: [], totalPages: 1 });
    });
  });

  describe("fetchEventDetails", () => {
    it("should fetch event details successfully", async () => {
      const eventId = 1;
      const mockEventDetailsResponse = {
        id: 1,
        name: "Concert",
        date: "2024-10-10",
      };

      // Mock the API response
      mock
        .onGet(`${__API_URL__}/events/${eventId}.json`)
        .reply(200, mockEventDetailsResponse);

      const result = await fetchEventDetails(eventId);

      expect(result).toEqual(mockEventDetailsResponse);
    });

    it("should handle fetch event details error", async () => {
      const eventId = 1;

      // Mock an error response
      mock.onGet(`${__API_URL__}/events/${eventId}.json`).reply(500);

      const result = await fetchEventDetails(eventId);

      expect(result).toBeUndefined(); // or handle it accordingly based on your function's behavior
    });
  });
});
