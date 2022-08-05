const app = require('../app');
const request = require('supertest');
const db = require('../models');

const testUser = {
    firstname: 'Test123',
    lastname: 'Test123',
    email: 'Test123@mail.com',
    password: 'TestPassword',
    address: 'TestAddress',
    city: 'TestCity',
    code: 'TestCode'
  }

  const loginUser = {
    email: 'seller1@gmail.com',
    password: 'seller1',
  }

  afterAll(() => {
    db.Sellers.destroy({
      where: {
        email: testUser.email
      }
    })
  });

let validToken = '';
let invalidToken = 'invalid-token';

describe('Create seller', () => {
  it('POST /sellers/register with valid values, response should be 201', async () => {
    const res = await request(app)
      .post('/sellers/register')
      .send(testUser)
      .set('Accept', 'application/json');
    expect(res.status).toBe(201);
  })

  it('POST /sellers/register without password, response should be 400', async () => {
    const res = await request(app)
      .post('/sellers/register')
      .send({ firstname: 'User invalid', code: 'TESTCODE', email: 'test@invalid.com' })
      .set('Accept', 'application/json');

    expect(res.status).toBe(400);
  })

  it('POST /sellers/register without email, response should be 400', async () => {
    const res = await request(app)
      .post('/sellers/register')
      .send({ firstname: 'User invalid', code: 'TESTCODE', pass: 'pass' })
      .set('Accept', 'application/json');

    expect(res.status).toBe(400);
  })
})

describe('Login seller', () => {
  it('POST /auth/seller/login with valid email and pass, response should be 200', async () => {
    const res = await request(app)
      .post('/auth/seller/login')
      .set('Accept', 'application/json')
      .send({
        email: loginUser.email,
        password: loginUser.password
      });

    expect(res.status).toBe(200);
  })
})

describe('Get all seller', () => {
  it('GET /sellers with valid token, response should be 200.', async () => {
    const response = await request(app)
      .get('/sellers')
      .set('Accept', 'application/json')
      .set('authentication', 'Bearer ' + validToken);

    expect(response.status).toEqual(200);
  })

})