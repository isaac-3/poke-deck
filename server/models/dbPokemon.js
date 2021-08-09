import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const pokemonSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  abilities: {
    type: Array,
    default: [],
    required: true,
  },
  type: {
    type: Array,
    default: [],
  },
  image: {
    type: String,
  },
  deckID: {
    type: ObjectId,
    required: true,
  },
});

export default mongoose.model("pokemons", pokemonSchema);
