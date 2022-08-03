const app = require('../app');
const request = require('supertest');
const db = require("../models");

const testUser = {
    username: 'Test123',
    name: 'Test123',
    email: 'Test123@mail.com',
    password: 'TestPassword'
  }

  afterAll(() => {
    db.Users.destroy({
      where: {
        email: testUser.email
      }
    })
  });

let validtoken = '';
let invalidtoken = 'invalid-token';

describe('register user', () => {
    it('POST /users with valid values, response should be 201', async () => {
      const res = await request(app)
        .post('/users')
        .send(testUser)
        .set('Accept', 'application/json');
      expect(res.status).toBe(201);
      // expect(typeof res.body.message).toMatch('string');
    })

    it('POST /users invalid, response should be 500', async () => {
      const res = await request(app)
        .post('/users')
        .send({ name: 'Test invalid', email: 'test@invalid.com' })
        .set('Accept', 'application/json');
  
      expect(res.status).toBe(500);
    })

    it('POST /auth/admin/login with valid email and pass, response should be 200', async () => {
      const res = await request(app)
        .post('/auth/admin/login')
        .set('Accept', 'application/json')
        .send({
          username: testUser.username,
          password: testUser.password
        });
  
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(typeof res.body.token).toMatch('string');
      validtoken = res.body.token;
    })

    it('POST /auth/admin/login with invalid email and pass, response should be 200', async () => {
      const res = await request(app)
        .post('/auth/admin/login')
        .set('Accept', 'application/json')
        .send({
          username: "Invalid Username",
          password: "Invalid Password"
        });
  
      expect(res.status).toBe(400);
    })

    it('GET /users with valid token, response should be 200.', async () => {
      const response = await request(app)
        .get('/users')
        .set('Accept', 'application/json')
        .set('authorization', 'Bearer '+ validtoken);
  
      expect(response.status).toEqual(200);
    })

}

)