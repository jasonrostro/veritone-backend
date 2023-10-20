const request = require("supertest");
const app = require("../index"); // Make sure to provide the correct path to your index.js file
const db = require("../config/db.config");
const Product = require("../models/Product");

describe("Product API", () => {
  beforeEach(async () => {
    await db.sequelize.sync({ force: true });
  });

  afterEach(async () => {
    await db.sequelize.drop();
  });

  describe("GET /api/products", () => {
    test("should return all products", async () => {
      await Product.bulkCreate([
        {
          name: "Product A",
          description: "Description A",
          count: 5,
          purchased: false,
        },
        {
          name: "Product B",
          description: "Description B",
          count: 10,
          purchased: false,
        },
        {
          name: "Product C",
          description: "Description C",
          count: 2,
          purchased: true,
        },
      ]);

      const response = await request(app).get("/api/products");

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(3);
      expect(response.body[0].name).toBe("Product A");
      expect(response.body[1].name).toBe("Product B");
      expect(response.body[2].name).toBe("Product C");
    });
  });

  describe("POST /api/products", () => {
    test("should create a new product", async () => {
      const newProduct = {
        name: "New Product",
        description: "New Description",
        count: 7,
      };

      const response = await request(app)
        .post("/api/products")
        .send(newProduct);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Successfully created");
      expect(response.body.product.name).toBe("New Product");
      expect(response.body.product.description).toBe("New Description");
      expect(response.body.product.count).toBe(7);
      expect(response.body.product.purchased).toBe(false);
    });
  });

  describe("PUT /api/products/:id", () => {
    test("should update a product", async () => {
      const productToUpdate = await Product.create({
        name: "Product A",
        description: "Old Description",
        count: 5,
        purchased: false,
      });

      const updatedProduct = {
        name: "Updated Product",
        description: "Updated Description",
        count: 10,
        purchased: true,
      };

      const response = await request(app)
        .put(`/api/products/${productToUpdate.id}`)
        .send(updatedProduct);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Successfully updated.");

      const product = await Product.findByPk(productToUpdate.id);
      expect(product.name).toBe("Updated Product");
      expect(product.description).toBe("Updated Description");
      expect(product.count).toBe(10);
      expect(product.purchased).toBe(true);
    });
  });

  describe("DELETE /api/products/:id", () => {
    test("should delete a product", async () => {
      const productToDelete = await Product.create({
        name: "Product A",
        description: "Description A",
        count: 5,
        purchased: false,
      });

      const response = await request(app).delete(
        `/api/products/${productToDelete.id}`
      );

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Successfully deleted.");
    });
  });
});
