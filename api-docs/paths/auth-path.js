module.exports = {
    '/auth/admin/login':{
      post:{
        tags: ["Auth"],
        summary: "Login Admin",
        description: "An endpoint to login Admin",
        operationId: "AuthAdmin",
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
                  password: {
                    description: "Password",
                    type: "string"
                  }
                },
                required: ["username","password"] 
              }
            }
          }
        },
        responses: {
            201: {
              description: "Successfully Login",
              content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/AuthAdmin'
                    }
                  }
                },
            },
            400: {
              description: "Wrong Username or Password"
            }
          },            
      }     
    },
    '/auth/account/login':{
      post:{
        tags: ["Auth"],
        summary: "Login Customer",
        description: "An endpoint to login Customer",
        operationId: "AuthCustomer",
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
                  email: { 
                    description: "Email",
                    type: "string"
                  },
                  password: {
                    description: "Password",
                    type: "string"
                  }
                },
                required: ["email","password"] 
              }
            }
          }
        },
        responses: {
            201: {
              description: "Successfully Login",
              content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/AuthCustomer'
                    }
                  }
                },
            },
            400: {
              description: "Wrong Email or Password"
            }
          },            
      }     
    },
    '/auth/seller/login':{
      post:{
        tags: ["Auth"],
        summary: "Login Seller",
        description: "An endpoint to login Seller",
        operationId: "AuthSeller",
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
                  email: { 
                    description: "Email",
                    type: "string"
                  },
                  password: {
                    description: "Password",
                    type: "string"
                  }
                },
                required: ["email","password"] 
              }
            }
          }
        },
        responses: {
            201: {
              description: "Successfully Login",
              content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/AuthSeller'
                    }
                  }
                },
            },
            400: {
              description: "Wrong Email or Password"
            }
          },            
      }     
    },
  }