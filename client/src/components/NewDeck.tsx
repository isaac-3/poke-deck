import React, { useState } from "react";
import { useHistory } from "react-router";

interface Pokemon {
  id: string;
  name: string;
  abilities?: string[];
  type?: string[];
  image?: string;
}

const NewDeck = () => {
  const [deckName, setDeckName] = useState("");
  const [createrName, setCreaterName] = useState("");
  const [pokeSearch, setPokeSearch] = useState("");
  const [validDeck, setValidDeck] = useState(false);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const history = useHistory();

  const validateName = () => {
    deckName.length && createrName.length
      ? setValidDeck(true)
      : setValidDeck(false);
  };

  const handleFindSearch = async () => {
    const foundPoke = pokemons.findIndex(
      (pokemon) => pokemon.name === pokeSearch
    );
    if (pokemons.length < 7 && foundPoke === -1 && pokeSearch.trim().length) {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokeSearch}/`
      );
      if (res.ok) {
        const data = await res.json();
        const types = await data.types.map(
          (type: object) =>
            // @ts-ignore
            type["type"]["name"]
        );
        setPokemons([
          {
            id: data.id,
            name: data.name,
            image: data.sprites.front_default,
            type: types,
          },
          ...pokemons,
        ]);
        setPokeSearch("");
      }
    }
  };

  const handleSave = async () => {
    const deckRes = await fetch(`http://localhost:9000/add-deck`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: deckName,
        creater: createrName,
      }),
    });
    const deckData = await deckRes.json().then((res) => res.deck);

    pokemons.forEach(async (pokemon) => {
      const pokeRes = await fetch(`http://localhost:9000/add-pokemon`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: pokemon.name,
          abilities: pokemon.abilities,
          type: pokemon.type,
          image: pokemon.image,
          deckID: deckData._id,
        }),
      });
      const pokeData = await pokeRes.json();
    });
    history.push("/decks");
  };

  const handleRemovePokemon = (id: string) => {
    const updatedPokemons = pokemons.filter((pokemon) => pokemon.id !== id);
    setPokemons(updatedPokemons);
  };

  return (
    <div className="new-deck-page">
      {validDeck ? (
        <h1 className="page-title">{deckName}</h1>
      ) : (
        <h1 className="page-title">Create Your Poke Deck!</h1>
      )}
      {validDeck && (
        <input
          className="poke-search"
          type="text"
          placeholder="Search for a pokemon"
          value={pokeSearch}
          onChange={(e) => setPokeSearch(e.target.value)}
          onKeyDown={(e) => {
            const key = e.keyCode || e.charCode;
            if (key === 13 && e.shiftKey === false) {
              handleFindSearch();
            }
          }}
        />
      )}
      {validDeck ? (
        <div className="poke-new-deck-container">
          {pokemons.map((poke) => (
            <div
              className="deck-card-pokemon"
              key={poke.id}
              style={{ backgroundImage: `url(${poke.image})` }}
              onClick={() => handleRemovePokemon(poke.id)}
            >
              <h3>{poke.name}</h3>
              <p>(tap to remove)</p>
            </div>
          ))}
          {pokemons.length < 7 && (
            <div className="deck-card-pokemon">
              {7 - pokemons.length} slots available
            </div>
          )}
        </div>
      ) : (
        <div className="new-deck-inputs">
          <input
            type="text"
            placeholder="Enter your deck name"
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
            onKeyDown={(e) => {
              const key = e.keyCode || e.charCode;
              if (key === 13 && e.shiftKey === false) {
                validateName();
              }
            }}
          />
          <input
            type="text"
            placeholder="Enter your name"
            value={createrName}
            onChange={(e) => setCreaterName(e.target.value)}
            onKeyDown={(e) => {
              const key = e.keyCode || e.charCode;
              if (key === 13 && e.shiftKey === false) {
                validateName();
              }
            }}
          />
        </div>
      )}
      {validDeck && (
        <div className="new-deck-save" onClick={() => handleSave()}>
          Save
        </div>
      )}
    </div>
  );
};

export default NewDeck;
