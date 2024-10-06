import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchEvents = async (keyword, page, pageSize) => {
  try {
    const response = await axios.get(`${BASE_URL}/events.json`, {
      params: {
        apikey: API_KEY,
        keyword: keyword,
        page: page - 1,
        size: pageSize,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    return {
      events: [],
      totalPages: 1,
    };
  }
};

export const fetchEventDetails = async (eventId) => {
  try {
    const response = await axios.get(`${BASE_URL}/events/${eventId}.json`, {
      params: { apikey: API_KEY },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching event details:", error);
  }
};
