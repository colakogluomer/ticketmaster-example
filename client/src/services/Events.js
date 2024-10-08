import axios from "axios";

export const fetchEvents = async (keyword, page, pageSize) => {
  try {
    const response = await axios.get(`${__API_URL__}/events.json`, {
      params: {
        apikey: __API_KEY__,
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
    const response = await axios.get(`${__API_URL__}/events/${eventId}.json`, {
      params: { apikey: __API_KEY__ },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching event details:", error);
  }
};
