module.exports = {
    Order: {
      type: 'object',
      required: [
        "customer_id","total","qty","status"
      ],
      properties: {
        // customer_id: {
        //   type: "integer",
        // },
        // total: {
        //   type: "string",
        // },
        // qty: {
        //   type: "string",
        // },
        // status: {
        //   type: "string",
        //   enum: [
        //     "Paid",
        //     "Unpaid",
        //   ]
        // },
        id: {
          type: "integer",
        },
        price: {
          type: "integer",
        },
        qty: {
          type: "integer",
        },
      }
    },
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
        },
      }
    },
  }