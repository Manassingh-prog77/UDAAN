// services/legalApi.js

const API_BASE_URL = 'https://satark-ai-f0xr.onrender.com';

const legalApiService = {

  //Legal knowledge
  async searchLegalKnowledge(query) {
    try {
      const response = await fetch(`${API_BASE_URL}/qa`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: query }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch legal knowledge');
      }

      const data = await response.json();
      // Save the query to search history
      this.saveSearchHistory(query, data);
      // Transform the API response to match the expected format
      return {
        summary: data.answer || '',
        relevantLaws: data.laws ? data.laws.map(law => ({
          title: law.section || '',
          description: law.description || ''
        })) : [],
        casePrecedents: data.precedents ? data.precedents.map(precedent => ({
          title: precedent.case || '',
          description: precedent.summary || '',
          court: precedent.court || '',
          date: precedent.date || ''
        })) : [],
        references: data.sources || []
      };
    } catch (error) {
      console.error('Legal Knowledge Search Error:', error);
      throw error;
    }
  },

  async saveSearchHistory(query, results) {
    try {
      // Store search history in localStorage as a temporary solution
      // In a production environment, this would call your server API
      const history = JSON.parse(localStorage.getItem('legalSearchHistory') || '[]');
      const newEntry = {
        _id: Date.now().toString(),
        query,
        timestamp: new Date().toISOString(),
        results
      };
      history.unshift(newEntry);
      // Keep only the last 10 searches
      if (history.length > 10) {
        history.pop();
      }
      localStorage.setItem('legalSearchHistory', JSON.stringify(history));
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  },

  async getSearchHistory() {
    try {
      // In a production environment, this would fetch from your server API
      const history = JSON.parse(localStorage.getItem('legalSearchHistory') || '[]');
      return history;
    } catch (error) {
      console.error('Error getting search history:', error);
      return [];
    }
  },

  async getSearchDetails(historyId) {
    try {
      const history = JSON.parse(localStorage.getItem('legalSearchHistory') || '[]');
      const item = history.find(entry => entry._id === historyId);
      if (!item) {
        throw new Error('Search history item not found');
      }
      return {
        query: item.query,
        results: {
          summary: item.results.answer || '',
          relevantLaws: item.results.laws ? item.results.laws.map(law => ({
            title: law.section || '',
            description: law.description || ''
          })) : [],
          casePrecedents: item.results.precedents ? item.results.precedents.map(precedent => ({
            title: precedent.case || '',
            description: precedent.summary || '',
            court: precedent.court || '',
            date: precedent.date || ''
          })) : [],
          references: item.results.sources || []
        }
      };
    } catch (error) {
      console.error('Error getting search details:', error);
      throw error;
    }
  },

  //Legal Consultancy
  async submitLegalQuery(query, filters = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ query, filters }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to process legal query');
      }

      const data = await response.json();

      return {
        _id: data._id,
        query: data.query,
        answer: data.answer,
        sources: data.sources || [],  // Ensuring sources is always an array
        confidence: data.confidence || null,
        timestamp: data.timestamp
      };
    } catch (error) {
      console.error('Legal Query Error:', error);
      throw error;
    }
  },
};

export default legalApiService;
