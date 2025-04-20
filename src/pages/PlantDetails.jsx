import { useParams } from 'react-router-dom';
 import { usePlants } from '../context/PlantContext';
  import WateringProgress from '../components/WateringProgress';
    import './PlantDetails.css';

const PlantDetails = () => {
  // Grab the plant's ID from the route (like /plants/3)
   const { id } = useParams();

  // Access our plants and the waterPlant function from context
    const { myPlants, waterPlant } = usePlants();
  
  // Find the specific plant by matching ID (converted to number)
  const plant = myPlants.find(p => p.id === parseInt(id));

  // If plant wasn't found, show a friendly message
  if (!plant) {
    return (
      <div className="not-found">
        <h2>Plant not found</h2>
        <p>The plant you're looking for doesn't exist in your collection.</p>
      </div>
    );
  }

  // Function to water the plant when button is clicked
  const handleWaterPlant = () => {
    waterPlant(plant.id);
  };

  return (
    <div className="plant-details-container">
      
      {/* Top section: plant name and a "Water Now" button */}
      <div className="plant-header">
        <h1>{plant.name}</h1>
        <button onClick={handleWaterPlant} className="water-btn">
          Water Now
        </button>
      </div>

      <div className="plant-content">
        
        {/* Left side: species + watering progress bar */}
        <div className="plant-meta">
          <h2>{plant.species}</h2>
          <WateringProgress plant={plant} />
        </div>

        {/* Right side: care instructions, notes, last watered */}
        <div className="care-details">
          
          {/* Section: how to care for this plant */}
          <div className="detail-section">
            <h3>Care Instructions</h3>
            <div className="detail-item">
              <span className="detail-label">Watering:</span>
              <span>Every {plant.wateringFrequency} days</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Sunlight:</span>
              <span>
                {plant.sunlight === 'full' ? 'Full Sun' : 
                 plant.sunlight === 'partial' ? 'Partial Sun' : 'Shade'}
              </span>
            </div>
          </div>

          {/* Section: personal notes (if any) */}
          {plant.notes && (
            <div className="detail-section">
              <h3>Your Notes</h3>
              <p className="plant-notes">{plant.notes}</p>
            </div>
          )}

          {/* Section: last time this plant was watered */}
          <div className="detail-section">
            <h3>Last Watered</h3>
            <p>{new Date(plant.lastWatered).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetails;
