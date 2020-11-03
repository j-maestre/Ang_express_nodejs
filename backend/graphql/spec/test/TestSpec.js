var request = require("request");
var server = require("../../app.js");
var base_url = "http://localhost:3002";

describe("Test",() =>{
    it("first test", () => {
        let number = 20;
        expect(number).toEqual(20);
    })
    describe("GET",() => {
        it ("returns status code 200", (done) => {
            request.get(base_url + "/api/articles", (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            });
        })
    });
});