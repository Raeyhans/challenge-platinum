module.exports = {
    Order: {
      type: 'object',
      required: [
<<<<<<< HEAD
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
=======
        "customer_id","total","qty","status"
      ],
      properties: {
        customer_id: {
          type: "integer",
        },
        total: {
          type: "string",
        },
        qty: {
          type: "string",
        },
>>>>>>> bf4066e71c168bdc34947da6052c3993d978feb0
        status: {
          type: "string",
          enum: [
            "Paid",
            "Unpaid",
          ]
        },
      }
    },
<<<<<<< HEAD
    Order2: {
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
=======
    OrderDetail: {
      type: 'object',
      required: [
        "order_id","item_id","price","qty"
      ],
      properties: {
        order_id: {
          type: "integer",
        },
        item_id: {
          type: "integer",
        },
        price: {
          type: "integer",
        },
        qty: {
          type: "integer",
>>>>>>> bf4066e71c168bdc34947da6052c3993d978feb0
        },
      }
    },
  }