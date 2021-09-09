import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants = [], onDelete = f => f, onToggleStock = f => f, onUpdatePrice = f => f }) {
  return (
    <ul className="cards">
      {plants.map(plant => (
        <PlantCard
          key={plant.id}
          {...plant}
          onDelete={onDelete}
          onToggleStock={onToggleStock}
          onUpdatePrice={onUpdatePrice} />
      ))}
    </ul>
  );
}

export default PlantList;
