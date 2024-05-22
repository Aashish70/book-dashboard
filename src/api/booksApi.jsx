import axios from 'axios';

// Function to fetch books from the API
export const fetchBooks = async () => {
  try {
    const response = await axios.get('https://openlibrary.org/search.json', {
      params: {
        page: 1,
        limit: 10
      }
      
    });
    
    // Return the response data
    return response.data;
  } catch (error) {
    // If an error occurs, log the error and rethrow it
    console.error('Error fetching books:', error);
    throw error;
  }
};

