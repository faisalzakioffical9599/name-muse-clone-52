
// Dummy data for names
const dummyNames = [
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

// Authentication Token storage
const TOKEN_KEY = "admin_auth_token";

// Mock API calls with Promise to simulate async behavior
export const api = {
  // Auth endpoints
  auth: {
    login: async (username: string, password: string) => {
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
    logout: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem("adminLoggedIn");
          resolve({ success: true, message: "Logout successful" });
        }, 500);
      });
    },
    forgotPassword: async (email: string) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            success: true, 
            message: "Password reset instructions sent to your email" 
          });
        }, 1000);
      });
    },
    changePassword: async (currentPassword: string, newPassword: string) => {
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
    checkToken: async () => {
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
    getAll: async (params = {}) => {
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
                return a[field] > b[field] ? 1 : -1;
              } else {
                return a[field] < b[field] ? 1 : -1;
              }
            });
          }
          
          // Calculate total
          const total = result.length;
          
          // Handle pagination
          if (params.page && params.limit) {
            const page = parseInt(params.page);
            const limit = parseInt(params.limit);
            const start = (page - 1) * limit;
            const end = start + limit;
            result = result.slice(start, end);
          }
          
          resolve({ 
            success: true, 
            data: result,
            meta: {
              total,
              page: params.page || 1,
              limit: params.limit || total,
              totalPages: Math.ceil(total / (params.limit || total))
            }
          });
        }, 500);
      });
    },
    
    getById: async (id) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const name = dummyNames.find(n => n.id === parseInt(id));
          if (name) {
            resolve({ success: true, data: name });
          } else {
            reject({ success: false, message: "Name not found" });
          }
        }, 300);
      });
    },
    
    create: async (nameData) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const newName = {
            id: dummyNames.length + 1,
            ...nameData
          };
          dummyNames.push(newName);
          resolve({ success: true, data: newName, message: "Name created successfully" });
        }, 700);
      });
    },
    
    update: async (id, nameData) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const index = dummyNames.findIndex(n => n.id === parseInt(id));
          if (index !== -1) {
            dummyNames[index] = { ...dummyNames[index], ...nameData };
            resolve({ success: true, data: dummyNames[index], message: "Name updated successfully" });
          } else {
            reject({ success: false, message: "Name not found" });
          }
        }, 700);
      });
    },
    
    delete: async (id) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const index = dummyNames.findIndex(n => n.id === parseInt(id));
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
  }
};

export default api;
