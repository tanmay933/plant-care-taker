import { useState } from 'react'
              
const PlantForm = ({ initialData = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    species: initialData.species || '',
    wateringFrequency: initialData.wateringFrequency || '7',
    sunlight: initialData.sunlight || 'partial',
    notes: initialData.notes || ''
  })
    const [errors, setErrors] = useState({})

  const handleChange = (e)=>  {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const validateForm = ()  =>{
    const newErrors = {}
    if (!formData.name.trim())  newErrors.name = 'Plant name is required'
    if  (!formData.species.trim()) newErrors.species = 'Species is required'
    if(isNaN(formData.wateringFrequency) || formData.wateringFrequency < 1) {
      newErrors.wateringFrequency = 'Enter a valid number (minimum 1)'
    }
    setErrors(newErrors)
     return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
      e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="plant-form">
      <div className="form-group">
        <label htmlFor="name">Plant Name *</label>
        <input
        type="text"
          id="name"
           name="name"
          value={formData.name}
          onChange={handleChange}
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
        />
        {errors.name && <div className="error-message">{errors.name}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="species">Species *</label>
        <input
          type="text"
           id="species"
          name="species"
           value={formData.species}
          onChange={handleChange}
          className={`form-control ${errors.species ? 'is-invalid' : ''}`}
        />
        {errors.species && <div className="error-message">{errors.species}</div>}
      </div>
   
      <div className="form-group">
        <label htmlFor="wateringFrequency">Watering Frequency (days) *</label>
        <input
          type="number"
           id="wateringFrequency"
          name="wateringFrequency"
         min="1"
          value={formData.wateringFrequency}
          onChange={handleChange}
          className={`form-control ${errors.wateringFrequency ? 'is-invalid' : ''}`}
        />
        {errors.wateringFrequency && (
        <div className="error-message">{errors.wateringFrequency}</div>
        )}
      </div>
         
      <div className="form-group">
        <label htmlFor="sunlight">Sunlight Requirements</label>
        <select
           id="sunlight"
          name="sunlight"
        value={formData.sunlight}
          onChange={handleChange}
           className="form-control"
        >
          <option value="full">Full Sun</option>
           <option value="partial">Partial Sun</option>
          <option value="shade">Shade</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notes</label>
        <textarea
           id="notes"
          name="notes"
         value={formData.notes}
           onChange={handleChange}
        className="form-control"
          rows="3"
        />
      </div>

      <button type="submit" className="button">
         Save Plant
      </button>
    </form>
  )
}

   export default PlantForm