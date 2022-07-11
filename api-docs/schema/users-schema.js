module.exports = {
    User: {
      type: 'object',
      required: [
        "username","name","password","email"
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
        password: {
          type: "string",
      },
      }
    }
  }