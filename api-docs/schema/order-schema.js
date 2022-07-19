module.exports = {
    Order: {
      type: 'object',
      required: [
        "name"
      ],
      properties: {
<<<<<<< HEAD
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
>>>>>>> 3cb7340ad6d549ca33edab21125a92b916adb0e4
        },
      }
    },
    
  }