import { useState, useEffect } from 'react';
import { searchPlants } from '../services/api'; // API function to fetch plants based on search query
import PlantCard from '../components/PlantCard'; // Card component to display plant info
import './Search.css'; // Styling for the search page

const Search = () => {
  const [query, setQuery] = useState('');       // Current text in the input box
  const [results, setResults] = useState([]);   // Search results from API
  const [isLoading, setIsLoading] = useState(false);  // Loading state to show "Loading..." while fetching

  useEffect(() => {
    // If the input is empty or only whitespace, clear results
    if (query.trim() === '') {
     setResults([]);
       return;
    }

    // Debounce the search call by 500ms after user stops typing
    const timer = setTimeout(async () => {
      setIsLoading(true); // Show loading text while fetching

      const { data, error } = await searchPlants(query); // Call search API

      if (error) {
        console.error('Search error:', error); // Log if something goes wrong
        setResults([]);
      } else {
        setResults(data); // Set results if successful
      }

      setIsLoading(false); // Stop loading state
    }, 500);

    // Clear the previous timeout if user types again before 500ms
    return () => clearTimeout(timer);
  }, [query]); // Run effect every time `query` changes

  return (
    <div className="search-page">
      <h1>Search Plants</h1>

      {/* Search Input Field */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for plants..."
      />

      {/* Show loading message while fetching */}
      {isLoading ? (
        <p>Loading...</p>

      // Show search results if any
      ) : results.length > 0 ? (
        <div className="plants-grid">
          {results.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>

      // If no results and input isn't empty, show fallback message
      ) : query ? (
        <p>No results found</p>

      // If query is empty, show nothing
      ) : null}
    </div>
  );
};

     export default Search;
