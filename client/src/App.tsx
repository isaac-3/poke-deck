import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles.scss";
import NewDeck from "./components/NewDeck";
import Navbar from "./components/Navbar";
import ViewDecks from "./components/ViewDecks";
import ViewDeck from "./components/ViewDeck";
import ViewCreaterDecks from "./components/ViewCreaterDecks";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={NewDeck} />
          <Route exact path="/decks" component={ViewDecks} />
          <Route exact path="/deck/:id" component={ViewDeck} />
          <Route
            exact
            path="/creater/:createrName"
            component={ViewCreaterDecks}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
