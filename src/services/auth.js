// Simulated delay to mimic network latency
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Dummy user for testing
const dummyUser = { id: '1', email: 'test@example.com', name: 'Test User' };

const auth = {
  login: async (email, password) => {
    await delay(500); // Simulate network delay
    if (email === dummyUser.email && password === 'password') {
      localStorage.setItem('user', JSON.stringify(dummyUser));
      return dummyUser;
    }
    throw new Error('Invalid email or password');
  },

  logout: async () => {
    await delay(500);
    localStorage.removeItem('user');
  },

  signup: async (email, password, name) => {
    await delay(500);
    const newUser = { id: Date.now().toString(), email, name };
    localStorage.setItem('user', JSON.stringify(newUser));
    return newUser;
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  onAuthStateChanged: (callback) => {
    const checkAuth = () => {
      const user = auth.getCurrentUser();
      callback(user);
    };

    // Check immediately
    checkAuth();

    // Check on focus, as localStorage might have changed in another tab
    window.addEventListener('focus', checkAuth);

    // Return a cleanup function
    return () => window.removeEventListener('focus', checkAuth);
  },
};

export default auth;