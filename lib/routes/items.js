const express = require("express");
const Item = require("../models/item");
const db = require("../database/database");

const router = express.Router();

// GET all items
router.get("/", async (req, res) => {
  try {
    const items = await db.getAllItems();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single item
router.get("/:id", async (req, res) => {
  try {
    const item = await db.getItemById(req.params.id);
    if (!item) {
      res.status(404).json({ error: "Item not found" });
    } else {
      res.json(item);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new item
router.post("/", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ error: "Name is required" });
  } else {
    try {
      const item = new Item(name);
      const itemId = await item.save();
      res.status(201).json({ id: itemId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
});

// PUT update item
router.put("/:id", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({ error: "Name is required" });
  } else {
    try {
      const updatedRows = await db.updateItem(req.params.id, name);
      if (updatedRows === 0) {
        res.status(404).json({ error: "Item not found" });
      } else {
        res.json({ message: "Item updated successfully" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
});

// DELETE item
router.delete("/:id", async (req, res) => {
  try {
    const deletedRows = await db.deleteItem(req.params.id);
    if (deletedRows === 0) {
      res.status(404).json({ error: "Item not found" });
    } else {
      res.json({ message: "Item deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
