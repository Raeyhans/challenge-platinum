module.exports = {
    '/users': {
      post: {
        tags: ["User"],
        summary: "Create User",
        description: "An endpoint to add User",
        operationId: "addUser",
        consumes: [
          "application/json"
        ],
        produces: [
          "application/json"
        ],
        parameters: [
          {
            in: "body",
            name: "Username",
            description: "username yang akan digunakan",
            required: true,
            schema: {
              type: "string"
            }
          },
          {
            in: "body",
            name: "Name",
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
        ],
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
    '/users/admin/register':{
      post:{
        tags: ["User"],
        summary: "Register Admin",
        description: "An endpoint to register Admin",
        operationId: "registerAdmin",
        consumes: [
          "application/json"
        ],
        produces: [
          "application/json"
        ],   
        parameters: [
            {
              in: "path",
              name: "username",
              description: "Username",
              required: true,
              schema: {
                type: "string"
              }
            },
            {
              in: "path",
              name: "email",
              description: "Username",
              required: true,
              schema: {
                type: "string"
              }
            },
            {
              in: "path",
              name: "password",
              description: "Password",
              required: true,
              schema: {
                type: "string"
              }
            },
        ],
        responses: {
            201: {
              description: "Successfully Register",
              content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/User'
                    }
                  }
                },
            },
            401: {
              description: "invalid"
            }
          },            
      }     
    },
    "/users/{userId}": {
      get: {
        tags: ['User'],
        summary: "Find user by ID",
        description: "Returns a single user",
        operationId: "getUserById",
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
          }
        ],
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