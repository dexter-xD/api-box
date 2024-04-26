const request = require("supertest");
const app = require("../src/api"); // Assuming your Express app is exported from api.js
const db = require("../lib/database/database");

beforeEach(async () => {
  await seedTestData();
});

describe("GET /items", () => {
  test("It should respond with status 200 and return an array of items", async () => {
    const response = await request(app).get("/items");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("GET /items/:id", () => {
  test("It should respond with status 200 and return the requested item", async () => {
    // Assuming there is an item with ID 1 in the test data
    const response = await request(app).get("/items/1");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", 1);
  });

  test("It should respond with status 404 if the item does not exist", async () => {
    // Assuming there is no item with ID 1000 in the test data
    const response = await request(app).get("/items/1000");
    expect(response.status).toBe(404);
  });
});

describe("POST /items", () => {
  test("It should create a new item and respond with status 201", async () => {
    const newItem = { name: "New Test Item" };

    const response = await request(app).post("/items").send(newItem);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");

    // Verify that the item was created in the database
    const createdItem = await db.getItemById(response.body.id);
    expect(createdItem).toBeDefined();
    expect(createdItem.name).toBe(newItem.name);
  });
});

describe("PUT /items/:id", () => {
  test("It should update an existing item and respond with status 200", async () => {
    const updatedItem = { name: "Updated Test Item" };

    const response = await request(app)
      .put("/items/1") // Assuming there is an item with ID 1 in the test data
      .send(updatedItem);

    expect(response.status).toBe(200);

    // Verify that the item was updated in the database
    const item = await db.getItemById(1);
    expect(item.name).toBe(updatedItem.name);
  });

  test("It should respond with status 404 if the item does not exist", async () => {
    const updatedItem = { name: "Updated Test Item" };

    const response = await request(app)
      .put("/items/1000") // Assuming there is no item with ID 1000 in the test data
      .send(updatedItem);

    expect(response.status).toBe(404);
  });
});

describe("DELETE /items/:id", () => {
  test("It should delete an existing item and respond with status 200", async () => {
    const response = await request(app).delete("/items/1"); // Assuming there is an item with ID 1 in the test data
    expect(response.status).toBe(200);

    // Verify that the item was deleted from the database
    const item = await db.getItemById(1);
    expect(item).toBeUndefined();
  });

  test("It should respond with status 404 if the item does not exist", async () => {
    const response = await request(app).delete("/items/1000"); // Assuming there is no item with ID 1000 in the test data
    expect(response.status).toBe(404);
  });
});

// Define seedTestData function to seed the test database with test data
async function seedTestData() {
  // Insert test records into the database
  await db.createItem("Test Item 1");
  await db.createItem("Test Item 2");
  // Add more test data as needed
}
