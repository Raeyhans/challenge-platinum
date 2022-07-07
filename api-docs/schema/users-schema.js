module.exports = {
    User: {
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
        name: {
            type: "string",
          },
        email: {
            type: "string",
          },
      }
    }
  }