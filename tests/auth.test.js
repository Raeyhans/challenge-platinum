const app = require('../app');
const request = require('supertest');
const db = require('../models');

const loginAdmin = {
  username: 'admin1',
  password: 'admin1'
}

const loginSeller = {
    email: 'seller1@gmail.com',
    password: 'seller1'
}

const loginCustomer = {
    email: 'customer1@gmail.com',
    password: 'customer1'
}

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

  it('POST /auth/admin/login with invalid username, response should be 400', async () => { 
    const res = await request(app)
        .post('/auth/admin/login')
        .set('Accept', 'application/json')
        .send({
          username: 'invalidUsername',
          password: loginAdmin.password
        });
  
      expect(res.status).toBe(400);
    })

  it('POST /auth/admin/login with invavalid pass, response should be 400', async () => { 
    const res = await request(app)
        .post('/auth/admin/login')
        .set('Accept', 'application/json')
        .send({
          username: loginAdmin.username,
          password: 'invalidPassword'
        });
  
      expect(res.status).toBe(400);
    })
})

describe('Login seller', () => {
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
  
    it('POST /auth/seller/login with invalid email, response should be 400', async () => { 
      const res = await request(app)
          .post('/auth/seller/login')
          .set('Accept', 'application/json')
          .send({
            password: loginSeller.password
          });
    
        expect(res.status).toBe(400);
      })
  
    it('POST /auth/seller/login with invalid pass, response should be 400', async () => { 
      const res = await request(app)
          .post('/auth/seller/login')
          .set('Accept', 'application/json')
          .send({
            email: loginSeller.email
          });

        expect(res.status).toBe(400);
      })
  })

  describe('Login customer', () => {
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
  
    it('POST /auth/account/login with invalid email, response should be 400', async () => { 
      const res = await request(app)
          .post('/auth/account/login')
          .set('Accept', 'application/json')
          .send({
            email: 'invalidUsername',
            password: loginCustomer.password
          });
    
        expect(res.status).toBe(400);
      })
  
    it('POST /auth/account/login with invalid pass, response should be 400', async () => { 
      const res = await request(app)
          .post('/auth/account/login')
          .set('Accept', 'application/json')
          .send({
            email: loginCustomer.email,
            password: 'invalidPassword'
          });
    
        expect(res.status).toBe(400);
      })
  })