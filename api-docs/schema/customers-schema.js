module.exports = {
    Customer: {
      type: 'object',
      required: [
        "firstname","email","password","address","city","code"
      ],
      properties: {
        id: {
          type: "integer",
        },
        firstname: {
          type: "string",
        },
        lastname: {
            type: "string",
        },
        email: {
            type: "string",
        },
        password: {
          type: "string",
        },
        address: {
            type: "string",
        },
        city: {
            type: "string",
        },
        code: {
          type: "string",
        },
      }
    }
  }