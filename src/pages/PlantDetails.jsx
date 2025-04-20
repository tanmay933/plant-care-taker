import { useParams } from 'react-router-dom';
import { usePlants } from '../context/PlantContext';
import WateringProgress from '../components/WateringProgress';
import './PlantDetails.css';

const PlantDetails = () => {
  const { id } = useParams();
  const { myPlants, waterPlant } = usePlants();
  
  const plant = myPlants.find(p => p.id === parseInt(id));

  if (!plant) {
    return (
      <div className="not-found">
        <h2>Plant not found</h2>
        <p>The plant you're looking for doesn't exist in your collection.</p>
      </div>
    );
  }

  const handleWaterPlant = () => {
    waterPlant(plant.id);
  };

  return (
    <div className="plant-details-container">
      <div className="plant-header">
        <h1>{plant.name}</h1>
        <button onClick={handleWaterPlant} className="water-btn">
          Water Now
        </button>
      </div>

      <div className="plant-content">
        <div className="plant-meta">
          <h2>{plant.species}</h2>
          <WateringProgress plant={plant} />
        </div>

        <div className="care-details">
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

          {plant.notes && (
            <div className="detail-section">
              <h3>Your Notes</h3>
              <p className="plant-notes">{plant.notes}</p>
            </div>
          )}

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