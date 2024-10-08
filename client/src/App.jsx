import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Events from "./pages/Events/Events";
import EventDetail from "./pages/EventDetail/EventDetail";

function App() {
  return (
    <Router>
      <div className="bg-gray-50">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6 text-blue-800">
            Upcoming Events
          </h1>
          <Routes>
            <Route path="/" element={<Events />} />
            <Route path="/event/:eventId" element={<EventDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
