module.exports = {
    '/users': {
      post: {
        tags: ["User"],
        summary: "Create User",
        description: "An endpoint to add User",
        operationId: "addUser",
        security: [{
          bearerAuth: []
        }],
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
                  username: { 
                    description: "Username",
                    type: "string"
                  },
                  name: {
                    description: "Name",
                    type: "string"
                  },
                  email: {
                    description: "Email",
                    type: "string"
                  },
                  password: {
                    description: "Password",
                    type: "string"
                  }
                },
                required: ["username","name","email","password"] 
              }
            }
          }
        },
        responses: {
          201: {
            description: "Success add new User",
            content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/User'
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
        tags: ['User'],
        summary: 'get all User',
        operationId: "getallUser",
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
            description: "Success get all User",
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
    "/users/{id}": {
      get: {
        tags: ['User'],
        summary: "Find user by ID",
        description: "Returns a single user",
        operationId: "getUserById",
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
            description: "successfuly find user",
            content: {
              'application/json': {
                schema: {
                  $ref: "#/components/schemas/User"
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
      put: {
        tags: ['User'],
        summary: "Edit user by ID",
        description: "Edit a single user",
        operationId: "editUserById",
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
        requestBody: {
          content: {
            "application/x-www-form-urlencoded": {
              schema: {
                type: "object",
                properties: {
                  id: { 
                    description: "User ID",
                    type: "integer"
                  },
                  name: {
                    description: "Name",
                    type: "string"
                  },
                  email: {
                    description: "Email",
                    type: "string"
                  },
                  password: {
                    description: "Password",
                    type: "string"
                  }
                },
                required: ["id","name","email","password"] 
              }
            }
          }
        },
        responses: {
          200: {
            description: "successfuly Edit user",
            content: {
              'application/json': {
                schema: {
                  $ref: "#/components/schemas/User"
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
        tags: ['User'],
        summary: "delete user by ID",
        description: "delete a single user",
        operationId: "deleteUserById",
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
            description: "successfuly delete user",
            content: {
              'application/json': {
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
      }
    },
    
  }