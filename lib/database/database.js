const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)"
  );

  module.exports = {
    getAllItems: () => {
      return new Promise((resolve, reject) => {
        db.all("SELECT * FROM items", (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        });
      });
    },
    getItemById: (id) => {
      return new Promise((resolve, reject) => {
        db.get("SELECT * FROM items WHERE id = ?", [id], (err, row) => {
          if (err) reject(err);
          else resolve(row);
        });
      });
    },
    createItem: (name) => {
      return new Promise((resolve, reject) => {
        db.run("INSERT INTO items (name) VALUES (?)", [name], function (err) {
          if (err) reject(err);
          else resolve(this.lastID);
        });
      });
    },
    updateItem: (id, name) => {
      return new Promise((resolve, reject) => {
        db.run(
          "UPDATE items SET name = ? WHERE id = ?",
          [name, id],
          function (err) {
            if (err) reject(err);
            else resolve(this.changes);
          }
        );
      });
    },
    deleteItem: (id) => {
      return new Promise((resolve, reject) => {
        db.run("DELETE FROM items WHERE id = ?", [id], function (err) {
          if (err) reject(err);
          else resolve(this.changes);
        });
      });
    },
  };
});
