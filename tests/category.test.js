const app = require('../app');
const request = require('supertest');
const db = require("../models");
const jwt = require("jsonwebtoken");

const loginAdmin = {
  username: 'admin1',
  password: 'admin1'
}

const testID = {
  id: 11,
}

const testItem = {
  title: 'Category 20'
}

afterAll(() => {
  db.Categories.destroy({
    where: {
      title: testItem.title
    }
  })
});

let validtoken= '';

describe('Category end point', () => {
  it('POST /auth/admin/login with valid username and password, response should be 200', async () => {
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

  it('POST /categories with valid values, response should be 201', async () => {
    const res = await request(app)
      .post('/categories')
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)
      .send(testItem);
    
    expect(res.status).toBe(201);
  })

  it('POST /categories with same code, response should be 400', async () => {
    const res = await request(app)
      .post('/categories')
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)
      .send(testItem);
    
    expect(res.status).toBe(400);
  })

  it('POST /categories invalid, response should be 500', async () => {
    const res = await request(app)
      .post('/categories')
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)
      .send("tes invalid");
    
    expect(res.status).toBe(500);
  })

  it('GET /categories with valid token, response should be 200.', async () => {
    const response = await request(app)
      .get('/categories')
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('data');
  })

  it('GET /categories/id with valid token, response should be 200.', async () => {
    const parameter = 3
   
    const response = await request(app)
      .get('/categories/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)

    expect(response.status).toEqual(200);
  })

  it('GET /categories/id with valid token with not registered item, response should be 404.', async () => {
    const parameter = 7899
    
    const response = await request(app)
      .get('/categories/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)

    expect(response.status).toEqual(404);
  })

  it('GET /categories/id with valid token invalid item id, response should be 500.', async () => {
    const parameter = "abc123"
    const response = await request(app)
      .get('/categories/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)

    expect(response.status).toEqual(500);
  })

  it('PUT /categories/id with valid token, response should be 200.', async () => {
    const parameter = 3
    
    const response = await request(app)
      .put('/categories/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)
      .send({
        title: 'Category 5'
      })

    expect(response.status).toEqual(200);
  })

  it('PUT /categories/id item id not found, response should be 404.', async () => {
    const parameter = 909091
    
    const response = await request(app)
      .put('/categories/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)
      .send({
        title: 'Invalid put category'
      })

    expect(response.status).toEqual(404);
  })

  it('Delete /categories/id with invalid id, response should be 404.', async () => {
    const parameter = 2387325;

    const response = await request(app)
        .delete('/categories/'+ parameter)
        .set('Accept', 'application/json')
        .set('authorization', 'Bearer ' + validtoken)

    expect(response.status).toEqual(404);
    })
})