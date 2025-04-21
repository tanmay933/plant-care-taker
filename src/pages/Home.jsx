// Importing custom hook for plant data and components
import { usePlants } from '../context/PlantContext';
import PlantCard from '../components/PlantCard';
import WateringProgress from '../components/WateringProgress';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  // Accessing context values: plant list, loading state, and error (if any)
  const { myPlants, loading, error } = usePlants();

  // If data is still being fetched, show loading message
  if (loading) {
    return <div className="loading">Loading your plants...</div>;
  }

  // If there was an error while fetching, show error message
  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="home">
      <h1>Your Plant Collection</h1>

      {/* If no plants exist, show an empty state with a link to add plants */}
      {myPlants.length === 0 ? (
        <div className="empty-state">
          <p>No plants yet. Add your first plant!</p>
          <Link to="/add" className="button">Add Plant</Link>
        </div>
      ) : (
        // If plants are available, render them in a grid
        <div className="plants-grid">
          {myPlants.map((plant) => (
            <div key={plant.id} className="plant-container">
              {/* Individual plant card */}
              <PlantCard plant={plant} />
              {/* Visual watering progress indicator */}
              <WateringProgress plant={plant} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
