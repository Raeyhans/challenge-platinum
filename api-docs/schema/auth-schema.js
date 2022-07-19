module.exports = {
<<<<<<< HEAD
    Auth: {
      type: 'object',
      required: [
        "name"
      ],
      properties: {
        id: {
          type: "integer",
        },
        username: {
          type: "string",
        },
      }
    },
    Auth2: {
      type: 'object',
      required: [
        "name"
      ],
      properties: {
        id: {
          type: "integer",
        },
        username: {
          type: "string",
        },
        email: {
          type: "string",
        },
=======
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
>>>>>>> bf4066e71c168bdc34947da6052c3993d978feb0
      }
    }
  }