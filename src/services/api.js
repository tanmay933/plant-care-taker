export const searchPlants = async (query) => {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const PLANT_API_KEY = import.meta.env.VITE_PLANT_API_KEY;
  
    if (!query.trim()) return { data: [] };
  
    try {
      const response = await fetch(
        `${API_BASE_URL}/species-list?key=${PLANT_API_KEY}&q=${encodeURIComponent(query)}`
      );
  
      const contentType = response.headers.get('Content-Type');
      console.log('Response Content-Type:', contentType);
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response body:', errorText);
        return { data: [], error: `API returned status ${response.status}` };
      }
  
      if (!contentType || !contentType.includes('application/json')) {
        const html = await response.text();
        console.error('Received HTML instead of JSON:', html);
        return { data: [], error: 'Invalid response format from API (HTML instead of JSON)' };
      }
  
      const json = await response.json();
      return Array.isArray(json.data) ? { data: json.data } : { data: [] };
    } catch (error) {
      console.error('API Error:', error.message);
      return { data: [], error: error.message };
    }
  };
  