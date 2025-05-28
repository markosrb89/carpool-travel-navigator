import React from "react";
import { SearchResult } from "./types";

interface SearchResultsProps {
  results: SearchResult[];
  onSelect: (result: SearchResult) => void;
  showDropdown: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  onSelect,
  showDropdown,
}) => {
  if (!showDropdown || results.length === 0) {
    return null;
  }

  return (
    <div className="absolute z-50 left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
      {results.map((result, idx) => (
        <button
          key={`${result.lat}-${result.lon}-${idx}`}
          className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
          onClick={() => onSelect(result)}
        >
          <div className="font-medium text-gray-900 truncate">
            {result.display_name}
          </div>
          <div className="text-sm text-gray-500 truncate">
            {result.type} •{" "}
            {result.address?.city ||
              result.address?.town ||
              result.address?.county}
            , {result.address?.country}
          </div>
        </button>
      ))}
    </div>
  );
};

export default SearchResults;
