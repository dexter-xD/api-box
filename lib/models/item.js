const db = require("../database/database");

class Item {
  constructor(name) {
    this.name = name;
  }

  async save() {
    try {
      const id = await db.createItem(this.name);
      return id;
    } catch (err) {
      throw new Error(`Failed to create item: ${err.message}`);
    }
  }

  static async getAll() {
    try {
      return await db.getAllItems();
    } catch (err) {
      throw new Error(`Failed to retrieve items: ${err.message}`);
    }
  }

  static async getById(id) {
    try {
      const item = await db.getItemById(id);
      if (!item) {
        throw new Error("Item not found");
      }
      return item;
    } catch (err) {
      throw new Error(`Failed to retrieve item: ${err.message}`);
    }
  }

  async update() {
    try {
      await db.updateItem(this.id, this.name);
    } catch (err) {
      throw new Error(`Failed to update item: ${err.message}`);
    }
  }

  async delete() {
    try {
      await db.deleteItem(this.id);
    } catch (err) {
      throw new Error(`Failed to delete item: ${err.message}`);
    }
  }
}

module.exports = Item;
