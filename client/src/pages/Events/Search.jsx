const Search = ({ setSearchQuery }) => {
  const handleSearch = (event) => {
    setSearchQuery(event.target.value); // No debounce here, debounce handled in App.js
  };

  return (
    <div className="mb-4 relative">
      <input
        type="text"
        placeholder="Search events or venues..."
        onChange={handleSearch}
        className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <svg
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </div>
  );
};

export default Search;
