import { useState, useEffect } from 'react';
import { searchPlants } from '../services/api';
import PlantCard from '../components/PlantCard';
import './Search.css';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      const { data, error } = await searchPlants(query);
      
      if (error) {
        console.error('Search error:', error);
        setResults([]);
      } else {
        setResults(data);
      }

      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="search-page">
      <h1>Search Plants</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for plants..."
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : results.length > 0 ? (
        <div className="plants-grid">
          {results.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
      ) : query ? (
        <p>No results found</p>
      ) : null}
    </div>
  );
};

export default Search;
