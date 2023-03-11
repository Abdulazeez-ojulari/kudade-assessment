import request from "supertest";
import app from "../app";
import dotenv from "dotenv"
import dbCon from "../db/connection";
dotenv.config();

beforeEach(async () => {
    await dbCon(app);
});

describe("GET /order_items?limit=1&offset=1&sortBy=shipping_limit_date", () => {
    it("should return all order items", async () => {
      const res = await request(app)
                    .get("/order_items?limit=1&offset=1&sortBy=shipping_limit_date")
                    .set('Authorization', `Basic ${process.env.TOKEN}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(-1);
    });
});

describe("DELETE /order_items/:id", () => {
    it("should delete item", async () => {
      const res = await request(app)
                    .delete(`/order_items/${process.env.ORDER_ITEM_ID}`)
                    .set('Authorization', `Basic ${process.env.TOKEN}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.data._id).toBeDefined();
      expect(res.body.message).toEqual("Order deleted successfully");
    });
});