import { Link } from 'react-router-dom'

const PlantCard = ({ plant }) => {
  return (
    <div className="plant-card">
       <Link to={`/plant/${plant.id}`}>
        <h3>{plant.common_name || plant.name || 'Unknown Plant'}</h3>
         {plant.default_image?.thumbnail ? (
          <img src= {plant.default_image.thumbnail} alt={plant.common_name} />
        ) : (
          <div className="plant-image-placeholder">🌱</div>
        )}
         <div className="plant-info">
           <p>💧 {plant.watering || 'Water: Moderate'}</p>
          <p>☀️  {plant.sunlight?.[0] || 'Light: Partial sun'}</p>
         </div>
      </Link>
    </div>
  )
}

export default PlantCard