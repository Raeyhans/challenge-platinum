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
        summary: "Get Order",
        description: "An endpoint to Get All Order (Seller/Admin Access)",
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
    '/Orders/{orderID}':{
        get:{
          tags: ["Order"],
          summary: "Get Order by ID",
          description: "An endpoint to get Order by ID (Seller/Admin Access)",
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
          description: "An endpoint to edit Item by ID (Seller/Admin Access)",
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
                name: "ItemID",
                description: "ItemID",
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
                description: "Item not Found"
              }
            },            
        },
        delete:{
          tags: ["Item"],
          summary: "Delete Item by ID",
          description: "An endpoint to delete Item by ID (Seller/Admin/Cust Access)",
          operationId: "DeleteItembyID",
          consumes: [
            "application/json"
          ],
          produces: [
            "application/json"
          ],   
          parameters: [
              {
                in: "path",
                name: "ItemID",
                description: "ItemID",
                required: true,
                schema: {
                  type: "integer"
                }
              },
          ],
          responses: {
              201: {
                description: "Successfully Delete Item",
                content: {
                    'application/json': {
                      schema: {
                        $ref: '#/components/schemas/Item3'
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
      },
      '/items/addImage':{
        post:{
          tags: ["Item"],
          summary: "Add Image",
          description: "An endpoint to add Image to Item",
          operationId: "addImageItem",
          consumes: [
            "application/json"
          ],
          produces: [
            "application/json"
          ],   
          parameters: [
              {
                in: "path",
                name: "item_ID",
                description: "Item ID",
                required: true,
                schema: {
                  type: "string"
                }
              },
              {
                in: "path",
                name: "Picture",
                description: "Link of Picture",
                required: true,
                schema: {
                  type: "string"
                }
              },
          ],
          responses: {
              201: {
                description: "Successfully Register",
                content: {
                    'application/json': {
                      schema: {
                        $ref: '#/components/schemas/Item4'
                      }
                    }
                  },
              },
              401: {
                description: "invalid"
              }
            },            
        }     
      },
}