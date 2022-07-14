module.exports = {
    '/customers/account/register': {
      post: {
        tags: ["Customer"],
        summary: "Create Customer",
        description: "An endpoint to add Customer",
        operationId: "addCustomer",
        consumes: [
          "application/json"
        ],
        produces: [
          "application/json"
        ],
        requestBody: {
          content: {
            "application/x-www-form-urlencoded": {
              schema: {
                type: "object",
                properties: {
                  firstname: { 
                    description: "First Name",
                    type: "string"
                  },
                  lastname: { 
                    description: "Last Name",
                    type: "string"
                  },
                  email: { 
                    description: "Email",
                    type: "string"
                  },
                  password: { 
                    description: "Password",
                    type: "string"
                  },
                  address: { 
                    description: "Address",
                    type: "string"
                  },
                  city: { 
                    description: "City",
                    type: "string"
                  }
                },
                required: ["firstname","email","password","address","city"] 
              }
            }
          }
        },
        responses: {
          201: {
            description: "Successfully register.",
            content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Customer'
                  }
                }
              },
          },
          400: {
            description: "Invalid"
          }
        },
      },
    },
    '/customers': {
      get: {
        tags: ['Customer'],
        summary: 'get all Customer',
        operationId: "getallCustomer",
        security: [{
          bearerAuth: []
        }],
        consumes: [
          "application/json"
        ],
        produces: [
          "application/json"
        ],
        responses: {
          200: {
            description: "Success get all Customer",
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Customer'
                }
              }
            },
          },
        },
      }
    },
    "/customers/{id}": {
      get: {
        tags: ['Customer'],
        summary: "Find customer by ID",
        description: "Returns a single Customer",
        operationId: "getCustomerById",
        security: [{
          bearerAuth: []
        }],
        produces: [
          "application/json"
        ],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            type: "integer",
          }
        ],
        responses: {
          200: {
            description: "successfuly find customer",
            content: {
              'application/json': {
                schema: {
                  $ref: "#/components/schemas/Customer"
                }
              }
            }
          },
          401: {
            description: "Unauthorized"
          },
          404: {
            description: "Customer not found"
          }
        }
      },
      put: {
        tags: ['Customer'],
        summary: "Edit customer by ID",
        description: "Edit a single Customer",
        operationId: "editCustomerById",
        security: [{
          bearerAuth: []
        }],
        produces: [
          "application/json"
        ],
        "parameters": [
          {
            name: "id",
            in: "path",
            required: true,
            type: "integer",
          },
          {
            name: "name",
            in: "path",
            required: true,
            type: "string",
          },
          {
            name: "username",
            in: "path",
            required: true,
            type: "string",
          },
          {
            name: "email",
            in: "path",
            required: true,
            type: "string",
          },
          {
            name: "password",
            in: "path",
            required: true,
            type: "string",
          },
          {
            name: "address",
            in: "path",
            required: true,
            type: "string",
          },
          {
            name: "city",
            in: "path",
            required: true,
            type: "string",
          },
        ],
        responses: {
          200: {
            description: "successfuly Edit customer",
            content: {
              'application/json': {
                schema: {
                  $ref: "#/components/schemas/Customer"
                }
              }
            }
          },
          400: {
            description: "Invalid"
          },
          404: {
            description: "User not found"
          }
        }
      },
      delete: {
        tags: ['Customer'],
        summary: "delete customer by ID",
        description: "delete a single customer",
        operationId: "deleteCustomerById",
        security: [{
          bearerAuth: []
        }],
        produces: [
          "application/json"
        ],
        "parameters": [
          {
            in: "path",
            name: "id",
            required: true,
            type: "integer",
          }
        ],
        responses: {
          200: {
            description: "successfuly delete customer",
            content: {
              'application/json': {
              }
            }
          },
          400: {
            description: "Invalid"
          },
          404: {
            description: "customer not found"
          }
        }
      }
    },
    '/customers/account/verify/{token}': {
      put: {
        tags: ['Customer'],
        summary: "Activated account by token",
        description: "Activated account customer",
        operationId: "ActivatedAccount",
        produces: [
          "application/json"
        ],
        parameters: [
          {
            name: "token",
            in: "path",
            required: true,
            type: "integer",
          },
        ],
        responses: {
          200: {
            description: "Your account successfuly activated.",
            content: {
              'application/json': {
                schema: {
                  $ref: "#/components/schemas/Customer"
                }
              }
            }
          },
          400: {
            description: "Invalid"
          },
          404: {
            description: "404 not found"
          }
        }
      }
    }
  }