module.exports = {
    '/customers': {
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
        parameters: [
          {
            in: "path",
            name: "firstname",
            description: "username yang akan digunakan",
            required: true,
            schema: {
              type: "string"
            }
          },
          {
            in: "path",
            name: "lastname",
            description: "Nama yang akan digunakan",
            required: true,
            schema: {
              type: "string"
            }
          },
          {
            in: "path",
            name: "Email",
            description: "email yang akan digunakan",
            required: true,
            schema: {
              type: "string",
            }
          },
          {
            in: "path",
            name: "Password",
            description: "Password yang akan digunakan",
            required: true,
            schema: {
              type: "string",
            }
          },
          {
            in: "path",
            name: "address",
            description: "Address yang akan digunakan",
            required: true,
            schema: {
              type: "string",
            }
          },
          {
            in: "path",
            name: "city",
            description: "City yang akan digunakan",
            required: true,
            schema: {
              type: "string",
            }
          },
        ],
        responses: {
          201: {
            description: "Success add new Customer",
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
      get: {
        tags: ['Customer'],
        summary: 'get all Customer',
        operationId: "getallCustomer",
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
    "/customers/{customerId}": {
      get: {
        tags: ['Customer'],
        summary: "Find customer by ID",
        description: "Returns a single Customer",
        operationId: "getCustomerById",
        produces: [
          "application/json"
        ],
        "parameters": [
          {
            name: "id",
            in: "path",
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
          400: {
            description: "Invalid"
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
        produces: [
          "application/json"
        ],
        "parameters": [
          {
            name: "id",
            in: "path",
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
    }
    
  }