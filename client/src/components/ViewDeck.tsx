import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Deck from "./Deck";

interface DeckData {
  _id: string;
  name: string;
  creater: string;
}

const ViewDeck = () => {
  // @ts-ignore
  const { id } = useParams();
  const history = useHistory();
  const [renameInput, setRenameInput] = useState(false);
  const [newName, setNewName] = useState("");
  const [deck, setDeck] = useState<DeckData>({
    _id: "0",
    name: "",
    creater: "",
  });

  useEffect(() => {
    const fetchDecks = async () => {
      const res = await fetch(`http://localhost:9000/decks/${id}`);
      const data = await res.json().then((res) => res.deck);
      setDeck(data);
    };
    fetchDecks();
  }, []);

  const handleRemoveDeck = async () => {
    const removeRes = await fetch(`http://localhost:9000/delete-deck/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const removeData = await removeRes.json();
    if (removeRes.ok) {
      history.push("/decks");
    }
  };

  const handleRenameDeck = async () => {
    const updateRes = await fetch(`http://localhost:9000/update-deck/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newName,
      }),
    });
    const updateData = await updateRes.json().then((res) => res.deck);
    console.log(updateData);
    if (updateRes.ok) {
      setDeck(updateData);
      setRenameInput(!renameInput);
      setNewName("");
    }
  };

  return (
    <div className="view-deck-page">
      <h1>{deck.name}</h1>
      <p
        className="view-deck-page-actions-rename"
        onClick={() => setRenameInput(!renameInput)}
      >
        Rename deck
      </p>
      {renameInput && (
        <input
          className="poke-search"
          type="text"
          placeholder="Enter a new deck name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => {
            const key = e.keyCode || e.charCode;
            if (key === 13 && e.shiftKey === false) {
              handleRenameDeck();
            }
          }}
        />
      )}
      <p
        className="view-deck-page-actions-remove"
        onClick={() => handleRemoveDeck()}
      >
        Trash deck
      </p>
      <Deck id={id} creater={deck.creater} deckName={deck.name} editable />
    </div>
  );
};

export default ViewDeck;
