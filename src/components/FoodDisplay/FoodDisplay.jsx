import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

function FoodDisplay({ category }) {
  const { food_list, loading, error, searchTerm } = useContext(StoreContext);

  // Show loading state
  if (loading) {
    return (
      <div className="food-display">
        <div className="loading-container">
          <div className="loader"></div>
          <p>Loading delicious food...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="food-display">
        <div className="error-container">
          <i className="bi bi-exclamation-triangle"></i>
          <p>Error loading food items: {error}</p>
          <p>Using cached data instead.</p>
        </div>
      </div>
    );
  }

  // Filter food items
  const filteredFood = food_list.filter(item => {
    const matchesCategory = category === "All" || category === item.category;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Show empty state if no results
  if (filteredFood.length === 0) {
    return (
      <div className="food-display">
        <div className="empty-container">
          <i className="bi bi-inbox"></i>
          <h3>No food items found</h3>
          <p>{searchTerm ? `No results for "${searchTerm}"` : "No items in this category"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="food-display" id="food-display">
      <h2>Top Dishes For You</h2>
      {searchTerm && (
        <p className="search-results">
          Showing {filteredFood.length} result(s) for "{searchTerm}"
        </p>
      )}
      <div className="food-display-list">
        {filteredFood.map((item, index) => (
          <FoodItem
            key={index}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
}

export default FoodDisplay;