import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

interface DeckPokemon {
  _id: string;
  name: string;
  image: string;
  type: string[];
}

interface Props {
  id: string;
  creater: string;
  editable: boolean;
  deckName: string;
}

const Deck = ({ id, creater, editable, deckName }: Props) => {
  const history = useHistory();
  const [deckDetails, setDeckDetails] = useState<DeckPokemon[]>([]);
  useEffect(() => {
    const fetchDeckPokemons = async () => {
      const deckRes = await fetch(`http://localhost:9000/deck-pokemons/${id}`);
      const deckData = await deckRes.json().then((res) => res.pokemon);
      setDeckDetails(deckData);
    };
    fetchDeckPokemons();
  }, [id]);

  const handleRemovePokemon = async (id: string) => {
    const removeRes = await fetch(
      `http://localhost:9000/delete-pokemon/${id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const removeData = await removeRes.json();
    if (removeRes.ok) {
      const updatedPokemons = deckDetails.filter(
        (pokemon) => pokemon._id !== id
      );
      setDeckDetails(updatedPokemons);
    }
  };

  return (
    <div className="deck-card" onClick={() => history.push(`/deck/${id}`)}>
      <h3>Creater: {creater}</h3>
      <p>Deck Name: {deckName}</p>
      <div className="deck-card-pokemon-container">
        {deckDetails.map((pokemon) => (
          <div
            key={pokemon._id}
            className="deck-card-pokemon"
            style={{ backgroundImage: `url(${pokemon.image})` }}
          >
            <h3>{pokemon.name}</h3>
            {editable && (
              <p onClick={() => handleRemovePokemon(pokemon._id)}>Remove</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deck;
