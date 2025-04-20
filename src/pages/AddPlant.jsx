import { useState } from 'react';
  import { usePlants } from '../context/PlantContext';
 import { useNavigate } from 'react-router-dom';
   import './AddPlant.css';

const AddPlant = () => {
   const { addPlant } = usePlants();
 const navigate = useNavigate();

  // Local state to hold form input values
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    wateringFrequency: '7',
    sunlight: 'partial',
    notes: '',
    lastWatered: new Date().toISOString()
  });

  // Holds any validation error messages
   const [errors, setErrors] = useState({});

  // Updates formData state on input change
  const handleChange = (e) => {
     const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Basic form validation before submission
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
       newErrors.name = 'Plant name is required';
    }

    if (!formData.species.trim()) {
        newErrors.species = 'Species is required';
    }

    if (isNaN(formData.wateringFrequency) || formData.wateringFrequency < 1) {
       newErrors.wateringFrequency = 'Must be a number (minimum 1)';
    }

    setErrors(newErrors);

    //      Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  // Handle  form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      addPlant({
        ...formData,
        wateringFrequency: parseInt(formData.wateringFrequency),
        id: Date.now() // Quick and  simple unique ID
      });

      navigate('/'); // Go back to home after adding  plant
    }
  };

  return (
    <div className="add-plant-container">
      <h1>Add New Plant</h1>

    <form onSubmit={handleSubmit} className="plant-form">

        {/* Plant Name Field */}
        <div className="form-group">
          <label htmlFor="name">Plant Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        {/* Species Field */}
        <div className="form-group">
          <label htmlFor="species">Species *</label>
          <input
            type="text"
            id="species"
            name="species"
            value={formData.species}
            onChange={handleChange}
            className={errors.species ? 'error' : ''}
          />
          {errors.species && <span className="error-message">{errors.species}</span>}
        </div>

        {/* Watering Frequency Field */}
        <div className="form-group">
          <label htmlFor="wateringFrequency">Watering Frequency (days) *</label>
          <input
            type="number"
            id="wateringFrequency"
            name="wateringFrequency"
            min="1"
            value={formData.wateringFrequency}
            onChange={handleChange}
            className={errors.wateringFrequency ? 'error' : ''}
          />
          {errors.wateringFrequency && (
            <span className="error-message">{errors.wateringFrequency}</span>
          )}
        </div>
          
        {/* Sunlight Requirement Field */}
        <div className="form-group">
          <label htmlFor="sunlight">Sunlight Requirements</label>
          <select
            id="sunlight"
            name="sunlight"
            value={formData.sunlight}
            onChange={handleChange}
          >
            <option value="full">Full Sun</option>
             <option value="partial">Partial Sun</option>
            <option value="shade">Shade</option>
          </select>
        </div>

        {/* Care Notes Field */}
        <div className="form-group">
          <label htmlFor="notes">Care Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="4"
          />
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button type="submit" className="submit-btn">
             Add Plant
          </button>
        </div>
        
      </form>
    </div>
  );
};

export default AddPlant;
