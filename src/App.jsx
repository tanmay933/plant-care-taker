  // Import required dependencies
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { PlantProvider } from './context/PlantContext' // Context provider for plant data
 import Navbar from './components/Navbar' // Navigation component
import Home from './pages/Home' // Home page component
 import Search from './pages/Search' // Search page component
import AddPlant from './pages/AddPlant' // Add plant page component
 import PlantDetails from './pages/PlantDetails' // Plant details page component
import './styles/App.css' // Global styles

// Main App component
function App() {
  return (
    // Wrap the entire app with PlantProvider to make plant data available globally
    <PlantProvider>
      {/* Set up React Router for client-side navigation */}
      <Router>
        {/* Navigation bar that appears on all pages */}
        <Navbar />
        
        {/* Route configuration - defines which component to show for each path */}
        <Routes>
          {/* Home page route (default path) */}
          <Route path="/" element={<Home />} />
          
          {/* Search page route */}
          <Route path="/search" element={<Search />} />
          
          {/* Add new plant page route */}
          <Route path="/add" element={<AddPlant />} />
          
          {/* Plant details page route with dynamic ID parameter */}
          <Route path="/plant/:id" element={<PlantDetails />} />
        </Routes>
      </Router>
    </PlantProvider>
  )
}

export default App