import { createContext, useState, useEffect } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      setCurrentUser(JSON.parse(loggedInUser));
      setIsLoggedIn(true);
    }
  }, []);

  // Fetch food data from JSON Server
  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3001/food_list');
        
        if (!response.ok) {
          throw new Error('Failed to fetch food data');
        }
        
        const data = await response.json();
        setFoodList(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching food data:', err);
        setError(err.message);
        
        // Fallback to imported data if API fails
        import("../components/Data/Data").then((module) => {
          setFoodList(module.food_list);
          console.log('Using fallback data from Data.jsx');
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFoodData();
  }, []);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[itemId] > 1) {
        updated[itemId] = updated[itemId] - 1;
      } else {
        delete updated[itemId];
      }
      return updated;
    });
  };

  const getTotalCart = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const clearCart = () => {
    setCartItems({});
    localStorage.removeItem("cartItems");
  };

  const login = (userData) => {
    setCurrentUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
  };

  const logout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("loggedInUser");
  };

  const contextValue = {
    food_list,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCart,
    clearCart,
    isLoggedIn,
    currentUser,
    login,
    logout,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;