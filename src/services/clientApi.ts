
import { api as adminApi } from '../admin/services/api';

/**
 * Client-side API wrapper for the website's frontend
 * This can be easily replaced with real API endpoints later
 */
export const clientApi = {
  // Names related endpoints
  names: {
    // Get all names with filtering and pagination
    getAllNames: async (params = {}) => {
      return adminApi.names.getAll(params);
    },
    
    // Get a single name by ID
    getNameById: async (id) => {
      return adminApi.names.getById(id);
    },
    
    // Get boy names
    getBoyNames: async (params = {}) => {
      return adminApi.names.getAll({ ...params, gender: 'boy' });
    },
    
    // Get girl names
    getGirlNames: async (params = {}) => {
      return adminApi.names.getAll({ ...params, gender: 'girl' });
    },
    
    // Get unisex names
    getUnisexNames: async (params = {}) => {
      return adminApi.names.getAll({ ...params, gender: 'unisex' });
    },
    
    // Get names by category (origin, religion, language)
    getNamesByCategory: async (categoryType, categoryId, params = {}) => {
      const filter = {};
      if (categoryType === 'country') filter.origin = categoryId;
      if (categoryType === 'religion') filter.religion = categoryId;
      if (categoryType === 'language') filter.language = categoryId;
      
      return adminApi.names.getAll({ ...params, ...filter });
    },
    
    // Get trending names
    getTrendingNames: async (limit = 10) => {
      return adminApi.names.getAll({ 
        sortBy: 'popularity-desc',
        limit
      });
    },
    
    // Get unique names
    getUniqueNames: async (params = {}) => {
      // This would have more complex logic in a real API
      return adminApi.names.getAll(params);
    }
  },
  
  // Categories related endpoints
  categories: {
    // Get all categories
    getAllCategories: async () => {
      return adminApi.categories.getAll();
    },
    
    // Get categories by type
    getCategoriesByType: async (type) => {
      return adminApi.categories.getAll({ type });
    }
  },
  
  // Content related endpoints
  content: {
    // Get page content by slug
    getPageContent: async (slug) => {
      return adminApi.pageContent.getBySlug(slug);
    },
    
    // Get all FAQs
    getFAQs: async (params = {}) => {
      return adminApi.faqs.getAll(params);
    }
  },
  
  // User related endpoints (for frontend users, not admin users)
  user: {
    // Add name to favorites
    addFavorite: async (nameId) => {
      // In a real API, this would be tied to the user's account
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      if (!favorites.includes(nameId)) {
        favorites.push(nameId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
      }
      return { success: true, message: 'Name added to favorites' };
    },
    
    // Remove name from favorites
    removeFavorite: async (nameId) => {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const updated = favorites.filter(id => id !== nameId);
      localStorage.setItem('favorites', JSON.stringify(updated));
      return { success: true, message: 'Name removed from favorites' };
    },
    
    // Get all favorites
    getFavorites: async () => {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const promises = favorites.map(id => adminApi.names.getById(id));
      try {
        const results = await Promise.all(promises);
        return { 
          success: true, 
          data: results.map(r => r.data),
          meta: {
            total: results.length,
            page: 1,
            limit: results.length,
            totalPages: 1
          }
        };
      } catch (error) {
        console.error('Error fetching favorites:', error);
        return { 
          success: true, 
          data: [],
          meta: {
            total: 0,
            page: 1,
            limit: 0,
            totalPages: 0
          }
        };
      }
    }
  },
  
  // Utility endpoints
  utils: {
    // Generate name combinations
    generateNameCombinations: async (firstName, secondName) => {
      // Simple name combination logic
      if (!firstName || !secondName) {
        return { success: false, message: "Both names are required" };
      }
      
      const first = firstName.trim();
      const second = secondName.trim();
      
      const firstHalf = first.substring(0, Math.ceil(first.length / 2));
      const secondHalf = second.substring(Math.floor(second.length / 2));
      
      const firstPart = first.substring(0, 2);
      const secondPart = second.substring(0, 2);
      
      const secondFirstPart = second.substring(0, 2);
      const firstLastPart = first.substring(first.length - 2);
      
      // Generate various combinations
      const combinations = [
        firstHalf + secondHalf,
        secondHalf + firstHalf,
        firstPart + second.toLowerCase(),
        secondPart + first.toLowerCase(),
        first + secondFirstPart.toLowerCase(),
        secondFirstPart + firstLastPart,
        first.charAt(0) + second,
        second.charAt(0) + first,
      ].filter(name => name.length >= 3 && name.length <= 12);
      
      // Ensure unique names and proper capitalization
      const uniqueNames = [...new Set(combinations)].map(
        name => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
      );
      
      return { 
        success: true, 
        data: uniqueNames,
        message: `Created ${uniqueNames.length} unique name combinations.`
      };
    },
    
    // Check name compatibility
    checkNameCompatibility: async (firstName, secondName) => {
      if (!firstName || !secondName) {
        return { success: false, message: "Both names are required" };
      }
      
      // Simple compatibility algorithm for demo purposes
      const first = firstName.trim().toLowerCase();
      const second = secondName.trim().toLowerCase();
      
      // Phonetic similarity (starting with same letter is less compatible)
      const phoneticScore = first.charAt(0) === second.charAt(0) ? 60 : 90;
      
      // Length compatibility (similar lengths are more compatible)
      const lengthDiff = Math.abs(first.length - second.length);
      const lengthScore = lengthDiff <= 2 ? 90 : lengthDiff <= 4 ? 75 : 60;
      
      // Vowel/consonant balance
      const firstVowels = (first.match(/[aeiou]/gi) || []).length / first.length;
      const secondVowels = (second.match(/[aeiou]/gi) || []).length / second.length;
      const vowelDiff = Math.abs(firstVowels - secondVowels);
      const vowelScore = vowelDiff < 0.2 ? 85 : vowelDiff < 0.4 ? 70 : 60;
      
      // Syllable comparison
      const syllableScore = Math.random() * 30 + 60; // Random for this demo
      
      // Calculate overall compatibility
      const overallScore = Math.round((phoneticScore + lengthScore + vowelScore + syllableScore) / 4);
      
      // Generate feedback
      let feedback = "";
      let compatibility = "";
      
      if (overallScore >= 85) {
        feedback = "These names sound harmonious together and have a great flow!";
        compatibility = "Excellent";
      } else if (overallScore >= 75) {
        feedback = "These names work well together with good balance and rhythm.";
        compatibility = "Good";
      } else if (overallScore >= 65) {
        feedback = "These names have some compatible elements but also some minor clashes.";
        compatibility = "Fair";
      } else {
        feedback = "These names might create some confusion or be difficult to use together.";
        compatibility = "Poor";
      }
      
      return {
        success: true,
        data: {
          overallScore,
          compatibility,
          feedback,
          details: [
            { name: "Phonetic Harmony", score: phoneticScore },
            { name: "Length Balance", score: lengthScore },
            { name: "Vowel/Consonant Balance", score: vowelScore },
            { name: "Syllable Flow", score: syllableScore }
          ]
        }
      };
    }
  }
};

export default clientApi;
