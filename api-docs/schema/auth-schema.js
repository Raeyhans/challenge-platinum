module.exports = {
    AuthAdmin: {
      type: 'object',
      required: [
        "username","password"
      ],
      properties: {
        username: {
          type: "string",
        },
        password: {
          type: "string",
        },
      }
    },
    AuthCustomer: {
      type: 'object',
      required: [
        "email","password"
      ],
      properties: {
        email: {
          type: "string",
        },
        password: {
          type: "string",
        },
      }
    },
    AuthSeller: {
      type: 'object',
      required: [
        "email","password"
      ],
      properties: {
        email: {
          type: "string",
        },
        password: {
          type: "string",
        },
      }
    },
  }