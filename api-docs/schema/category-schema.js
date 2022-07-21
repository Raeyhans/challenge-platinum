module.exports = {
    Category: {
      type: 'object',
      required: [
        "title"
      ],
      properties: {
        seotitle: {
          type: "string",
        },
        title: {
        type: "string",
        }
      }
    }
  }