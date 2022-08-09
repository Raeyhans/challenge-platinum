module.exports = {
    Message: {
      type: 'object',
      required: [
        "message"
      ],
      properties: {
        chat_group: {
            type: "string",
        },
        message: {
        type: "string",
        },
        firstname: {
            type: "string",
        }
      }
    }
  }