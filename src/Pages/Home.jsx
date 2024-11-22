import { useState, useEffect } from "react";
import Buttons from "../Components/Buttons";
import ActionAreaCard from "../Components/Card";

export default function Home() {
  const [character, setCharacter] = useState(null);
  const [characterId, setCharacterId] = useState(1);
  const baseUrl = "https://rickandmortyapi.com/api/";

  const fetchCharacter = async (id) => {
    try {
      const response = await fetch(`${baseUrl}character/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCharacter(data);
    } catch (error) {
      console.error("Error fetching character:", error);
    }
  };

  useEffect(() => {
  fetchCharacter(characterId); 

  const interval = setInterval(() => {
    setCharacterId((prevId) => (prevId < 826 ? prevId + 1 : 1)); 
  }, 3000);

  return () => clearInterval(interval); 
}, [characterId]);

  return (
    <div className="Header">
      <h1>Welcome to the Rick and Morty Page</h1>
      <p>This is the home page of our Rick and Morty web application.</p>

      <Buttons text="Character" route="/Characters" />
      <br />
      {character ? (
        <ActionAreaCard
          imagen={character.image}
          titulo={character.name}
          cuerpo={`Status: ${character.status} Especie: ${character.species}`}
        />
      ) : (
        <p>Loading character...</p>
      )}
    </div>
  );
}
