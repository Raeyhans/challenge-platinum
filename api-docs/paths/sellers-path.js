module.exports = {
    '/sellers': {
      post: {
        tags: ["Seller"],
        summary: "Register Seller",
        description: "An endpoint to create Seller",
        operationId: "addSeller",
        consumes: [
          "application/json"
        ],
        produces: [
          "application/json"
        ],
        parameters: [
          {
            in: "body",
            name: "firstname",
            description: "username yang akan digunakan",
            required: true,
            schema: {
              type: "string"
            }
          },
          {
            in: "body",
            name: "lastname",
            description: "Nama yang akan digunakan",
            required: true,
            schema: {
              type: "string"
            }
          },
          {
            in: "body",
            name: "Email",
            description: "email yang akan digunakan",
            required: true,
            schema: {
              type: "string",
            }
          },
          {
            in: "body",
            name: "Password",
            description: "Password yang akan digunakan",
            required: true,
            schema: {
              type: "string",
            }
          },
          {
            in: "body",
            name: "address",
            description: "Address yang akan digunakan",
            required: true,
            schema: {
              type: "string",
            }
          },
          {
            in: "body",
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
            description: "Success add new User",
            content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Seller'
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
        tags: ['Seller'],
        summary: 'get all Seller',
        operationId: "getallSeller",
        consumes: [
          "application/json"
        ],
        produces: [
          "application/json"
        ],
        responses: {
          200: {
            description: "Success get all Seller",
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User'
                }
              }
            },
          },
        },
      }
    },
    "/sellers/{sellerId}": {
      get: {
        tags: ['Seller'],
        summary: "Find seller by ID",
        description: "Returns a single seller",
        operationId: "getSellerById",
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
            description: "successfuly find seller",
            content: {
              'application/json': {
                schema: {
                  $ref: "#/components/schemas/Seller"
                }
              }
            }
          },
          400: {
            description: "Invalid"
          },
          404: {
            description: "Seller not found"
          }
        }
      },
      put: {
        tags: ['Seller'],
        summary: "Edit seller by ID",
        description: "Edit a single seller",
        operationId: "editSellerById",
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
            description: "successfuly Edit seller",
            content: {
              'application/json': {
                schema: {
                  $ref: "#/components/schemas/Seller"
                }
              }
            }
          },
          400: {
            description: "Invalid"
          },
          404: {
            description: "Seller not found"
          }
        }
      },
      delete: {
        tags: ['Seller'],
        summary: "delete seller by ID",
        description: "delete a single seller",
        operationId: "deleteSellerById",
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
            description: "successfuly delete seller",
            content: {
              'application/json': {
              }
            }
          },
          400: {
            description: "Invalid"
          },
          404: {
            description: "Seller not found"
          }
        }
      }
    }
    
  }