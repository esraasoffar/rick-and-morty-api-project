'use client';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";;
import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // For navigation between pages
import Pagination from './components/pagination/Pagination';

export default function Home() {
// Declare a state variable to hold the list of characters
const [characters, setCharacters] = useState([]);        // State to store all characters
const [searchQuery, setSearchQuery] = useState('');      // State for search input
const [page, setPage] = useState(1);                // State for current page
const [totalPages, setTotalPages] = useState(1);    // Total pages
  
useEffect(() => { 
  // Dynamically import Bootstrap JS only on the client side
  import("bootstrap/dist/js/bootstrap.bundle.min")
    .then(() => console.log("Bootstrap JS loaded"))
    .catch((err) => console.error("Error loading Bootstrap JS:", err));
}, []);

// Fetch characters data from Rick and Morty API when the component mounts
useEffect(() => {
  if (page) { // Ensure page has a valid value before running the effect
    fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.results);      // Update the characters
        setTotalPages(data.info.pages);   // Update the total number of pages
      })
      .catch((error) => console.error("Error fetching data:", error));
  }
}, [page]); // Dependency array includes 'page'

  // Filter characters based on the search query
  const filteredCharacters = characters.filter((char) =>
    char.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="App">
      <div className="container">
      <h1 className="text-center ubuntu my-4">Rick & Morty Characters</h1>
      <input
        type="text"
        placeholder="Search for characters..."
        className="form-control mb-4"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
      />
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
      {filteredCharacters.map((char) => (
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
     {/* Pagination Component */}
     <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPrevious={() => setPage((prev) => Math.max(prev - 1, 1))}
          onNext={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        />
  </div>
    </div>
  );
}
