const app = require('../app');
const request = require('supertest');
const db = require("../models");
const jwt = require("jsonwebtoken");

const loginCustomer = {
  email: 'customer1@gmail.com',
  password: 'customer1'
}

const loginAdmin = {
    username: 'admin1',
    password: 'admin1'
  }

const testID = {
  qty: 2,
}

const testItem = {
    items: [{
      id : 16,
      price : "119900",
      qty : 2
    }]
}

afterAll(() => {
  db.Orders.destroy({
    where: {
        qty: testID.qty
    }
  })
});

let validtoken= '';
let hasilcloudinary = '';


describe('Order end point', () => {
  it('POST /auth/account/login with valid email and pass, response should be 200', async () => {
    const res = await request(app)
      .post('/auth/account/login')
      .set('Accept', 'application/json')
      .send({
        email: loginCustomer.email,
        password: loginCustomer.password
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toMatch('string');
    validtoken = res.body.token;
  })

  it('POST /orders with valid values, response should be 201', async () => {
    console.log(testItem);
    const res = await request(app)
      .post('/orders')
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)
      .send(testItem);
    
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('data');
  })

  it('POST /orders invalid, response should be 500', async () => {
    const res = await request(app)
      .post('/orders')
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)
      .send("tes invalid");
    
    expect(res.status).toBe(500);
  })

  it('GET /orders with valid token, response should be 200.', async () => {
    const response = await request(app)
      .get('/orders')
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('data');
  })

  it('GET /orders/id with valid token, response should be 200.', async () => {
    const parameter = 21 // set item_id sesuai item yang telah dibuat sebelumnya
   
    const response = await request(app)
      .get('/orders/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)

    expect(response.status).toEqual(200);
  })

  it('GET /orders/id with valid token with not registered item, response should be 404.', async () => {
    const parameter = 7899
    
    const response = await request(app)
      .get('/orders/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)

    expect(response.status).toEqual(404);
  })

  it('GET /orders/id with valid token invalid item id, response should be 500.', async () => {
    const parameter = "abc123"
    const response = await request(app)
      .get('/orders/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)

    expect(response.status).toEqual(500);
  })

})

describe('Update order end point', () => {
    it('POST /auth/admin/login with valid email and pass, response should be 200', async () => {
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

    it('PUT /orders/id with valid token, response should be 200.', async () => {
        const parameter = 21 // set item_id sesuai item yang telah dibuat sebelumnya
        
        const response = await request(app)
          .put('/orders/'+ parameter)
          .set('Accept', 'application/json')
          .set('authorization', 'Bearer ' + validtoken)
          .send({
            status: "PAID"
          })
    
        expect(response.status).toEqual(200);
      })
    
      it('PUT /orders/id item id not found, response should be 404.', async () => {
        const parameter = 909091
        
        const response = await request(app)
          .put('/orders/'+ parameter)
          .set('Accept', 'application/json')
          .set('authorization', 'Bearer ' + validtoken)
          .send({
            status: "PAID"
          })
    
        expect(response.status).toEqual(404);
      })
})