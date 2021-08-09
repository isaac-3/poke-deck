import express from "express";
const router = express.Router();

import Pokemon from "../models/dbPokemon.js";

router.get("/deck-pokemons/:id", async (req, res) => {
  const { id } = req.params;
  const pokemon = await Pokemon.find({ deckID: id }).catch((err) => {
    return res.status(404).json({ ok: false, message: err.message });
  });

  return res.status(200).json({ ok: true, pokemon });
});

router.post("/add-pokemon", async (req, res) => {
  const { name, abilities, type, image, deckID } = req.body;

  if (!name) {
    return res.status(500).json({ ok: false, message: "Missing Fields" });
  }
  const pokemon = new Pokemon({
    name,
    abilities,
    type,
    image,
    deckID,
  });

  await pokemon
    .save()
    .then(() => {
      return res.status(200).json({ ok: true, pokemon });
    })
    .catch((err) => {
      return res.status(500).json({ ok: false, message: err.message });
    });
});

router.delete("/delete-pokemon/:id", async (req, res) => {
  const { id } = req.params;

  const pokemon = await Pokemon.findByIdAndDelete(id).catch((err) => {
    return res.status(404).json({ ok: false, message: err.message });
  });

  return res.status(200).json({ ok: true, pokemon });
});

export default router;
