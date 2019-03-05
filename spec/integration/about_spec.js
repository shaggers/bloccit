const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/about/";

describe("routes : about", () => {

  describe("GET /about", () => {

    it("should return a status code 200", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("About Us");
        done();
      });
    });

  });
});