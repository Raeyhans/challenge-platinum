module.exports = {
    Order: {
      type: 'object',
      required: [
        "name"
      ],
      properties: {
        customer_ID: {
          type: "integer",
        },
        item_ID: {
          type: "integer",
        },
        qty: {
          type: "string",
        },
        total: {
          type: "string",
        },
        status: {
          type: "string",
          enum: [
            "Paid",
            "Unpaid",
          ]
        },
      }
    },
    
  }