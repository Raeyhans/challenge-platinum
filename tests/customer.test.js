const app = require('../app');
const request = require('supertest');
const db = require('../models');

const testUser = {
    firstname: 'RegisterTest123',
    lastname: 'RegisterTest123',
    email: 'RegisterTest123@mail.com',
    password: 'RegisterTestPassword',
    address: 'RegisterTestAddress',
    city: 'RegisterTestCity'
  }

  const loginAdmin = {
    username: 'admin1',
    password: 'admin1',
  }

  const loginUser = {
    email: 'customer1@gmail.com',
    password: 'customer1',
  }

  afterAll(() => {
    db.Customers.destroy({
      where: {
        email: testUser.email
      }
    })
  });

let validToken = '';
let invalidToken = 'invalid-token';

describe('Register customer', () => {
  // it('POST /customers/account/register with valid values, response should be 201', async () => {
  //   const res = await request(app)
  //     .post('/customers/account/register')
  //     .send(testUser)
  //     .set('Accept', 'application/json');
  //   expect(res.status).toBe(201);
  // })

  it('POST /customers/account/register without password, response should be 400', async () => {
    const res = await request(app)
      .post('/customers/account/register')
      .send({ firstname: 'User invalid', email: 'test@invalid.com' })
      .set('Accept', 'application/json');

    expect(res.status).toBe(400);
  })

  it('POST /customers/account/register without email, response should be 400', async () => {
    const res = await request(app)
      .post('/customers/account/register')
      .send({ firstname: 'User invalid', pass: 'pass' })
      .set('Accept', 'application/json');

    expect(res.status).toBe(400);
  })
})

describe('Login customer', () => {
  it('POST /auth/account/login with valid email and pass, response should be 200', async () => {
    const res = await request(app)
      .post('/auth/account/login')
      .set('Accept', 'application/json')
      .send({
        email: loginUser.email,
        password: loginUser.password
      });

    expect(res.status).toBe(200);
  })

  it('POST /auth/account/login with wrong email, response should be 400', async () => {
    const res = await request(app)
      .post('/auth/account/login')
      .set('Accept', 'application/json')
      .send({
        email: 'wrong.email@gmail.com',
        password: loginUser.password
      });

    expect(res.status).toBe(400);
  })

  it('POST /auth/account/login with wrong password, response should be 400', async () => {
    const res = await request(app)
      .post('/auth/account/login')
      .set('Accept', 'application/json')
      .send({
        email: loginUser.email,
        password: 'WRONG PASSWORD'
      });

    expect(res.status).toBe(400);
  })
})

describe('Get all customer', () => {
  it('GET /customers with Unauthorized, response should be 401.', async () => {
    const response = await request(app)
      .get('/customers')
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

  it('GET /customers with valid login customer, response should be 200', async () => {
    const res = await request(app)
      .get('/customers')
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken);
    
    expect(res.status).toBe(200);
  })

  it('GET /customers/id with valid token, response should be 200.', async () => {
    const parameter = 1  
    const response = await request(app)
      .get('/customers/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)

    expect(response.status).toEqual(200);
  })

  it('GET /customers/id with valid token with not registered customer, response should be 404.', async () => {
    const parameter = 7899
    
    const response = await request(app)
      .get('/customers/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)

    expect(response.status).toEqual(404);
  })

  it('PUT /customers/id with valid token, response should be 200.', async () => {
    const parameter = 1
    
    const response = await request(app)
      .put('/customers/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)
      .send({
        lastname: 'Test update lastname',
        city: 'Test update city'
      })

    expect(response.status).toEqual(200);
  })

  it('PUT /customers/id item id not found, response should be 404.', async () => {
    const parameter = 909091
    
    const response = await request(app)
      .put('/customers/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)
      .send({
        lastname: 'Test update lastname',
        city: 'Test update city'
      })

    expect(response.status).toEqual(404);
  })

  // it('Delete /customers/id with valid token, response should be 200.', async () => {
  //   const parameter = 9;

  //   const response = await request(app)
  //     .delete('/customers/'+ parameter)
  //     .set('Accept', 'application/json')
  //     .set('authorization', 'Bearer ' + validtoken)

  //   expect(response.status).toEqual(200);
  // })
})