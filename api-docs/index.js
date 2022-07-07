const userPath= require('./paths/users-path');
const userSchema= require ('./schema/users-schema')

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
    }
  ],
  paths: {
    ...userPath
  },
  components: {
    schemas: {
      ...userSchema,
    }
  },
}