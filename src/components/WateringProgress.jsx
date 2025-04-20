import { useEffect, useState } from 'react';
 import PropTypes from 'prop-types';
import './WateringProgress.css';

const WateringProgress = ({ plant }) => {
  const [daysRemaining, setDaysRemaining] = useState(0);
   const [status, setStatus] = useState('ok');

  useEffect(() => {
    if (!plant?.lastWatered || !plant?.wateringFrequency) return;

    const calculateStatus = () => {
      const lastWateredDate = new Date(plant.lastWatered);
       const today = new Date();
      const diffTime = today - lastWateredDate;
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
       const remaining = plant.wateringFrequency - diffDays;
      
      setDaysRemaining(remaining);
      
      if (remaining <= 0) {
        setStatus ('due');
      } else if (remaining <= 2) {
        setStatus('soon');
      } else {
       setStatus('ok');
      }
    };

      calculateStatus();
  }, [plant]);

  const getStatusMessage = () => {
     if (!plant?.lastWatered) return 'Watering schedule not set';

    switch (status) {
       case 'due':
        return 'Water due now!';
     case 'soon':
        return `Water in ${daysRemaining} day${daysRemaining !== 1 ? 's' : ''}`;
      default:
         return `Water in ${daysRemaining} day${daysRemaining !== 1 ? 's' : ''}`;
    }
  };

  const getProgressPercentage = () => {
     if (!plant?.wateringFrequency || daysRemaining <= 0) return 100;
    return Math.max(0, 100 - (daysRemaining / plant.wateringFrequency) * 100);
  };

  return (
    <div className="watering-progress">
       <div className="progress-bar-container">
         <div
          className={`progress-bar ${status}`}
          style={{ width: `${getProgressPercentage()}%` }}
        />
      </div>
      <div className={`watering-status ${status}`}>
        <span>{getStatusMessage()}</span>
        {plant?.lastWatered && (
          <span>Last watered: {new Date (plant.lastWatered).toLocaleDateString()}</span>
        )}
      </div>
    </div>
  );
};

WateringProgress.propTypes = {
  plant: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    lastWatered: PropTypes.string,
    wateringFrequency: PropTypes.number,
    sunlight: PropTypes.string,
    species: PropTypes.string,
    notes: PropTypes.string,
    default_image: PropTypes.shape({
      thumbnail: PropTypes.string
    })
  }).isRequired
};

   export default WateringProgress;