import { useEffect, useState } from "react";

function FoodList() {
  const [foods, setFoods] = useState([]);

  // FETCH DATA FROM JSON SERVER
  useEffect(() => {
    fetch("http://localhost:3000/food_list")
      .then((res) => res.json())
      .then((data) => setFoods(data));
  }, []);

  return (
    <div>
      {/* FOOD LIST */}
      {foods.map((item) => (
          <div key={item.id}>
            <img
              src={`/images/${item.image}`}
              alt={item.name}
              width="150"
            />
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
            <p>{item.description}</p>
          </div>
        ))}
    </div>
  );
}

export default FoodList;
