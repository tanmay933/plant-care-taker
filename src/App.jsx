import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { PlantProvider } from './context/PlantContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Search from './pages/Search'
import AddPlant from './pages/AddPlant'
import PlantDetails from './pages/PlantDetails'
import './styles/App.css'

function App() {
  return (
    <PlantProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/add" element={<AddPlant />} />
          <Route path="/plant/:id" element={<PlantDetails />} />
        </Routes>
      </Router>
    </PlantProvider>
  )
}

export default App