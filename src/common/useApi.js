// useApi.js
import { useState } from 'react';
import { useLoader } from './LoaderContext'; // Import the loader context

const useApi = () => {
  const { setLoading } = useLoader(); // Access setLoading from context
  const [data, setData] = useState(null); // State to store API data
  const [error, setError] = useState(null); // State to store errors

  // Function to make API requests
  const fetchApi = async (url, options = {}) => {
    setLoading(true); // Show loader before API call starts
    try {
      const response = await fetch(url, options);
      const result = await response.json(); // Parse the response to JSON
      setData(result); // Store the data in state
      setError(null); // Reset any previous errors
    } catch (err) {
      setError(err); // Handle any errors
    } finally {
      setLoading(false); // Hide the loader once the API call is complete
    }
  };

  return { data, error, fetchApi }; // Return data, error, and the fetchApi function
};

export default useApi;
