import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Deck from "./Deck";

interface Decks {
  _id: string;
  name: string;
  creater: string;
}

const ViewCreaterDecks = () => {
  // @ts-ignore
  const { createrName } = useParams();
  const [decks, setDecks] = useState<Decks[]>([]);
  useEffect(() => {
    const fetchDecks = async () => {
      const res = await fetch(
        `http://localhost:9000/creater-decks/${createrName}`
      );
      const data = await res.json().then((res) => res.decks);
      setDecks(data);
    };
    fetchDecks();
  }, []);

  const renderDecks = decks.map((deck) => (
    <Deck
      key={deck._id}
      id={deck._id}
      creater={deck.creater}
      deckName={deck.name}
      editable={false}
    />
  ));
  return <div className="view-decks-page">{renderDecks}</div>;
};

export default ViewCreaterDecks;
