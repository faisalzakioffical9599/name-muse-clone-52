
// Define interfaces for API responses and parameters
interface AuthResponse {
  success: boolean;
  token?: string;
  message?: string;
  isAuthenticated?: boolean;
}

interface NameData {
  id: number;
  name: string;
  meaning: string;
  gender: string;
  origin: string;
  religion: string;
  language?: string;
  description?: string;
  popularity?: number;
  luckyNumber?: number;
  luckyStone?: string;
  luckyColor?: string;
  pronunciation?: string;
  numerology?: number;
  zodiacSign?: string;
  nameVariations?: string[];
  personality?: string[];
  famousPeople?: {name: string, description: string}[];
  nameFaqs?: {question: string, answer: string}[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
}

interface PaginationParams {
  page?: number | string;
  limit?: number | string;
  search?: string;
  gender?: string;
  origin?: string;
  religion?: string;
  sortBy?: string;
  [key: string]: any; // Allow for additional parameters
}

interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  message?: string;
}

interface SingleResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface CategoryData {
  id: number;
  name: string;
  type: 'country' | 'religion' | 'language';
  count: number;
  description?: string;
}

interface UserData {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'editor' | 'user';
  lastLogin?: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

interface StoryData {
  id: number;
  nameId: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

interface FAQData {
  id: number;
  question: string;
  answer: string;
  category: string;
  priority: number;
}

interface PageContentData {
  id: number;
  slug: string;
  title: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
  lastUpdated: string;
}

interface SiteSettingsData {
  id: string;
  value: any;
  description?: string;
}

// Dummy data for names
const dummyNames: NameData[] = [
  {
    id: 1,
    name: "Aiden",
    meaning: "Little fire",
    gender: "boy",
    origin: "irish",
    religion: "christianity",
    popularity: 85,
    nameVariations: ["Ayden", "Aidan", "Aedan"],
    description: "A popular modern name with Celtic origins."
  },
  {
    id: 2,
    name: "Sophia",
    meaning: "Wisdom",
    gender: "girl",
    origin: "greek",
    religion: "christianity",
    popularity: 92,
    nameVariations: ["Sofia", "Sophie", "Sofie"],
    description: "A classic name that has remained popular throughout history."
  },
  {
    id: 3,
    name: "Mohammed",
    meaning: "Praised one",
    gender: "boy",
    origin: "arabic",
    religion: "islam",
    popularity: 88,
    nameVariations: ["Muhammad", "Muhammed", "Mohamed"],
    description: "One of the most common names worldwide."
  },
  {
    id: 4,
    name: "Aria",
    meaning: "Air, melody",
    gender: "girl",
    origin: "hebrew",
    religion: "judaism",
    popularity: 80,
    nameVariations: ["Arya", "Ariah", "Aria"],
    description: "A musical name that has gained popularity in recent years."
  },
  {
    id: 5,
    name: "Kai",
    meaning: "Sea",
    gender: "unisex",
    origin: "hawaiian",
    religion: "",
    popularity: 75,
    nameVariations: ["Ky", "Kye"],
    description: "A short, multicultural name with meanings in several languages."
  },
  {
    id: 6,
    name: "Aanya",
    meaning: "Graceful",
    gender: "girl",
    origin: "indian",
    religion: "hinduism",
    popularity: 70,
    nameVariations: ["Anya", "Anaya"],
    description: "A beautiful name of Sanskrit origin."
  },
  {
    id: 7,
    name: "Liam",
    meaning: "Strong-willed warrior",
    gender: "boy",
    origin: "irish",
    religion: "christianity",
    popularity: 95,
    nameVariations: ["William", "Will", "Lim"],
    description: "A short form of William that has become very popular."
  },
  {
    id: 8,
    name: "Emma",
    meaning: "Universal",
    gender: "girl",
    origin: "german",
    religion: "christianity",
    popularity: 90,
    nameVariations: ["Em", "Emmy", "Emma"],
    description: "A classic name with Germanic roots."
  },
  {
    id: 9,
    name: "Noah",
    meaning: "Rest, comfort",
    gender: "boy",
    origin: "hebrew",
    religion: "judaism",
    popularity: 93,
    nameVariations: ["Noe", "Noach"],
    description: "A biblical name that has risen in popularity."
  },
  {
    id: 10,
    name: "Olivia",
    meaning: "Olive tree",
    gender: "girl",
    origin: "latin",
    religion: "",
    popularity: 94,
    nameVariations: ["Livia", "Liv", "Olive"],
    description: "A name derived from the olive tree, symbolizing peace."
  },
  {
    id: 11,
    name: "Ethan",
    meaning: "Strong, firm",
    gender: "boy",
    origin: "hebrew",
    religion: "judaism",
    popularity: 86,
    nameVariations: ["Eitan", "Etan", "Eathan"],
    description: "A biblical name meaning strong and optimistic."
  },
  {
    id: 12,
    name: "Amara",
    meaning: "Grace, eternal",
    gender: "girl",
    origin: "african",
    religion: "",
    popularity: 78,
    nameVariations: ["Amarah", "Amarra"],
    description: "A beautiful name with roots in several cultures."
  }
];

// Dummy data for categories
const dummyCategories: CategoryData[] = [
  { id: 1, name: "Indian", type: "country", count: 1245, description: "Names originating from India" },
  { id: 2, name: "Arabic", type: "language", count: 987, description: "Names with Arabic origins" },
  { id: 3, name: "Christianity", type: "religion", count: 2145, description: "Christian names" },
  { id: 4, name: "Irish", type: "country", count: 562, description: "Names originating from Ireland" },
  { id: 5, name: "Islam", type: "religion", count: 1523, description: "Islamic names" },
  { id: 6, name: "Hebrew", type: "language", count: 872, description: "Names with Hebrew origins" },
  { id: 7, name: "Japanese", type: "country", count: 421, description: "Names originating from Japan" },
  { id: 8, name: "Spanish", type: "language", count: 678, description: "Names with Spanish origins" },
];

// Dummy data for FAQs
const dummyFAQs: FAQData[] = [
  { id: 1, question: "How do I find the meaning of a name?", answer: "You can use our search bar at the top of the page or browse by category.", category: "general", priority: 1 },
  { id: 2, question: "Are your name meanings accurate?", answer: "Yes, we research multiple sources to ensure accuracy.", category: "general", priority: 2 },
  { id: 3, question: "How do I save my favorite names?", answer: "Create an account and click the heart icon next to any name.", category: "account", priority: 1 },
  { id: 4, question: "Can I suggest a name to be added?", answer: "Yes, please contact us through the suggestions form.", category: "content", priority: 3 },
];

// Dummy data for users
const dummyUsers: UserData[] = [
  { id: 1, username: "admin", email: "admin@example.com", role: "admin", lastLogin: "2025-04-03T12:34:56Z", status: "active", createdAt: "2025-01-01T00:00:00Z" },
  { id: 2, username: "editor1", email: "editor1@example.com", role: "editor", lastLogin: "2025-04-02T10:24:36Z", status: "active", createdAt: "2025-01-15T00:00:00Z" },
  { id: 3, username: "user1", email: "user1@example.com", role: "user", lastLogin: "2025-04-04T08:14:22Z", status: "active", createdAt: "2025-02-05T00:00:00Z" },
  { id: 4, username: "user2", email: "user2@example.com", role: "user", lastLogin: "2025-03-28T15:42:18Z", status: "inactive", createdAt: "2025-02-10T00:00:00Z" },
];

// Dummy data for stories
const dummyStories: StoryData[] = [
  { id: 1, nameId: 1, title: "The Meaning Behind Aiden", content: "Aiden, meaning 'little fire', has Celtic origins and represents passion and energy...", author: "NameExpert", createdAt: "2025-03-10T00:00:00Z" },
  { id: 2, nameId: 2, title: "Sophia: A Name Through History", content: "The name Sophia has been popular across cultures for centuries, representing wisdom and insight...", author: "HistoryBuff", createdAt: "2025-03-12T00:00:00Z" },
  { id: 3, nameId: 3, title: "Mohammed: The Most Common Name Worldwide", content: "Mohammed, meaning 'praised one', is considered the most common name globally...", author: "GlobalNames", createdAt: "2025-03-15T00:00:00Z" },
];

// Dummy data for page content
const dummyPageContent: PageContentData[] = [
  { id: 1, slug: "about", title: "About Us", content: "<h1>About NameMuse</h1><p>NameMuse is dedicated to helping parents find the perfect name for their baby...</p>", metaTitle: "About NameMuse | Baby Name Meanings", metaDescription: "Learn about our mission to help parents find meaningful baby names", lastUpdated: "2025-03-01T00:00:00Z" },
  { id: 2, slug: "privacy-policy", title: "Privacy Policy", content: "<h1>Privacy Policy</h1><p>At NameMuse, we take your privacy seriously...</p>", metaTitle: "Privacy Policy | NameMuse", metaDescription: "NameMuse privacy policy and data handling practices", lastUpdated: "2025-02-15T00:00:00Z" },
  { id: 3, slug: "home", title: "Home Page", content: "<h1>Welcome to NameMuse</h1><p>Discover the perfect name for your baby with our comprehensive database...</p>", metaTitle: "NameMuse | Find the Perfect Baby Name", metaDescription: "Explore thousands of baby names with meanings and origins", lastUpdated: "2025-03-20T00:00:00Z" },
];

// Dummy data for site settings
const dummySiteSettings: SiteSettingsData[] = [
  { id: "site_title", value: "NameMuse - Baby Name Finder", description: "Main site title" },
  { id: "site_description", value: "Find the perfect baby name with meanings and origins", description: "Meta description for the site" },
  { id: "items_per_page", value: 12, description: "Default number of items to show per page" },
  { id: "enable_comments", value: true, description: "Whether to allow comments on name pages" },
  { id: "theme_color", value: "#4f46e5", description: "Primary theme color" },
];

// Authentication Token storage
const TOKEN_KEY = "admin_auth_token";

// Mock API calls with Promise to simulate async behavior
export const api = {
  // Auth endpoints
  auth: {
    login: async (username: string, password: string): Promise<AuthResponse> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (username === "admin" && password === "password") {
            const token = "mock-jwt-token-" + Date.now();
            localStorage.setItem(TOKEN_KEY, token);
            localStorage.setItem("adminLoggedIn", "true");
            resolve({ success: true, token, message: "Login successful" });
          } else {
            reject({ success: false, message: "Invalid credentials" });
          }
        }, 800);
      });
    },
    logout: async (): Promise<AuthResponse> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem("adminLoggedIn");
          resolve({ success: true, message: "Logout successful" });
        }, 500);
      });
    },
    forgotPassword: async (email: string): Promise<AuthResponse> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            success: true, 
            message: "Password reset instructions sent to your email" 
          });
        }, 1000);
      });
    },
    changePassword: async (currentPassword: string, newPassword: string): Promise<AuthResponse> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (currentPassword === "password") {
            resolve({ success: true, message: "Password changed successfully" });
          } else {
            reject({ success: false, message: "Current password is incorrect" });
          }
        }, 800);
      });
    },
    checkToken: async (): Promise<AuthResponse> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const token = localStorage.getItem(TOKEN_KEY);
          resolve({ 
            success: !!token, 
            isAuthenticated: !!token 
          });
        }, 300);
      });
    }
  },
  
  // Names endpoints
  names: {
    getAll: async (params: PaginationParams = {}): Promise<PaginatedResponse<NameData>> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          let result = [...dummyNames];
          
          // Handle filtering
          if (params.search) {
            const searchLower = params.search.toLowerCase();
            result = result.filter(name => 
              name.name.toLowerCase().includes(searchLower) || 
              name.meaning.toLowerCase().includes(searchLower)
            );
          }
          
          if (params.gender && params.gender !== 'all') {
            result = result.filter(name => name.gender === params.gender);
          }
          
          if (params.origin && params.origin !== 'all') {
            result = result.filter(name => name.origin === params.origin);
          }
          
          if (params.religion && params.religion !== 'all') {
            result = result.filter(name => name.religion === params.religion);
          }
          
          // Handle sorting
          if (params.sortBy) {
            const [field, direction] = params.sortBy.split('-');
            result.sort((a, b) => {
              if (direction === 'asc') {
                return a[field as keyof NameData] > b[field as keyof NameData] ? 1 : -1;
              } else {
                return a[field as keyof NameData] < b[field as keyof NameData] ? 1 : -1;
              }
            });
          }
          
          // Calculate total
          const total = result.length;
          
          // Handle pagination
          if (params.page && params.limit) {
            const page = parseInt(params.page.toString());
            const limit = parseInt(params.limit.toString());
            const start = (page - 1) * limit;
            const end = start + limit;
            result = result.slice(start, end);
          }
          
          resolve({ 
            success: true, 
            data: result,
            meta: {
              total,
              page: params.page ? parseInt(params.page.toString()) : 1,
              limit: params.limit ? parseInt(params.limit.toString()) : total,
              totalPages: Math.ceil(total / (params.limit ? parseInt(params.limit.toString()) : total))
            }
          });
        }, 500);
      });
    },
    
    getById: async (id: number | string): Promise<SingleResponse<NameData>> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const name = dummyNames.find(n => n.id === parseInt(id.toString()));
          if (name) {
            resolve({ success: true, data: name });
          } else {
            reject({ success: false, message: "Name not found" });
          }
        }, 300);
      });
    },
    
    create: async (nameData: Partial<NameData>): Promise<SingleResponse<NameData>> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newName = {
            id: dummyNames.length + 1,
            ...nameData
          } as NameData;
          dummyNames.push(newName);
          resolve({ success: true, data: newName, message: "Name created successfully" });
        }, 700);
      });
    },
    
    update: async (id: number | string, nameData: Partial<NameData>): Promise<SingleResponse<NameData>> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const index = dummyNames.findIndex(n => n.id === parseInt(id.toString()));
          if (index !== -1) {
            dummyNames[index] = { ...dummyNames[index], ...nameData };
            resolve({ success: true, data: dummyNames[index], message: "Name updated successfully" });
          } else {
            reject({ success: false, message: "Name not found" });
          }
        }, 700);
      });
    },
    
    delete: async (id: number | string): Promise<SingleResponse<NameData>> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const index = dummyNames.findIndex(n => n.id === parseInt(id.toString()));
          if (index !== -1) {
            const deletedName = dummyNames[index];
            dummyNames.splice(index, 1);
            resolve({ success: true, data: deletedName, message: "Name deleted successfully" });
          } else {
            reject({ success: false, message: "Name not found" });
          }
        }, 500);
      });
    }
  },

  // Categories endpoints
  categories: {
    getAll: async (params: PaginationParams = {}): Promise<PaginatedResponse<CategoryData>> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          let result = [...dummyCategories];
          
          // Handle filtering
          if (params.search) {
            const searchLower = params.search.toLowerCase();
            result = result.filter(category => 
              category.name.toLowerCase().includes(searchLower) || 
              (category.description && category.description.toLowerCase().includes(searchLower))
            );
          }
          
          if (params.type) {
            result = result.filter(category => category.type === params.type);
          }
          
          // Handle sorting
          if (params.sortBy) {
            const [field, direction] = params.sortBy.split('-');
            result.sort((a, b) => {
              if (direction === 'asc') {
                return a[field as keyof CategoryData] > b[field as keyof CategoryData] ? 1 : -1;
              } else {
                return a[field as keyof CategoryData] < b[field as keyof CategoryData] ? 1 : -1;
              }
            });
          }
          
          // Calculate total
          const total = result.length;
          
          // Handle pagination
          if (params.page && params.limit) {
            const page = parseInt(params.page.toString());
            const limit = parseInt(params.limit.toString());
            const start = (page - 1) * limit;
            const end = start + limit;
            result = result.slice(start, end);
          }
          
          resolve({ 
            success: true, 
            data: result,
            meta: {
              total,
              page: params.page ? parseInt(params.page.toString()) : 1,
              limit: params.limit ? parseInt(params.limit.toString()) : total,
              totalPages: Math.ceil(total / (params.limit ? parseInt(params.limit.toString()) : total))
            }
          });
        }, 400);
      });
    },
    
    getById: async (id: number | string): Promise<SingleResponse<CategoryData>> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const category = dummyCategories.find(c => c.id === parseInt(id.toString()));
          if (category) {
            resolve({ success: true, data: category });
          } else {
            reject({ success: false, message: "Category not found" });
          }
        }, 300);
      });
    },
    
    create: async (categoryData: Partial<CategoryData>): Promise<SingleResponse<CategoryData>> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newCategory = {
            id: dummyCategories.length + 1,
            count: 0,
            ...categoryData
          } as CategoryData;
          dummyCategories.push(newCategory);
          resolve({ success: true, data: newCategory, message: "Category created successfully" });
        }, 600);
      });
    },
    
    update: async (id: number | string, categoryData: Partial<CategoryData>): Promise<SingleResponse<CategoryData>> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const index = dummyCategories.findIndex(c => c.id === parseInt(id.toString()));
          if (index !== -1) {
            dummyCategories[index] = { ...dummyCategories[index], ...categoryData };
            resolve({ success: true, data: dummyCategories[index], message: "Category updated successfully" });
          } else {
            reject({ success: false, message: "Category not found" });
          }
        }, 600);
      });
    },
    
    delete: async (id: number | string): Promise<SingleResponse<CategoryData>> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const index = dummyCategories.findIndex(c => c.id === parseInt(id.toString()));
          if (index !== -1) {
            const deletedCategory = dummyCategories[index];
            dummyCategories.splice(index, 1);
            resolve({ success: true, data: deletedCategory, message: "Category deleted successfully" });
          } else {
            reject({ success: false, message: "Category not found" });
          }
        }, 500);
      });
    }
  },

  // FAQs endpoints
  faqs: {
    getAll: async (params: PaginationParams = {}): Promise<PaginatedResponse<FAQData>> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          let result = [...dummyFAQs];
          
          // Handle filtering
          if (params.search) {
            const searchLower = params.search.toLowerCase();
            result = result.filter(faq => 
              faq.question.toLowerCase().includes(searchLower) || 
              faq.answer.toLowerCase().includes(searchLower)
            );
          }
          
          if (params.category) {
            result = result.filter(faq => faq.category === params.category);
          }
          
          // Handle sorting
          if (params.sortBy) {
            const [field, direction] = params.sortBy.split('-');
            result.sort((a, b) => {
              if (direction === 'asc') {
                return a[field as keyof FAQData] > b[field as keyof FAQData] ? 1 : -1;
              } else {
                return a[field as keyof FAQData] < b[field as keyof FAQData] ? 1 : -1;
              }
            });
          } else {
            // Default sort by priority
            result.sort((a, b) => a.priority - b.priority);
          }
          
          // Calculate total
          const total = result.length;
          
          // Handle pagination
          if (params.page && params.limit) {
            const page = parseInt(params.page.toString());
            const limit = parseInt(params.limit.toString());
            const start = (page - 1) * limit;
            const end = start + limit;
            result = result.slice(start, end);
          }
          
          resolve({ 
            success: true, 
            data: result,
            meta: {
              total,
              page: params.page ? parseInt(params.page.toString()) : 1,
              limit: params.limit ? parseInt(params.limit.toString()) : total,
              totalPages: Math.ceil(total / (params.limit ? parseInt(params.limit.toString()) : total))
            }
          });
        }, 400);
      });
    },
    
    getById: async (id: number | string): Promise<SingleResponse<FAQData>> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const faq = dummyFAQs.find(f => f.id === parseInt(id.toString()));
          if (faq) {
            resolve({ success: true, data: faq });
          } else {
            reject({ success: false, message: "FAQ not found" });
          }
        }, 300);
      });
    },
    
    create: async (faqData: Partial<FAQData>): Promise<SingleResponse<FAQData>> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newFAQ = {
            id: dummyFAQs.length + 1,
            priority: dummyFAQs.length + 1,
            ...faqData
          } as FAQData;
          dummyFAQs.push(newFAQ);
          resolve({ success: true, data: newFAQ, message: "FAQ created successfully" });
        }, 600);
      });
    },
    
    update: async (id: number | string, faqData: Partial<FAQData>): Promise<SingleResponse<FAQData>> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const index = dummyFAQs.findIndex(f => f.id === parseInt(id.toString()));
          if (index !== -1) {
            dummyFAQs[index] = { ...dummyFAQs[index], ...faqData };
            resolve({ success: true, data: dummyFAQs[index], message: "FAQ updated successfully" });
          } else {
            reject({ success: false, message: "FAQ not found" });
          }
        }, 600);
      });
    },
    
    delete: async (id: number | string): Promise<SingleResponse<FAQData>> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const index = dummyFAQs.findIndex(f => f.id === parseInt(id.toString()));
          if (index !== -1) {
            const deletedFAQ = dummyFAQs[index];
            dummyFAQs.splice(index, 1);
            resolve({ success: true, data: deletedFAQ, message: "FAQ deleted successfully" });
          } else {
            reject({ success: false, message: "FAQ not found" });
          }
        }, 500);
      });
    }
  },

  // Users endpoints
  users: {
    getAll: async (params: PaginationParams = {}): Promise<PaginatedResponse<UserData>> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          let result = [...dummyUsers];
          
          // Handle filtering
          if (params.search) {
            const searchLower = params.search.toLowerCase();
            result = result.filter(user => 
              user.username.toLowerCase().includes(searchLower) || 
              user.email.toLowerCase().includes(searchLower)
            );
          }
          
          if (params.role) {
            result = result.filter(user => user.role === params.role);
          }
          
          if (params.status) {
            result = result.filter(user => user.status === params.status);
          }
          
          // Handle sorting
          if (params.sortBy) {
            const [field, direction] = params.sortBy.split('-');
            result.sort((a, b) => {
              if (direction === 'asc') {
                return a[field as keyof UserData] > b[field as keyof UserData] ? 1 : -1;
              } else {
                return a[field as keyof UserData] < b[field as keyof UserData] ? 1 : -1;
              }
            });
          }
          
          // Calculate total
          const total = result.length;
          
          // Handle pagination
          if (params.page && params.limit) {
            const page = parseInt(params.page.toString());
            const limit = parseInt(params.limit.toString());
            const start = (page - 1) * limit;
            const end = start + limit;
            result = result.slice(start, end);
          }
          
          resolve({ 
            success: true, 
            data: result,
            meta: {
              total,
              page: params.page ? parseInt(params.page.toString()) : 1,
              limit: params.limit ? parseInt(params.limit.toString()) : total,
              totalPages: Math.ceil(total / (params.limit ? parseInt(params.limit.toString()) : total))
            }
          });
        }, 500);
      });
    },
    
    getById: async (id: number | string): Promise<SingleResponse<UserData>> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const user = dummyUsers.find(u => u.id === parseInt(id.toString()));
          if (user) {
            resolve({ success: true, data: user });
          } else {
            reject({ success: false, message: "User not found" });
          }
        }, 300);
      });
    },
    
    create: async (userData: Partial<UserData>): Promise<SingleResponse<UserData>> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newUser = {
            id: dummyUsers.length + 1,
            status: 'active',
            createdAt: new Date().toISOString(),
            ...userData
          } as UserData;
          dummyUsers.push(newUser);
          resolve({ success: true, data: newUser, message: "User created successfully" });
        }, 700);
      });
    },
    
    update: async (id: number | string, userData: Partial<UserData>): Promise<SingleResponse<UserData>> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const index = dummyUsers.findIndex(u => u.id === parseInt(id.toString()));
          if (index !== -1) {
            dummyUsers[index] = { ...dummyUsers[index], ...userData };
            resolve({ success: true, data: dummyUsers[index], message: "User updated successfully" });
          } else {
            reject({ success: false, message: "User not found" });
          }
        }, 700);
      });
    },
    
    delete: async (id: number | string): Promise<SingleResponse<UserData>> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const index = dummyUsers.findIndex(u => u.id === parseInt(id.toString()));
          if (index !== -1) {
            const deletedUser = dummyUsers[index];
            dummyUsers.splice(index, 1);
            resolve({ success: true, data: deletedUser, message: "User deleted successfully" });
          } else {
            reject({ success: false, message: "User not found" });
          }
        }, 500);
      });
    }
  },

  // Page content endpoints
  pageContent: {
    getAll: async (params: PaginationParams = {}): Promise<PaginatedResponse<PageContentData>> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          let result = [...dummyPageContent];
          
          // Handle filtering
          if (params.search) {
            const searchLower = params.search.toLowerCase();
            result = result.filter(page => 
              page.title.toLowerCase().includes(searchLower) || 
              page.slug.toLowerCase().includes(searchLower)
            );
          }
          
          // Handle sorting
          if (params.sortBy) {
            const [field, direction] = params.sortBy.split('-');
            result.sort((a, b) => {
              if (direction === 'asc') {
                return a[field as keyof PageContentData] > b[field as keyof PageContentData] ? 1 : -1;
              } else {
                return a[field as keyof PageContentData] < b[field as keyof PageContentData] ? 1 : -1;
              }
            });
          }
          
          // Calculate total
          const total = result.length;
          
          // Handle pagination
          if (params.page && params.limit) {
            const page = parseInt(params.page.toString());
            const limit = parseInt(params.limit.toString());
            const start = (page - 1) * limit;
            const end = start + limit;
            result = result.slice(start, end);
          }
          
          resolve({ 
            success: true, 
            data: result,
            meta: {
              total,
              page: params.page ? parseInt(params.page.toString()) : 1,
              limit: params.limit ? parseInt(params.limit.toString()) : total,
              totalPages: Math.ceil(total / (params.limit ? parseInt(params.limit.toString()) : total))
            }
          });
        }, 400);
      });
    },
    
    getBySlug: async (slug: string): Promise<SingleResponse<PageContentData>> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const page = dummyPageContent.find(p => p.slug === slug);
          if (page) {
            resolve({ success: true, data: page });
          } else {
            reject({ success: false, message: "Page not found" });
          }
        }, 300);
      });
    },
    
    getById: async (id: number | string): Promise<SingleResponse<PageContentData>> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const page = dummyPageContent.find(p => p.id === parseInt(id.toString()));
          if (page) {
            resolve({ success: true, data: page });
          } else {
            reject({ success: false, message: "Page not found" });
          }
        }, 300);
      });
    },
    
    create: async (pageData: Partial<PageContentData>): Promise<SingleResponse<PageContentData>> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newPage = {
            id: dummyPageContent.length + 1,
            lastUpdated: new Date().toISOString(),
            ...pageData
          } as PageContentData;
          dummyPageContent.push(newPage);
          resolve({ success: true, data: newPage, message: "Page created successfully" });
        }, 700);
      });
    },
    
    update: async (id: number | string, pageData: Partial<PageContentData>): Promise<SingleResponse<PageContentData>> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const index = dummyPageContent.findIndex(p => p.id === parseInt(id.toString()));
          if (index !== -1) {
            dummyPageContent[index] = { 
              ...dummyPageContent[index], 
              ...pageData,
              lastUpdated: new Date().toISOString()
            };
            resolve({ success: true, data: dummyPageContent[index], message: "Page updated successfully" });
          } else {
            reject({ success: false, message: "Page not found" });
          }
        }, 700);
      });
    },
    
    delete: async (id: number | string): Promise<SingleResponse<PageContentData>> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const index = dummyPageContent.findIndex(p => p.id === parseInt(id.toString()));
          if (index !== -1) {
            const deletedPage = dummyPageContent[index];
            dummyPageContent.splice(index, 1);
            resolve({ success: true, data: deletedPage, message: "Page deleted successfully" });
          } else {
            reject({ success: false, message: "Page not found" });
          }
        }, 500);
      });
    }
  },

  // Site settings endpoints
  settings: {
    getAll: async (): Promise<PaginatedResponse<SiteSettingsData>> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            success: true, 
            data: dummySiteSettings,
            meta: {
              total: dummySiteSettings.length,
              page: 1,
              limit: dummySiteSettings.length,
              totalPages: 1
            }
          });
        }, 300);
      });
    },
    
    getById: async (id: string): Promise<SingleResponse<SiteSettingsData>> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const setting = dummySiteSettings.find(s => s.id === id);
          if (setting) {
            resolve({ success: true, data: setting });
          } else {
            reject({ success: false, message: "Setting not found" });
          }
        }, 200);
      });
    },
    
    update: async (id: string, value: any): Promise<SingleResponse<SiteSettingsData>> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const index = dummySiteSettings.findIndex(s => s.id === id);
          if (index !== -1) {
            dummySiteSettings[index] = { 
              ...dummySiteSettings[index], 
              value
            };
            resolve({ success: true, data: dummySiteSettings[index], message: "Setting updated successfully" });
          } else {
            reject({ success: false, message: "Setting not found" });
          }
        }, 500);
      });
    }
  },

  // Stories endpoints
  stories: {
    getAll: async (params: PaginationParams = {}): Promise<PaginatedResponse<StoryData>> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          let result = [...dummyStories];
          
          // Handle filtering
          if (params.search) {
            const searchLower = params.search.toLowerCase();
            result = result.filter(story => 
              story.title.toLowerCase().includes(searchLower) || 
              story.content.toLowerCase().includes(searchLower)
            );
          }
          
          if (params.nameId) {
            result = result.filter(story => story.nameId === parseInt(params.nameId as string));
          }
          
          // Handle sorting
          if (params.sortBy) {
            const [field, direction] = params.sortBy.split('-');
            result.sort((a, b) => {
              if (direction === 'asc') {
                return a[field as keyof StoryData] > b[field as keyof StoryData] ? 1 : -1;
              } else {
                return a[field as keyof StoryData] < b[field as keyof StoryData] ? 1 : -1;
              }
            });
          }
          
          // Calculate total
          const total = result.length;
          
          // Handle pagination
          if (params.page && params.limit) {
            const page = parseInt(params.page.toString());
            const limit = parseInt(params.limit.toString());
            const start = (page - 1) * limit;
            const end = start + limit;
            result = result.slice(start, end);
          }
          
          resolve({ 
            success: true, 
            data: result,
            meta: {
              total,
              page: params.page ? parseInt(params.page.toString()) : 1,
              limit: params.limit ? parseInt(params.limit.toString()) : total,
              totalPages: Math.ceil(total / (params.limit ? parseInt(params.limit.toString()) : total))
            }
          });
        }, 500);
      });
    },
    
    getById: async (id: number | string): Promise<SingleResponse<StoryData>> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const story = dummyStories.find(s => s.id === parseInt(id.toString()));
          if (story) {
            resolve({ success: true, data: story });
          } else {
            reject({ success: false, message: "Story not found" });
          }
        }, 300);
      });
    },
    
    create: async (storyData: Partial<StoryData>): Promise<SingleResponse<StoryData>> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newStory = {
            id: dummyStories.length + 1,
            createdAt: new Date().toISOString(),
            ...storyData
          } as StoryData;
          dummyStories.push(newStory);
          resolve({ success: true, data: newStory, message: "Story created successfully" });
        }, 700);
      });
    },
    
    update: async (id: number | string, storyData: Partial<StoryData>): Promise<SingleResponse<StoryData>> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const index = dummyStories.findIndex(s => s.id === parseInt(id.toString()));
          if (index !== -1) {
            dummyStories[index] = { ...dummyStories[index], ...storyData };
            resolve({ success: true, data: dummyStories[index], message: "Story updated successfully" });
          } else {
            reject({ success: false, message: "Story not found" });
          }
        }, 700);
      });
    },
    
    delete: async (id: number | string): Promise<SingleResponse<StoryData>> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const index = dummyStories.findIndex(s => s.id === parseInt(id.toString()));
          if (index !== -1) {
            const deletedStory = dummyStories[index];
            dummyStories.splice(index, 1);
            resolve({ success: true, data: deletedStory, message: "Story deleted successfully" });
          } else {
            reject({ success: false, message: "Story not found" });
          }
        }, 500);
      });
    }
  }
};

export default api;
