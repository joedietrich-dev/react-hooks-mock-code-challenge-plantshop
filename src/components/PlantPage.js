import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlants = plants.filter(plant => plant.name.toLowerCase().includes(searchTerm.toLowerCase()));

  useEffect(() => {
    fetch(`http://localhost:6001/plants`)
      .then(res => res.json())
      .then(setPlants);
  }, [])

  const handlePlantDelete = (id) => {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.ok ? setPlants(plants.filter(plant => plant.id !== id)) : null);
  };

  const updatePlant = (id, field, value) => {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ [field]: value })
    }).then(res => res.json())
      .then(data => setPlants(plants.map(plant => plant.id === id ? data : plant)))
  }
  const handleToggleStock = (id) => {
    const currentPlant = plants.find(plant => plant.id === id);
    const newStock = currentPlant.isInStock === false ? true : false;
    updatePlant(id, "isInStock", newStock);
  };
  const handleUpdatePrice = (id, newPrice) => {
    updatePlant(id, "price", newPrice);
  };
  const handleSearchChange = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleNewPlantFormSubmit = (newPlant) => {
    fetch(`http://localhost:6001/plants/`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPlant)
    }).then(res => res.json())
      .then(data => setPlants([...plants, data]))
  }
  return (
    <main>
      <NewPlantForm onNewPlantFormSubmit={handleNewPlantFormSubmit} />
      <Search onSearchChange={handleSearchChange} />
      <PlantList plants={filteredPlants} onDelete={handlePlantDelete} onToggleStock={handleToggleStock} onUpdatePrice={handleUpdatePrice} />
    </main>
  );
}

export default PlantPage;
