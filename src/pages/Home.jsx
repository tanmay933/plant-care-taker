import { usePlants } from '../context/PlantContext'; // brings in plant context state (myPlants, loading, error)
 import PlantCard from '../components/PlantCard'; // displays plant details
  import WateringProgress from '../components/WateringProgress'; // visual watering progress tracker
import './Home.css';  // styles for this page

const Home = () => {
   const { myPlants, loading, error } = usePlants(); // grab the current plant list + loading/error states

  // Show  loading message while data is being fetched
  if (loading) {
     return <div className="loading">Loading your plants...</div>;
  }

  // If  something went wrong fetching plants
  if (error) {
     return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="home">
      <h1>Your Plant Collection</h1>

      {/* If no plants have been added yet */}
      {myPlants.length === 0 ? (
        <div className="empty-state">
          <p>No plants yet. Add your first plant!</p>
          <a href="/add" className="button">Add Plant</a>
        </div>
      ) : (
     // Show all user plants in a grid layout
        <div className="plants-grid">
          {myPlants.map((plant) => (
            <div key={plant.id} className="plant-container">
              <PlantCard plant={plant} /> {/* shows plant name, species etc. */}
              <WateringProgress plant={plant} /> {/* visual progress based on watering frequency */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

    export default Home;
