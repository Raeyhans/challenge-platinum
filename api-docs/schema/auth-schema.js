module.exports = {
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
      }
    }
  }