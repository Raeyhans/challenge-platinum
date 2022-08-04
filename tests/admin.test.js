const app = require('../app');
const request = require('supertest');
const db = require('../models');

const testUser = {
    username: 'Test123',
    name: 'Test123',
    email: 'Test123@mail.com',
    password: 'TestPassword'
  }

  afterAll(() => {
    db.Users.destroy({
      where: {
        username: testUser.username
      }
    })
  });

let validToken = '';
let invalidToken = 'invalid-token';

describe('Create admin', () => {
    it('POST /users with valid values, response should be 201', async () => {
      const res = await request(app)
        .post('/users')
        .send(testUser)
        .set('Accept', 'application/json');
      expect(res.status).toBe(201);
    })

  it('POST /users without password, response should be 400', async () => {
    const res = await request(app)
      .post('/users')
      .send({ username: 'User invalid', name: 'Test invalid', email: 'test@invalid.com' })
      .set('Accept', 'application/json');

    expect(res.status).toBe(400);
  })

  it('POST /users without email, response should be 400', async () => {
    const res = await request(app)
      .post('/users')
      .send({ username: 'User invalid', name: 'Test invalid', pass: 'pass' })
      .set('Accept', 'application/json');

    expect(res.status).toBe(400);
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
  })

  it('GET /users with valid token, response should be 200.', async () => {
    const response = await request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .set('authentication', 'Bearer ' + validToken);

    expect(response.status).toEqual(200);
  })

})