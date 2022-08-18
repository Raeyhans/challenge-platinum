const app = require('../app');
const request = require('supertest');
const db = require('../models');

const loginAdmin = {
  username: 'admin1',
  password: 'admin1'
}

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

  it('POST /users with same data, response should be 400', async () => {
    const res = await request(app)
      .post('/users')
      .send({ username: 'admin1', email: 'admin1@gmail.com', name: 'Test invalid', pass: 'admin1' })
      .set('Accept', 'application/json');

    expect(res.status).toBe(400);
  })
})

describe('Login admin', () => {
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

  it('GET /users with valid token, response should be 200.', async () => {
    const response = await request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('data');
  })

  it('GET /users/id with valid token, response should be 200.', async () => {
    const parameter = 1
   
    const response = await request(app)
      .get('/users/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)

    expect(response.status).toEqual(200);
  })

  it('GET /users/id with valid token with not registered user, response should be 404.', async () => {
    const parameter = 7899
    
    const response = await request(app)
      .get('/users/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)

    expect(response.status).toEqual(404);
  })

  it('GET /users/id with valid token invalid user id, response should be 500.', async () => {
    const parameter = "abc123"
    const response = await request(app)
      .get('/users/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)

    expect(response.status).toEqual(500);
  })

  it('PUT /users/id with valid token, response should be 200.', async () => {
    const parameter = 1
    
    const response = await request(app)
      .put('/users/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)
      .send({
        name: 'Change name admin'
      })

    expect(response.status).toEqual(200);
  })

  it('PUT /users/id user id not found, response should be 404.', async () => {
    const parameter = 909091
    
    const response = await request(app)
      .put('/users/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)
      .send({
        title: 'Invalid change user'
      })

    expect(response.status).toEqual(404);
  })

})