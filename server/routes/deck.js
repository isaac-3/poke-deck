import express from "express";
const router = express.Router();

import Deck from "../models/dbDeck.js";

router.get("/all-decks", async (req, res) => {
  const decks = await Deck.find({}).catch((err) => {
    return res.status(404).json({ ok: false, message: err.message });
  });

  return res.status(200).json({ ok: true, decks });
});

router.get("/creater-decks/:name", async (req, res) => {
  const { name } = req.params;
  const decks = await Deck.find({ creater: name }).catch((err) => {
    return res.status(404).json({ ok: false, message: err.message });
  });

  return res.status(200).json({ ok: true, decks });
});

router.get("/decks/:id", async (req, res) => {
  const { id } = req.params;
  const deck = await Deck.findById(id).catch((err) => {
    return res.status(404).json({ ok: false, message: err.message });
  });

  return res.status(200).json({ ok: true, deck });
});

router.post("/add-deck", async (req, res) => {
  const { name, creater } = req.body;

  if (!name) {
    return res.status(500).json({ ok: false, message: "Missing Fields" });
  }

  const deck = new Deck({
    name,
    creater,
  });

  await deck
    .save()
    .then(() => {
      return res.status(200).json({ ok: true, deck });
    })
    .catch((err) => {
      return res.status(500).json({ ok: false, message: err });
    });
});

router.patch("/update-deck/:id", async (req, res) => {
  const { id } = req.params;

  const deck = await Deck.findByIdAndUpdate(id, req.body, { new: true }).catch(
    (err) => {
      return res.status(404).json({ ok: false, message: err.message });
    }
  );

  return res.status(200).json({ ok: true, deck });
});

router.delete("/delete-deck/:id", async (req, res) => {
  const { id } = req.params;

  const deck = await Deck.findByIdAndDelete(id).catch((err) => {
    return res.status(404).json({ ok: false, message: err.message });
  });

  return res.status(200).json({ ok: true, deck });
});

export default router;
