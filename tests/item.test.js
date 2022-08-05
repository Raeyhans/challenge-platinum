const app = require('../app');
const request = require('supertest');
const db = require("../models");
const jwt = require("jsonwebtoken");
const testImage = './filetest/TEST.jpg';
const { delImage } =require ('../_helpers/cloudinary-destroy')

const loginSeller = {
    email: 'seller123@mail.com',
    password: 'seller123'
  }

const testdelItem = {
    category_id: 778,
    code: "DELETE",
    title: "DELETE",
    price: 5000,
    qty: 100,
}

describe('Item Delete Endpoints',()=>{
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
      .post('/items/')
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)
      .send(testdelItem);
 
    expect(res.status).toBe(201);
  })

  it('Delete /item/id with valid token, response should be 200.', async () => {
    let cek = await db.Items.findOne({
      where:{
        category_id : testdelItem.category_id
      }
    })

console.log(cek.id,"<<<CEK ID")
    
    const parameter = cek.id
    const response = await request(app)
      .delete('/items/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)

    expect(response.status).toEqual(200);
  })
})


const testItem = {
    category_id: 888,
    code: "600",
    title: "Bakmie",
    price: 5000,
    qty: 100,
}

const editItem={
  price: 100,
  qty:50
}

afterAll(() => {
  db.Items.destroy({
    where: {
      category_id: testItem.category_id
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

  it('POST /item with valid values, response should be 201', async () => {
    const res = await request(app)
      .post('/items/')
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)
      .send(testItem);
    
    expect(res.status).toBe(201);
  })

  it('POST /item with same code, response should be 400', async () => {
    const res = await request(app)
      .post('/items/')
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)
      .send(testItem);
    
    expect(res.status).toBe(400);
  })

  it('POST /item invalid, response should be 500', async () => {
    const res = await request(app)
      .post('/items/')
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
      .field('id_item', 49)
      .attach('image', testImage)
    
    expect(res.status).toBe(201);
  })

  it('POST /item/addImage with invalid id item, response should be 400', async () => {
    const res = await request(app)
      .post('/items/addImage')
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)
      .send({
        id_item: 9999,
      }
      );
    
    expect(res.status).toBe(400);
  })

  it('POST /item/addImage with invalid id item, response should be 500', async () => {
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

  it('GET /items/ with valid token, response should be 200.', async () => {

    const response = await request(app)
      .get('/items/')
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('data');
  })

  it('GET /items/id with valid token, response should be 200.', async () => {
    const parameter = 12
    //12 ADALAH ITEM_ID YANG SUDAH TERDAFTAR
    const response = await request(app)
      .get('/items/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)

    expect(response.status).toEqual(200);
  })

  it('GET /items/id with valid token with not registered item, response should be 404.', async () => {
    const parameter = 7899
    //7899 ADALAH ITEM_ID YANG SUDAH TIDAK TERDAFTAR
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
    const parameter = 12
    //12 ADALAH ITEM_ID YANG SUDAH TERDAFTAR
    const response = await request(app)
      .put('/items/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)
      .send({
        price: 8800,
        qty: 80
      })

    expect(response.status).toEqual(200);
  })

  it('PUT /items/id item id not found, response should be 404.', async () => {
    const parameter = 909091
    //12 ADALAH ITEM_ID YANG SUDAH TERDAFTAR
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

  it('PUT /items/id with valid token, response should be 500.', async () => {
    const parameter = "zxcasd123"
    //12 ADALAH ITEM_ID YANG SUDAH TERDAFTAR
    const response = await request(app)
      .put('/items/'+ parameter)
      .set('Accept', 'application/json')
      .set('authorization', 'Bearer ' + validtoken)
      .send({
        price: 8800,
        qty: 80
      })

    expect(response.status).toEqual(500);
  })

}
)