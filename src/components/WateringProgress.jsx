import  { useEffect, useState }  from 'react';
import   PropTypes from 'prop-types';
import  './WateringProgress.css';

const WateringProgress  = ( { plant }) => {
  const[daysRemaining, setDaysRemaining] = useState(0); // Tracks how many days are left until next watering
  const  [status, setStatus] = useState('ok'); // Tracks the urgency status: 'ok', 'soon', or 'due'

  useEffect(() => {
    // Exit early if essential plant data is missing
    if (!plant?.lastWatered || !plant?.wateringFrequency) return;

    const calculateStatus = () => {
      const lastWateredDate = new Date (plant.lastWatered);
      const today = new Date();

      // Calculate how many days have passed since last watering
      const diffTime =today - lastWateredDate;
      const diffDays =  Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const remaining = plant.wateringFrequency - diffDays;

      setDaysRemaining(remaining);

      // Determine the current watering status based on days remaining
      if (remaining <= 0) {
        setStatus( 'due'); // Needs immediate watering
      } else if (remaining <= 2) {
        setStatus('soon' ); // Watering due soon
      } else {
        setStatus('ok'); // Watering is on schedule
      }
    };

    calculateStatus();
  }, [plant]);

  // Returns a human-readable message based on current watering status
  const getStatusMessage = () => {
    if (!plant?.lastWatered) return 'Watering schedule not set';

    switch (status) {
      case 'due':
        return 'Water due now!';
      case 'soon':
        return `Water in ${daysRemaining} day${daysRemaining !== 1 ? 's'  : ''}`;
      default:
        return `Water in ${daysRemaining} day${daysRemaining !== 1 ? 's': ''}`;
    }
  };

  // Calculates percentage to display in the progress bar
  const getProgressPercentage = () => {
    if (!plant?.wateringFrequency || daysRemaining <= 0) return 100;
    return Math.max(0, 100 - (daysRemaining / plant.wateringFrequency) * 100);
  };

  return (
    <div className ="watering-progress">
      <div className= "progress-bar-container">
        <div
          className={`progress-bar ${status}`}
          style ={{ width: `${getProgressPercentage()}%` }}
        />
      </div>
      <div className= {`watering-status ${status}`}>
        <span>{getStatusMessage()}</span>
        {plant?.lastWatered && (
          <span>Last watered: {new Date (plant.lastWatered).toLocaleDateString()} </span>
        )}
      </div>
    </div>
  );
};
        
// Typechecking the expected shape of the plant   prop for safety and clarity
WateringProgress.propTypes = {
  plant: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    lastWatered: PropTypes.string, // ISO  datestring
     wateringFrequency: PropTypes.number, // Number of days  between waterings
    sunlight: PropTypes.string,
    species: PropTypes.string,
     notes: PropTypes.string,
    default_image: PropTypes.shape({
        thumbnail: PropTypes.string
    })
  }).isRequired
};
             
export  default WateringProgress;
