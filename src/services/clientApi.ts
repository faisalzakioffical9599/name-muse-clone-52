import { supabase } from '@/integrations/supabase/client';
import { 
  Name, 
  Category, 
  ContentPage, 
  Faq, 
  NameWithDetails, 
  Favorite 
} from '../types/supabaseTypes';

// Define a type for category parameters
interface CategoryParams {
  origin?: string;
  religion?: string;
  language?: string;
  [key: string]: any;
}

// Define response type
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Define parameters interface for queries
interface QueryParams {
  page?: number;
  limit?: number;
  gender?: string;
  origin?: string;
  religion?: string;
  language?: string;
  search?: string;
  sortBy?: string;
  category?: string;
  [key: string]: any;
}

/**
 * Client-side API wrapper for the website's frontend
 * This can be easily replaced with real API endpoints later
 */
export const clientApi = {
  // Names related endpoints
  names: {
    // Get all names with filtering and pagination
    getAllNames: async (params: QueryParams = {}): Promise<ApiResponse<Name[]>> => {
      try {
        let query = supabase.from('names').select('*');
        
        // Apply filters
        if (params.gender) query = query.eq('gender', params.gender);
        if (params.origin) query = query.eq('origin', params.origin);
        if (params.religion) query = query.eq('religion', params.religion);
        if (params.language) query = query.eq('language', params.language);
        if (params.search) query = query.ilike('name', `%${params.search}%`);
        
        // Apply pagination
        const page = Number(params.page) || 1;
        const limit = Number(params.limit) || 10;
        const start = (page - 1) * limit;
        query = query.range(start, start + limit - 1);
        
        // Apply sorting
        if (params.sortBy) {
          const [field, order] = params.sortBy.split('-');
          query = query.order(field, { ascending: order !== 'desc' });
        }
        
        // Execute query with properly handled parameters
        const { data, error, count } = await query;
        
        if (error) throw error;
        
        const total = count || 0;
        const totalPages = Math.ceil(total / limit);
        
        // Ensure we cast the gender field to the correct type
        const typedData = data?.map(item => ({
          ...item,
          gender: item.gender as "boy" | "girl" | "unisex"
        })) as Name[];
        
        return {
          success: true,
          data: typedData,
          meta: {
            total,
            page,
            limit,
            totalPages
          }
        };
      } catch (error) {
        console.error("Error getting names:", error);
        return {
          success: false,
          message: "Failed to fetch names",
          data: [],
          meta: {
            total: 0,
            page: 1,
            limit: 10,
            totalPages: 0
          }
        };
      }
    },
    
    // Get a single name by ID
    getNameById: async (id: string): Promise<ApiResponse<NameWithDetails>> => {
      try {
        // Get the main name data
        const { data: nameData, error: nameError } = await supabase
          .from('names')
          .select('*')
          .eq('id', id)
          .single();
        
        if (nameError) throw nameError;
        
        // Cast gender to the correct type
        const typedNameData = {
          ...nameData,
          gender: nameData.gender as "boy" | "girl" | "unisex"
        } as Name;
        
        // Get additional details
        const { data: additionalDetails, error: detailsError } = await supabase
          .from('name_additional_details')
          .select('*')
          .eq('name_id', id)
          .maybeSingle();
        
        // Get variations
        const { data: variations, error: variationsError } = await supabase
          .from('name_variations')
          .select('*')
          .eq('name_id', id);
        
        // Get personality traits
        const { data: personalityTraits, error: traitsError } = await supabase
          .from('name_personality_traits')
          .select('*')
          .eq('name_id', id);
        
        // Get famous people
        const { data: famousPeople, error: peopleError } = await supabase
          .from('name_famous_people')
          .select('*')
          .eq('name_id', id);
        
        // Get FAQs
        const { data: faqs, error: faqsError } = await supabase
          .from('name_faqs')
          .select('*')
          .eq('name_id', id);
        
        // Get SEO
        const { data: seo, error: seoError } = await supabase
          .from('name_seo')
          .select('*')
          .eq('name_id', id)
          .maybeSingle();
        
        const nameWithDetails: NameWithDetails = {
          ...typedNameData,
          additionalDetails: additionalDetails || null,
          variations: variations || [],
          personalityTraits: personalityTraits || [],
          famousPeople: famousPeople || [],
          faqs: faqs || [],
          seo: seo || null
        };
        
        return {
          success: true,
          data: nameWithDetails
        };
      } catch (error) {
        console.error("Error getting name by ID:", error);
        return {
          success: false,
          message: "Failed to fetch name details"
        };
      }
    },
    
    // Get boy names
    getBoyNames: async (params: QueryParams = {}) => {
      return clientApi.names.getAllNames({ ...params, gender: 'boy' });
    },
    
    // Get girl names
    getGirlNames: async (params: QueryParams = {}) => {
      return clientApi.names.getAllNames({ ...params, gender: 'girl' });
    },
    
    // Get unisex names
    getUnisexNames: async (params: QueryParams = {}) => {
      return clientApi.names.getAllNames({ ...params, gender: 'unisex' });
    },
    
    // Get names by category (origin, religion, language)
    getNamesByCategory: async (categoryType: string, categoryId: string, params: QueryParams = {}) => {
      const filter: CategoryParams = {};
      if (categoryType === 'country') filter.origin = categoryId;
      if (categoryType === 'religion') filter.religion = categoryId;
      if (categoryType === 'language') filter.language = categoryId;
      
      return clientApi.names.getAllNames({ ...params, ...filter });
    },
    
    // Get trending names
    getTrendingNames: async (limit = 10) => {
      return clientApi.names.getAllNames({ 
        sortBy: 'popularity-desc',
        limit
      });
    },
    
    // Get unique names
    getUniqueNames: async (params: QueryParams = {}) => {
      // This would have more complex logic in a real API
      return clientApi.names.getAllNames(params);
    }
  },
  
  // Categories related endpoints
  categories: {
    // Get all categories
    getAllCategories: async (): Promise<ApiResponse<Category[]>> => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*');
        
        if (error) throw error;
        
        // Ensure we cast the type field to the correct type
        const typedData = data?.map(item => ({
          ...item,
          type: item.type as "country" | "religion" | "language"
        })) as Category[];
        
        return {
          success: true,
          data: typedData
        };
      } catch (error) {
        console.error("Error getting categories:", error);
        return {
          success: false,
          message: "Failed to fetch categories",
          data: []
        };
      }
    },
    
    // Get categories by type
    getCategoriesByType: async (type: string): Promise<ApiResponse<Category[]>> => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .eq('type', type);
        
        if (error) throw error;
        
        // Ensure we cast the type field to the correct type
        const typedData = data?.map(item => ({
          ...item,
          type: item.type as "country" | "religion" | "language"
        })) as Category[];
        
        return {
          success: true,
          data: typedData
        };
      } catch (error) {
        console.error("Error getting categories by type:", error);
        return {
          success: false,
          message: "Failed to fetch categories",
          data: []
        };
      }
    }
  },
  
  // Content related endpoints
  content: {
    // Get page content by slug
    getPageContent: async (slug: string): Promise<ApiResponse<ContentPage>> => {
      try {
        const { data, error } = await supabase
          .from('content_pages')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();
        
        if (error) throw error;
        
        if (!data) {
          return {
            success: false,
            message: "Page not found"
          };
        }
        
        return {
          success: true,
          data: data as ContentPage
        };
      } catch (error) {
        console.error("Error getting page content:", error);
        return {
          success: false,
          message: "Failed to fetch page content"
        };
      }
    },
    
    // Get all FAQs
    getFAQs: async (params: QueryParams = {}): Promise<ApiResponse<Faq[]>> => {
      try {
        let query = supabase.from('faqs').select('*');
        
        if (params.category) query = query.eq('category', params.category);
        
        const { data, error } = await query.order('priority', { ascending: false });
        
        if (error) throw error;
        
        return {
          success: true,
          data: data as Faq[]
        };
      } catch (error) {
        console.error("Error getting FAQs:", error);
        return {
          success: false,
          message: "Failed to fetch FAQs",
          data: []
        };
      }
    }
  },
  
  // User related endpoints (for frontend users, not admin users)
  user: {
    // Add name to favorites
    addFavorite: async (nameId: string): Promise<ApiResponse<Favorite>> => {
      try {
        const { data: session } = await supabase.auth.getSession();
        
        if (!session.session) {
          return {
            success: false,
            message: "You must be logged in to add favorites"
          };
        }
        
        const userId = session.session.user.id;
        
        const { data, error } = await supabase
          .from('favorites')
          .insert([{ user_id: userId, name_id: nameId }])
          .select()
          .single();
        
        if (error) {
          // Check if it's a unique constraint error (already a favorite)
          if (error.code === '23505') {
            return {
              success: true,
              message: "Name is already in favorites"
            };
          }
          throw error;
        }
        
        return {
          success: true,
          data: data as Favorite,
          message: "Name added to favorites"
        };
      } catch (error) {
        console.error("Error adding favorite:", error);
        return {
          success: false,
          message: "Failed to add to favorites"
        };
      }
    },
    
    // Remove name from favorites
    removeFavorite: async (nameId: string): Promise<ApiResponse<void>> => {
      try {
        const { data: session } = await supabase.auth.getSession();
        
        if (!session.session) {
          return {
            success: false,
            message: "You must be logged in to remove favorites"
          };
        }
        
        const userId = session.session.user.id;
        
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', userId)
          .eq('name_id', nameId);
        
        if (error) throw error;
        
        return {
          success: true,
          message: "Name removed from favorites"
        };
      } catch (error) {
        console.error("Error removing favorite:", error);
        return {
          success: false,
          message: "Failed to remove from favorites"
        };
      }
    },
    
    // Get all favorites
    getFavorites: async (): Promise<ApiResponse<Name[]>> => {
      try {
        const { data: session } = await supabase.auth.getSession();
        
        if (!session.session) {
          return {
            success: false,
            message: "You must be logged in to view favorites",
            data: [],
            meta: {
              total: 0,
              page: 1,
              limit: 0,
              totalPages: 0
            }
          };
        }
        
        const userId = session.session.user.id;
        
        // First get all favorites for the user
        const { data: favorites, error: favoritesError } = await supabase
          .from('favorites')
          .select('name_id')
          .eq('user_id', userId);
        
        if (favoritesError) throw favoritesError;
        
        if (!favorites || favorites.length === 0) {
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
        
        // Get all names that match the favorite IDs
        const nameIds = favorites.map(fav => fav.name_id);
        
        const { data: names, error: namesError } = await supabase
          .from('names')
          .select('*')
          .in('id', nameIds);
        
        if (namesError) throw namesError;
        
        // Cast the gender field to the expected type
        const typedData = names?.map(item => ({
          ...item,
          gender: item.gender as "boy" | "girl" | "unisex"
        })) as Name[];
        
        return { 
          success: true, 
          data: typedData,
          meta: {
            total: typedData.length,
            page: 1,
            limit: typedData.length,
            totalPages: 1
          }
        };
      } catch (error) {
        console.error("Error fetching favorites:", error);
        return { 
          success: false,
          message: "Failed to fetch favorites", 
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
    generateNameCombinations: async (firstName: string, secondName: string) => {
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
    checkNameCompatibility: async (firstName: string, secondName: string) => {
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
