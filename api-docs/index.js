const userPath= require('./paths/users-path');
const userSchema= require ('./schema/users-schema');
const customerSchema= require ('./schema/customers-schema');
const customerPath= require('./paths/customers-path');
const sellerSchema= require ('./schema/sellers-schema');
const sellerPath= require('./paths/sellers-path');
const authPath= require('./paths/auth-path');
const authSchema= require ('./schema/auth-schema');

module.exports = {
    // swagger: '2.0',
    openapi: '3.0.0',
    info: {
      title: 'E-Commerce API DOCS',
      description: 'How to use E-Commerce API',
      version: '1.0.0'
    },
    host: 'localhost:3000',
tags: [
    {
    name: "Auth",
    description: "Auth Control"
    },
    {
      name: "User",
      description: "Everything about User Access"
    },
    {
      name: "Customer",
      description: "Everything about Customer Access"
    },
    {
      name: "Seller",
      description: "Everything about Seller Access"
    },
  ],
  paths: {
    ...authPath,
    ...userPath,
    ...customerPath,
    ...sellerPath,
  },
  components: {
    schemas: {
      ...authSchema,
      ...userSchema,
      ...customerSchema,
      ...sellerSchema,
    }
  },
}