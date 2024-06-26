const { findByIdDB } = require("@repository/users");
jest.mock("@repository/users");

const personModel = require("@utils/users/personModel")

const { server } = require("@root/server");
const agent = require("supertest").agent(server);


afterAll(async () => {
    await server.close();
});

describe('GET /pessoas/[:id]', () => {
    describe('valid search', () => { 
        test('should respond with status code 200 OK and person data', async () => {
            findByIdDB.mockImplementationOnce(() => {
                return personModel;
            })
            const { status, body } =  await agent.get("/api/pessoas/2CA263F1-5C94-11E0-84CC-002170FBAC5B");
            expect(status).toBe(200);
            expect( body ).toMatchObject(personModel);
        });
    });

    describe('invalid search', () => {
        test('should respond status 404', async () => {
            findByIdDB.mockImplementationOnce(() => {
                return null;
            })
            const { status, body } =  await agent.get("/api/pessoas/2CA263F1-5C94-11E0-84CC-002170FBAC5B");
            expect(status).toBe(404);
            expect(body).toMatchObject({name:"UserNotFound"})
        })
    })
});