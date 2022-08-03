module.exports = {
    '/sellers/register': {
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
                  },
                  code: { 
                    description: "Seller Code",
                    type: "string"
                  }
                },
                required: ["firstname","email","password","address","city","code"] 
              }
            }
          }
        },
        responses: {
          201: {
            description: "You have successfully registered.",
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
    },
    '/sellers': {
      get: {
        tags: ['Seller'],
        summary: 'get all Seller',
        operationId: "getallSeller",
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
            description: "Success get all Seller",
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Seller'
                }
              }
            },
          },
          404: {
            description: "Empty seller"
          }
        },
      }
    },
    "/sellers/{id}": {
      get: {
        tags: ['Seller'],
        summary: "Find seller by ID",
        description: "Returns a single seller",
        operationId: "getSellerById",
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
        security: [{
          bearerAuth: []
        }],
        produces: [
          "application/json"
        ],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            type: "integer",
          },
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
                required: ["firstname","lastname","email","password","address","city"] 
              }
            }
          }
        },
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
        security: [{
          bearerAuth: []
        }],
        produces: [
          "application/json"
        ],
        parameters: [
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
    },
    '/sellers/account/verify/{token}': {
      put: {
        tags: ['Seller'],
        summary: "Activated account by token",
        description: "Activated account seller",
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
                  $ref: "#/components/schemas/Seller"
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