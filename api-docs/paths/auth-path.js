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
                      $ref: '#/components/schemas/AuthAdmin'
                    }
                  }
                },
            },
            404: {
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
        operationId: "loginCustomer",
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
              description: "Email",
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
                      $ref: '#/components/schemas/AuthCustomer'
                    }
                  }
                },
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
        description: "An endpoint to login Seller",
        operationId: "loginSeller",
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
              description: "Email",
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
                      $ref: '#/components/schemas/AuthSeller'
                    }
                  }
                },
            },
            404: {
              description: "Wrong Username or Password"
            }
          },            
      }     
    },
  }
