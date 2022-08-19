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

const loginAdmin = {
  username: 'admin1',
  password: 'admin1',
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

describe('Register seller', () => {
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
      .send({ firstname: 'User invalid', lastname: 'Last Invalid Name', code: 'TESTCODE', pass: 'pass' })
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
  it('GET /sellers with Unauthorized, response should be 401.', async () => {
    const response = await request(app)
      .get('/sellers')
      .set('Accept', 'application/json');

    expect(response.status).toEqual(401);
  })
})

describe('Login admin end point', () => {
  it('POST /auth/admin/login with valid username and pass, response should be 200', async () => {
    const res = await request(app)
      .post('/auth/admin/login')
      .set('Accept', 'application/json')
      .send({
        username: loginAdmin.username,
        password: loginAdmin.password
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toMatch('string');
    validtoken = res.body.token;
  })

  it('GET /sellers with valid login admin, response should be 200', async () => {
    const res = await request(app)
      .get('/sellers')
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken);
    
    expect(res.status).toBe(200);
  })

  it('GET /sellers/id with valid token, response should be 200.', async () => {
    const parameter = 1
   
    const response = await request(app)
      .get('/sellers/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)

    expect(response.status).toEqual(200);
  })

  it('GET /sellers/id with valid token with not registered seller, response should be 404.', async () => {
    const parameter = 7899
    
    const response = await request(app)
      .get('/sellers/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)

    expect(response.status).toEqual(404);
  })

  it('PUT /sellers/id with valid token, response should be 200.', async () => {
    const parameter = 1
    
    const response = await request(app)
      .put('/sellers/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)
      .send({
        lastname: 'Change lastname seller'
      })

    expect(response.status).toEqual(200);
  })

  it('PUT /sellers/id user id not found, response should be 404.', async () => {
    const parameter = 909091
    
    const response = await request(app)
      .put('/sellers/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)
      .send({
        lastname: 'Invalid change seller'
      })

    expect(response.status).toEqual(404);
  })

  it('Delete /sellers/id with invalid id, response should be 404.', async () => {
    const parameter = 4449;

    const response = await request(app)
      .delete('/sellers/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)

    expect(response.status).toEqual(404);
  })
})