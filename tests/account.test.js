import request from "supertest";
import app from "../app";
import dotenv from "dotenv"
import dbCon from "../db/connection";
dotenv.config();

beforeEach(async () => {
    await dbCon(app);
});

describe("PUT /account", () => {
    it("should update user", async () => {
      const res = await request(app)
                    .put("/account")
                    .send({
                        seller_city: "ketu",
                        seller_state: "SA"
                    })
                    .set('Authorization', `Basic ${process.env.TOKEN}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.data._id).toBeDefined();
      expect(res.body.message).toEqual("Seller updated successfully");
    });
});