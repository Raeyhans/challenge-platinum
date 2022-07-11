module.exports = {
    '/orders':{
      post:{
        tags: ["Order"],
        summary: "Create Order",
        description: "An endpoint to Create Order (Customer Access)",
        operationId: "CreateOrder",
        consumes: [
          "application/json"
        ],
        produces: [
          "application/json"
        ],   
        parameters: [
            {
              in: "path",
              name: "customer_id",
              description: "Customer ID",
              required: true,
              schema: {
                type: "integer"
              },
            },
            {
              in: "path",
              name: "item_id",
              description: "Item ID",
              required: true,
              schema: {
                type: "integer"
              },
            },
            {
              in: "path",
              name: "qty",
              description: "Total Quantity",
              required: true,
              schema: {
                type: "integer"
              },
            },
            {
              in: "path",
              name: "total",
              description: "Total Price",
              required: true,
              schema: {
                type: "integer"
              }
            },
            {
              in: "path",
              name: "status",
              description: "Payment Status",
              required: true,
              schema: {
                type: "string"
              },
              enum: [
                "Paid",
                "Unpaid",
              ]
            },
        ],
        responses: {
            201: {
              description: "Successfully Created Order",
              content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/Order'
                    }
                  }
                },
            },
            400: {
              description: "Invalid"
            },
          },                      
      },
      get:{
        tags: ["Order"],
        summary: "Get All Order",
        description: "An endpoint to Get All Order (Admin/Seller Access)",
        operationId: "GetOrder",
        consumes: [
          "application/json"
        ],
        produces: [
          "application/json"
        ],   
        responses: {
            201: {
              description: "Successfully Get All Orders",
              content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/Order'
                    }
                  }
                },
            },
            400: {
              description: "Invalid"
            },
          }, 
        }     
    },
    '/orders/{orderID}':{
        get:{
          tags: ["Order"],
          summary: "Get Order by ID",
          description: "An endpoint to get Order by ID (Seller/Admin/Customer Access)",
          operationId: "GetOrderbyID",
          consumes: [
            "application/json"
          ],
          produces: [
            "application/json"
          ],   
          parameters: [
              {
                in: "path",
                name: "OrderID",
                description: "OrderID",
                required: true,
                schema: {
                  type: "integer"
                }
              },
          ],
          responses: {
              201: {
                description: "Successfully Found Order",
                content: {
                    'application/json': {
                      schema: {
                        $ref: '#/components/schemas/Order'
                      }
                    }
                  },
              },
              401: {
                description: "Invalid"
              },
              404: {
                description: "Item not Found"
              }
            },            
        },
        put:{
          tags: ["Order"],
          summary: "Edit Order by ID",
          description: "An endpoint to update status (Paid, Unpaid) by ID (Seller/Admin Access)",
          operationId: "EditOrderbyID",
          consumes: [
            "application/json"
          ],
          produces: [
            "application/json"
          ],   
          parameters: [
              {
                in: "path",
                name: "order_id",
                description: "order id",
                required: true,
                schema: {
                  type: "integer"
                }
              },
          ],
          responses: {
              201: {
                description: "Successfully Edited Item",
                content: {
                    'application/json': {
                      schema: {
                        $ref: '#/components/schemas/Order'
                      }
                    }
                  },
              },
              401: {
                description: "Invalid"
              },
              404: {
                description: "Order not Found"
              }
            },            
        },
      },

}