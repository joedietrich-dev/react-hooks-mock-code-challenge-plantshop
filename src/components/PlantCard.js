import React, { useState } from "react";

function PlantCard(
  {
    name = 'name',
    image = "https://via.placeholder.com/400",
    price = 50,
    id = -1,
    isInStock = true,
    onDelete = f => f,
    onToggleStock = f => f,
    onUpdatePrice = f => f
  }
) {
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [newPrice, setNewPrice] = useState(price);

  const handleSavePriceClick = () => {
    setIsEditingPrice(false);
    onUpdatePrice(id, newPrice);
  }
  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      {isEditingPrice ? (
        <div>
          <input value={newPrice} type="number" onChange={(e) => setNewPrice(e.target.value)}></input>
          <span onClick={handleSavePriceClick}>💾</span>
        </div>
      ) : (
        <p>Price: {price} <span onClick={() => setIsEditingPrice(true)}>✏️</span></p>
      )}
      {isInStock ? (
        <button className="primary" onClick={() => onToggleStock(id)}>In Stock</button>
      ) : (
        <button onClick={() => onToggleStock(id)}>Out of Stock</button>
      )}
      <button className="warning" onClick={() => onDelete(id)}>Delete</button>
    </li>
  );
}

export default PlantCard;
