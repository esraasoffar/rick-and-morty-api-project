// pages/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import "bootstrap/dist/css/bootstrap.min.css";


const CharacterDetails = () => {
  const router = useRouter();
  const { id } = router.query; // Gets the dynamic id from the URL
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);  //tracks whether the data is still loading 

  useEffect(() => {
    // Dynamically import Bootstrap JS only on the client side
    import("bootstrap/dist/js/bootstrap.bundle.min")
      .then(() => console.log("Bootstrap JS loaded"))
      .catch((err) => console.error("Error loading Bootstrap JS:", err));
  }, []);

  useEffect(() => {
    if (id) {
      // Fetch the character data when the id changes
      const fetchCharacter = async () => {
        setLoading(true);
        try {
          const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
          const data = await response.json();
          setCharacter(data);
        } catch (error) {
          console.error('Error fetching character:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchCharacter();
    }
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!character) {
    return <p>Character not found.</p>;
  }

  return (
    <div className="container text-center mt-4">
      <h1>{character.name}</h1>
      <img src={character.image} alt={character.name} width={200} />
      <p><strong>Species:</strong> {character.species}</p>
      <p><strong>Status:</strong> {character.status}</p>
      <p><strong>Location:</strong> {character.location.name}</p>
      
      {/* Back Button */}
      <button
        onClick={() => router.back()} // Go back to the previous page
        className="btn btn-primary mt-3"
      >
        Back to Home
      </button>
    </div>

  );
};

export default CharacterDetails;
