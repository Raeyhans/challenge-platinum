module.exports = {
    Order: {
      type: 'object',
      required: [
        "customer_id","total","qty","status"
      ],
      properties: {
        id: {
          "type": "integer",
          "example": "1"
        },
        price: {
          "type": "integer",
          "example": "215000"
        },
        qty: {
          "type": "integer",
          "example": "1"
        }
      },
      "xml": {
        "name": "Order"
      }
    },
    OrderDetail: {
      type: 'object',
      required: [
        "order_id","item_id","price","qty"
      ],
      properties: {
        id: {
          type: "integer",
        },
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
        created_at: {
          type: "string",
        },
        updated_at: {
          type: "string",
        },
      }
    },
    OrderById: {
      type: 'object',
      required: [
        "customer_id","total","qty","status"
      ],
      properties: {
        id: {
          type: "integer",
        },
        customer_id: {
          type: "integer",
        },
        total: {
          type: "integer",
        },
        qty: {
          type: "integer",
        },
        status: {
          type: "string",
        },
        created_at: {
          type: "string",
        },
        updated_at: {
          type: "string",
        },
        updated_by: {
          type: "string",
        },
        orderdetails: {
          type: "array",
          xml: {
            name: "orderdetails",
            wrapped: true
          },
          items: {
            $ref: "#/components/schemas/OrderDetail"
          }
        },
      }
    }
  }