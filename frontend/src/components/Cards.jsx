import React from "react";

function Cards({ title, value }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-gray-500 text-lg">{title}</h2>

      <h1 className="text-3xl font-bold text-blue-600 mt-2"> {value} </h1>
    </div>
  );
}

export default Cards;