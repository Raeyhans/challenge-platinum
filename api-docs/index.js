const userPath= require('./paths/users-path');
const userSchema= require ('./schema/users-schema');
const customerSchema= require ('./schema/customers-schema');
const customerPath= require('./paths/customers-path');
const sellerSchema= require ('./schema/sellers-schema');
const sellerPath= require('./paths/sellers-path');
const authPath= require('./paths/auth-path');
const authSchema= require ('./schema/auth-schema');
const categoryPath= require('./paths/category-path');
const categorySchema= require ('./schema/category-schema');
const itemPath= require('./paths/item-path');
const itemSchema= require ('./schema/item-schema');
const orderPath= require('./paths/order-path');
const orderSchema= require ('./schema/order-schema');

module.exports = {
    openapi: '3.0.0',
    info: {
      title: 'Bingle API Documentation',
      description: 'How to use Bingle API',
      version: '1.0.0',
      termsOfService: 'https://google.com',
      contact:{
        name: "Bingle",
        url:'https://google.com',
        email: 'test123@mail.com',
      },
      license:{
        name: "Team 1 License",
        url: "https://google.com",
      }
    },
    host: 'localhost:3000',
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Server Dev',
      },
    ],
    tags: [
    {
      name: "Auth",
      description: "Auth Control"
    },
    {
      name: "User",
      description: "Everything about User Admin Access"
    },
    {
      name: "Customer",
      description: "Everything about Customer Access"
    },
    {
      name: "Seller",
      description: "Everything about Seller Access"
    },
    {
      name: "Category",
      description: "Everything about Category API"
    },
    {
      name: "Item",
      description: "Everything about Item API"
    },
    {
      name: "Order",
      description: "Everything about Order API"
    },
  ],
  paths: {
    ...authPath,
    ...userPath,
    ...customerPath,
    ...sellerPath,
    ...categoryPath,
    ...itemPath,
    ...orderPath,
  },
  components: {
    schemas: {
      ...authSchema,
      ...userSchema,
      ...customerSchema,
      ...sellerSchema,
      ...categorySchema,
      ...itemSchema,
      ...orderSchema,
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      }
   }
  },
}