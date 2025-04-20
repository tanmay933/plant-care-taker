import { createContext, useContext, useState, useEffect } from 'react';

   // Create a context to hold plant-related  data ane actions
const PlantContext = createContext();

// Provider component that wraps around parts of the  app that need plant data
export const PlantProvider = ({ children }) => {
   const [myPlants, setMyPlants] = useState([]);         // List of plants user has added
 const [loading, setLoading] = useState(true);    // Loading state to show while initializing
   const [error, setError] = useState(null);          // To handle any localStorage read/write issues
                       
  // Load plants from localStorage when the app starts
  useEffect(() => {
    try {
      const saved = localStorage.getItem('myPlants');
     setMyPlants(saved ? JSON.parse(saved) : []);
    } catch (err) {
       setError('Failed to load plant data');
     console.error('LocalStorage read error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save the updated list of plants to localStorage
  const saveToLocalStorage = (plants) => {
    try {
      localStorage.setItem('myPlants', JSON.stringify(plants));
    } catch (err) {
      setError('Failed to save plant data');
      console.error('LocalStorage write error:', err);
    }
  };

  // Add a new plant to the list
  const addPlant = (plant) => {
    const newPlant = { 
      ...plant,
      id: Date.now(), // Unique ID based on timestamp
      lastWatered: new Date().toISOString(),
      nextWatering: calculateNextWatering(plant.wateringFrequency)
    };
                  
    const updatedPlants = [...myPlants, newPlant];
    setMyPlants(updatedPlants);
    saveToLocalStorage(updatedPlants);
  };

  // Mark a plant as watered and update its next watering date
  const waterPlant = (plantId) => {
     const updatedPlants = myPlants.map(plant => {
       if (plant.id === plantId) {
        return { 
          ...plant, 
          lastWatered: new Date().toISOString(),
          nextWatering: calculateNextWatering(plant.wateringFrequency)
        };
      }
      return plant;
    });

    setMyPlants(updatedPlants);
     saveToLocalStorage(updatedPlants);
  };

  // Calculates the next watering date based on frequency
  const calculateNextWatering = (frequency) => {
      const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + parseInt(frequency));
     return nextDate.toISOString();
  };

  return (
    <PlantContext.Provider value={{ 
      myPlants, 
      addPlant, 
      waterPlant,
      loading,
      error
    }}>
      {children}
    </PlantContext.Provider>
  );
};

// Custom hook to use the PlantContext safely
export const usePlants = () => {
    const context = useContext(PlantContext);
  
  if (context === undefined) {
   throw new Error('usePlants must be used within a PlantProvider');
  }

  return context;
};
