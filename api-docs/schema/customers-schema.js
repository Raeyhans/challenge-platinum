module.exports = {
    Customer: {
      type: 'object',
      required: [
        "name"
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
        address: {
            type: "string",
          },
        city: {
            type: "string",
          },
      }
    }
  }