import React, { useState } from "react";

function NewPlantForm({ onNewPlantFormSubmit }) {
  const [newPlant, setNewPlant] = useState({
    name: '',
    image: '',
    price: 0,
  });

  const handleFieldChange = (e) => {
    setNewPlant({ ...newPlant, [e.target.name]: e.target.value });
  }
  const handleFormSubmit = (e) => {
    e.preventDefault();
    onNewPlantFormSubmit(newPlant);
    setNewPlant({
      name: '',
      image: '',
      price: 0,
    })
  }
  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleFormSubmit}>
        <input type="text" name="name" placeholder="Plant name" onChange={handleFieldChange} />
        <input type="text" name="image" placeholder="Image URL" onChange={handleFieldChange} />
        <input type="number" name="price" step="0.01" placeholder="Price" onChange={handleFieldChange} />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
