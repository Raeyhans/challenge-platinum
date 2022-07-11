module.exports = {
    '/auth/admin/login':{
      post:{
        tags: ["Auth"],
        summary: "Login Admin",
        description: "An endpoint to login Admin",
        operationId: "loginAdmin",
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
              description: "Successfully Login",
              content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/Auth'
                    }
                  }
                },
            },
            404: {
              description: "Wrong Username or Password"
            },
          }, 
                     
      }     
    },
    '/auth/admin/register':{
        post:{
          tags: ["Auth"],
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
                        $ref: '#/components/schemas/Auth2'
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
          '/auth/admin/register':{
        post:{
          tags: ["Auth"],
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
                        $ref: '#/components/schemas/Auth2'
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
      '/auth/account/login':{
        post:{
          tags: ["Auth"],
          summary: "Login Customer",
          description: "An endpoint to Login as Customer",
          operationId: "Login Customer",
          consumes: [
            "application/json"
          ],
          produces: [
            "application/json"
          ],   
          parameters: [
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
                description: "Successfully Login",
                content: {
                    'application/json': {
                      schema: {
                        $ref: '#/components/schemas/Auth2'
                      }
                    }
                  },
              },
              401: {
                description: "invalid"
              },
              404: {
                description: "Wrong Username or Password"
              }
            },            
        }     
      },
      '/auth/seller/login':{
        post:{
          tags: ["Auth"],
          summary: "Login Seller",
          description: "An endpoint to Login as Seller",
          operationId: "Login Seller",
          consumes: [
            "application/json"
          ],
          produces: [
            "application/json"
          ],   
          parameters: [
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
                description: "Successfully Login",
                content: {
                    'application/json': {
                      schema: {
                        $ref: '#/components/schemas/Auth2'
                      }
                    }
                  },
              },
              401: {
                description: "invalid"
              },
              404: {
                description: "Wrong Username or Password"
              }
            },            
        }     
      },
}