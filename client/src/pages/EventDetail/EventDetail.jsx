import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchEventDetails } from "../../services/Events";
import LoadingPulse from "../../components/LoadingPulse";

export default function EventDetail() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetchEventDetails(eventId).then((data) => {
      setEvent(data);
    });
  }, [eventId]);

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8">
        <LoadingPulse />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={event.images[1].url}
          alt={`Event image`}
          className="w-24 h-24 object-cover rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:opacity-75"
          onClick={() => setSelectedImage(image)}
        />
        <h1 className="text-4xl font-bold text-blue-800 mb-6">{event.name}</h1>
      </div>

      {/* Event Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="col-span-2">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            Event Details
          </h2>
          <p className="text-gray-700 mb-4">{event.description}</p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">
              Important Information
            </h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Please arrive at least 30 minutes before the event starts</li>
              <li>
                No photography or video recording allowed during the performance
              </li>
              <li>
                Food and drinks are available for purchase inside the venue
              </li>
              <li>Parking is available on-site for a fee</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-blue-700 mb-4">
              Event Information
            </h3>
            <div className="space-y-3">
              <p className="flex items-center text-gray-700">
                <svg
                  className="w-5 h-5 mr-2 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <span className="font-medium">Date: </span>{" "}
                {new Date(event.dates.start.dateTime).toLocaleDateString([], {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="flex items-center text-gray-700">
                <svg
                  className="w-5 h-5 mr-2 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span className="font-medium">Time: </span>{" "}
                {new Date(event.dates.start.dateTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p className="flex items-center text-gray-700">
                <svg
                  className="w-5 h-5 mr-2 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <span className="font-medium">Venue: </span>{" "}
                {event._embedded?.venues && event._embedded.venues[0].name}
              </p>
              <p className="flex items-center text-gray-700">
                <svg
                  className="w-5 h-5 mr-2 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <span className="font-medium">Address:</span>{" "}
                {event._embedded?.venues &&
                  event._embedded.venues[0].address.line1}
              </p>
              <p className="flex items-center text-gray-700">
                <svg
                  className="w-5 h-5 mr-2 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span className="font-medium">Price: </span>{" "}
                {event.priceRanges
                  ? `${event.priceRanges[0].min} - ${event.priceRanges[0].max} ${event.priceRanges[0].currency}`
                  : "N/A"}
              </p>
            </div>
          </div>

          <Link
            to={event.dates.status.code !== "offsale" && event.url}
            target={
              event.dates.status.code !== "offsale" ? "_blank" : undefined
            }
            disabled={event.dates.status.code === "offsale"}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition duration-300 ease-in-out  ${
              event.dates.status.code === "offsale"
                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            }`}
          >
            {event.dates.status.code === "offsale" ? "Sold Out" : "Buy Tickets"}
          </Link>
        </div>
      </div>

      {/* Seat Plan */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Seat Plan</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          {event.seatmap?.staticUrl ? (
            <img
              src={event.seatmap.staticUrl}
              alt="Event seat plan"
              className="w-full h-auto"
            />
          ) : (
            "No Seat Plan Found"
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-700 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <details className="bg-white shadow-md rounded-lg">
            <summary className="px-4 py-3 font-medium text-blue-800 cursor-pointer">
              Is there an age restriction for this event?
            </summary>
            <p className="px-4 py-3 text-gray-700">
              This event is open to all ages. However, children under 16 must be
              accompanied by an adult.
            </p>
          </details>
          <details className="bg-white shadow-md rounded-lg">
            <summary className="px-4 py-3 font-medium text-blue-800 cursor-pointer">
              What's the refund policy?
            </summary>
            <p className="px-4 py-3 text-gray-700">
              Tickets are non-refundable, but can be transferred to another
              person up to 24 hours before the event.
            </p>
          </details>
          <details className="bg-white shadow-md rounded-lg">
            <summary className="px-4 py-3 font-medium text-blue-800 cursor-pointer">
              Are there VIP packages available?
            </summary>
            <p className="px-4 py-3 text-gray-700">
              Yes, we offer VIP packages that include premium seating,
              meet-and-greet opportunities, and exclusive merchandise. Contact
              our support team for more information.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}
