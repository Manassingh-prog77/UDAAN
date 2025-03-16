// services/legalApi.js

const BASE_URL = 'https://satark-ai-f0xr.onrender.com';

const engineApiService = {
  submitInvestigationQuery: async (question) => {
    try {
      const response = await fetch(`${BASE_URL}/investigation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        answer: data.answer || data.response, // Handle potential response structure variations
        sources: data.sources || [],
        confidence: data.confidence,
        query: question
      };
    } catch (error) {
      console.error('Error in submitInvestigationQuery:', error);
      throw new Error('Failed to get response from the legal AI service');
    }
  },

  getLegalQAHistory: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return [];
      }

      const response = await fetch(`${BASE_URL}/history`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching QA history:', error);
      return [];
    }
  },

  getLegalQADetails: async (historyId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${BASE_URL}/history/${historyId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching QA details:', error);
      throw error;
    }
  }
};

export default engineApiService;