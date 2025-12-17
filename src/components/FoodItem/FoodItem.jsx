import React, { useContext} from "react";
import "./FoodItem.css";
import add_icon_white from "../../assets/add_icon_white.png";
import remove_icon_red from "../../assets/remove_icon_red.png";
import add_icon_green from "../../assets/add_icon_green.png";
import { StoreContext } from "../../context/StoreContext";

function FoodItem({ id, name, price, description, image }) {
  const {cartItems,addToCart,removeFromCart} = useContext(StoreContext)

  return (
    <>
      <div className="food-item">
        <div className="food-item-img-container">
          <img className="food-item-img" src={image} alt="" />
          {!cartItems[id] ? (
            <img
              className="add"
              onClick={() => addToCart(id)}
              src={add_icon_white}
              alt=""
            />
          ) : (
            <div className="food-item-counter">
              <img
                onClick={() => removeFromCart(id)}
                src={remove_icon_red}
                alt=""
              />
              <p>{cartItems[id]}</p>
              <img
                onClick={() => addToCart(id)}
                src={add_icon_green}
                alt=""
              />
            </div>
          )}
        </div>
        <div className="food-item-info">
          <p>{name}</p>
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">Rs.{price}</p>
      </div>
    </>
  );
}

export default FoodItem;
