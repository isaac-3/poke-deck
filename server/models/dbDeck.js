import mongoose from "mongoose";
const { Schema } = mongoose;

const deckSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  creater: {
    type: String,
    require: true,
  },
});

export default mongoose.model("decks", deckSchema);
