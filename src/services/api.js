export const searchPlants = async (query) => {
    const API_BASE_URL = 'https://perenual.com/api';
    const PLANT_API_KEY = 'sk-BL9s6804849e2bf979907'; // API key for accessing Perenual plant data

    // Don't proceed if the query is empty or just spaces
     if (!query.trim()) return { data: [] };

    try {
      // Call the API with encoded query to handle spaces/special characters
      const response = await fetch(
         `${API_BASE_URL}/species-list?key=${PLANT_API_KEY}&q=${encodeURIComponent(query)}`
      );

      // Grab the content type to make sure we’re not getting HTML or junk
      const contentType = response.headers.get('Content-Type');
       console.log('Response Content-Type:', contentType); // Debug info

      // If the response isn't OK (e.g., 404, 500), show the error
      if (!response.ok) {
        const errorText = await response.text(); // Try to read the error message
        console.error('Error response body:', errorText);
        return { data: [], error: `API returned status ${response.status}` };
      }

      // Check if we're accidentally receiving HTML instead of JSON
      if (!contentType || !contentType.includes('application/json')) {
        const html = await response.text();
        console.error('Received HTML instead of JSON:', html); // Could be due to incorrect endpoint or expired API key
        return { data: [], error: 'Invalid response format from API (HTML instead of JSON)' };
      }
  
      // Convert the JSON response to an object
        const json = await response.json();
                                    
      // If the data field is an array, return it; otherwise return empty
     return Array.isArray(json.data) ? { data: json.data } : { data: [] };
  
    } catch (error) {
      // Catch any unexpected issues like network errors
      console.error('API Error:', error.message);
       return { data: [], error: error.message };
    }
  };

