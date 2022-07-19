module.exports = {
    Customer: {
      type: 'object',
      required: [
        "firstname","email","password","address","city"
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
      }
    }
  }