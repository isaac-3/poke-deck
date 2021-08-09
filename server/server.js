import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import deck from "./routes/deck.js";
import pokemon from "./routes/pokemon.js";
import keys from './config/keys.js'

const port = 9000;

mongoose.connect(keys["MONGOURI"], {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.once("open", () => console.log("Connected to mongoDB"));

const app = express();

app.use(express.json());
app.use(cors());

app.use(deck);
app.use(pokemon);

app.listen(port, () => console.log(`listening on port${port}`));
