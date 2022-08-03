module.exports = {
    '/orders':{
      post:{
        tags: ["Order"],
        summary: "Create Order",
        description: "An endpoint to Create Order (Customer Access)",
        operationId: "CreateOrder",
        security: [{
          bearerAuth: []
        }],
        consumes: [
          "application/json"
        ],
        produces: [
          "application/json"
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  items: {
                    type: "array",
                    xml: {
                      name: "items",
                      wrapped: true
                    },
                    items: {
                      $ref: "#/components/schemas/Order"
                    }
                  }
                },
                required: ["id","price","qty"] 
              }
            }
          }
        },
        responses: {
            201: {
              description: "Successfully Created Order",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      items: {
                        type: "array",
                        xml: {
                          name: "items",
                          wrapped: true
                        },
                        items: {
                          $ref: "#/components/schemas/Order"
                        }
                      }
                    },
                    required: ["id","price","qty"] 
                  }
                }
              }
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
        security: [{
          bearerAuth: []
        }],
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
    '/orders/{id}':{
        get:{
          tags: ["Order"],
          summary: "Get Order by ID",
          description: "An endpoint to get Order by ID (Seller/Admin/Customer Access)",
          operationId: "GetOrderbyID",
          security: [{
            bearerAuth: []
          }],
          consumes: [
            "application/json"
          ],
          produces: [
            "application/json"
          ],   
          parameters: [
              {
                in: "path",
                name: "id",
                description: "OrderID",
                required: true,
                schema: {
                  type: "integer"
                }
              },
          ],
          responses: {
              200: {
                description: "Successfully Found Order",
                content: {
                    'application/json': {
                      schema: {
                        $ref: '#/components/schemas/OrderById'
                      },
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
        put:{
          tags: ["Order"],
          summary: "Edit Order by ID",
          description: "An endpoint to update status (Paid, Unpaid) by ID (Seller/Admin Access)",
          operationId: "EditOrderbyID",
          security: [{
            bearerAuth: []
          }],
          consumes: [
            "application/json"
          ],
          produces: [
            "application/json"
          ],   
          parameters: [
              {
                in: "path",
                name: "id",
                description: "order id",
                required: true,
                schema: {
                  type: "integer"
                }
              },
          ],
          requestBody: {
            content: {
              "application/x-www-form-urlencoded": {
                schema: {
                  type: "object",
                  properties: {
                    status: { 
                      description: "status",
                      type: "string"
                    }
                  },
                  required: ["status"] 
                }
              }
            }
          },
          responses: {
              200: {
                description: "Status updated",
                content: {
                  "application/x-www-form-urlencoded": {
                    schema: {
                      type: "object",
                      properties: {
                        status: { 
                          description: "status",
                          type: "string"
                        }
                      },
                      required: ["status"] 
                    }
                  }
                }
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