import React from "react";
import { useHistory } from "react-router";

const Navbar = () => {
  const history = useHistory();

  return (
    <div className="navbar">
      <button className="navbar-button" onClick={() => history.push("/")}>
        Home
      </button>
      <button className="navbar-button" onClick={() => history.push("/decks")}>
        View Decks
      </button>
    </div>
  );
};

export default Navbar;
