'use client';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // For navigation between pages

export default function Home() {
// Declare a state variable to hold the list of characters
const [characters, setCharacters] = useState([]);
useEffect(() => {
  // Dynamically import Bootstrap JS only on the client side
  import("bootstrap/dist/js/bootstrap.bundle.min")
    .then(() => console.log("Bootstrap JS loaded"))
    .catch((err) => console.error("Error loading Bootstrap JS:", err));
}, []);

// Fetch characters data from Rick and Morty API when the component mounts
useEffect(() => {
  fetch('https://rickandmortyapi.com/api/character')
    .then((response) => response.json())  // Convert response to JSON
    .then((data) => setCharacters(data.results))  // Store the results in the state
    .catch((error) => console.error('Error fetching data:', error));  // Handle any errors
}, []); 
  
  return (
    <div className="App">
      <div className="container">
      <h1 className="text-center ubuntu my-4">Rick & Morty Characters</h1>
      <table className="table">
      <thead>
        <tr>
          <th>Avatar</th>
          <th>Name</th>
          <th>Species</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
      {characters.map((char) => (
            <tr key={char.id}>
              <td>
                <img src={char.image} alt={char.name} width={50} />
              </td>
              <td>
                {/* Use Link to navigate to the character details page */}
                <Link href={`/character/${char.id}`}>
                  {char.name}
                </Link>
              </td>
              <td>{char.species}</td>
              <td>{char.status}</td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
    </div>
  );
}
