const app = require('../app');
const request = require('supertest');
const db = require("../models");
const jwt = require("jsonwebtoken");
const testImage = './filetest/TEST.jpg';
const { delImage } =require ('../_helpers/cloudinary-destroy')

const loginSeller = {
  email: 'seller1@gmail.com',
  password: 'seller1'
}

const testID = {
  id: 19,
}

const testItem = {
    items: {
      category_id : 2,
      code : "P001",
      title : "Item 7",
      price : "199900",
      qty : 12
  }
}

afterAll(() => {
  db.Items.destroy({
    where: {
      category_id: testItem.items.category_id
    }
  })
});

let validtoken= '';
let hasilcloudinary = '';


describe('Item end point', () => {
  it('POST /auth/seller/login with valid email and pass, response should be 200', async () => {
    const res = await request(app)
      .post('/auth/seller/login')
      .set('Accept', 'application/json')
      .send({
        email: loginSeller.email,
        password: loginSeller.password
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(typeof res.body.token).toMatch('string');
    validtoken = res.body.token;
  })

  it('POST /items with valid values, response should be 201', async () => {
    const res = await request(app)
      .post('/items')
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)
      .send(testItem);
    
    expect(res.status).toBe(201);
  })

  it('POST /items with same code, response should be 400', async () => {
    const res = await request(app)
      .post('/items')
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)
      .send(testItem);
    
    expect(res.status).toBe(400);
  })

  it('POST /items invalid, response should be 500', async () => {
    const res = await request(app)
      .post('/items')
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)
      .send("tes invalid");
    
    expect(res.status).toBe(500);
  })

  it('POST /item/addImage with valid values, response should be 201', async () => {
    const res = await request(app)
      .post('/items/addImage')
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)
      .field('id_item', 13) // set item_id sesuai item yang telah dibuat sebelumnya
      .attach('image', testImage)
    
    expect(res.status).toBe(201);
  })

  it('POST /item/addImage with invalid id item, response should be 400', async () => {
    const res = await request(app)
      .post('/items/addImage')
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)
      .field('id_item', 9999)
      .attach('image', testImage);
    
    expect(res.status).toBe(400);
  })

  it('POST /item/addImage with empty image, response should be 400', async () => {
    const res = await request(app)
      .post('/items/addImage')
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)
      .field('id_item', 13);
    
    expect(res.status).toBe(400);
  })

  it('POST /items/addImage with invalid id item, response should be 500', async () => {
    const res = await request(app)
      .post('/items/addImage')
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)
      .send({
        id_item: "asdac123",
        }
      );
    expect(res.status).toBe(500);
  })

  it('GET /items with valid token, response should be 200.', async () => {
    const response = await request(app)
      .get('/items')
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('data');
  })

  it('GET /items/id with valid token, response should be 200.', async () => {
    const parameter = 13 // set item_id sesuai item yang telah dibuat sebelumnya
   
    const response = await request(app)
      .get('/items/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)

    expect(response.status).toEqual(200);
  })

  it('GET /items/id with valid token with not registered item, response should be 404.', async () => {
    const parameter = 7899
    
    const response = await request(app)
      .get('/items/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)

    expect(response.status).toEqual(404);
  })

  it('GET /items/id with valid token invalid item id, response should be 500.', async () => {
    const parameter = "abc123"
    const response = await request(app)
      .get('/items/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)

    expect(response.status).toEqual(500);
  })

  it('PUT /items/id with valid token, response should be 200.', async () => {
    const parameter = 15 // set item_id sesuai item yang telah dibuat sebelumnya
    
    const response = await request(app)
      .put('/items/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)
      .send({
        price: 145900,
        qty: 80
      })

    expect(response.status).toEqual(200);
  })

  it('PUT /items/id item id not found, response should be 404.', async () => {
    const parameter = 909091
    
    const response = await request(app)
      .put('/items/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)
      .send({
        price: 8800,
        qty: 80
      })

    expect(response.status).toEqual(404);
  })

  // it('Delete /items/id with valid token, response should be 200.', async () => {
  //   const parameter = testID.id;

  //   const response = await request(app)
  //     .delete('/items/'+ parameter)
  //     .set('Accept', 'application/json')
  //     .set('authorization', 'Bearer ' + validtoken)

  //   expect(response.status).toEqual(200);
  // })
})