module.exports = {
  '/items/': {
    post: {
      tags: ["Item"],
      summary: "Create Item",
      description: "An endpoint to create Item",
      requestBody: {
        required: true,
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: {
                category_id: {
                  type: 'integer',
                },
                code: {
                  type: 'string',
                },
                title: {
                  type: 'string',
                },
                price: {
                  type: 'integer',
                },
                qty: {
                  type: 'integer',
                },
              },
            },
          }
        }
      },
      responses: {
        200: {
          content: {
            'application/json': {
              example: {
                status: 201,
                message: 'Create item success',
              }
            }
          }
        }
      },
      security: [{
        bearerAuth: []
      }],
    }
},
    '/items/{id}':{
        get:{
          tags: ["Item"],
          summary: "Get Item by ID",
          description: "An endpoint to get Item by ID",
          operationId: "GetItembyID",
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
                description: "ItemID",
                required: true,
                schema: {
                  type: "integer"
                }
              },
          ],
          responses: {
              201: {
                description: "Successfully Found Item",
                content: {
                    'application/json': {
                      schema: {
                        $ref: '#/components/schemas/Item'
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
          tags: ["Item"],
          summary: "Edit item by ID",
          description: "An endpoint to edit Item by ID (Seller/Admin/Cust Access)",
          operationId: "EditItembyID",
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
                description: "ItemID",
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
                    price: { 
                      description: "price",
                      type: "integer"
                    },
                    qty: { 
                      description: "qty",
                      type: "integer"
                    }
                  },
                  required: ["price","qty"] 
                }
              }
            }
          },
          responses: {
              201: {
                description: "Successfully Edited Item",
                content: {
                    'application/json': {
                      schema: {
                        type: "object",
                        properties: {
                          price: { 
                            description: "price",
                            type: "integer"
                          },
                          qty: { 
                            description: "qty",
                            type: "integer"
                          }
                        },
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
          description: "An endpoint to delete Item by ID (Seller/Admin Access)",
          operationId: "DeleteItembyID",
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
                description: "ItemID",
                required: true,
                schema: {
                  type: "integer"
                }
              },
          ],
          responses: {
              200: {
                description: "Successfully Delete Item",
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
          security: [{
            bearerAuth: []
          }],
          consumes: [
            "multipart/form-data"
          ],
          produces: [
            "application/json"
          ],
          requestBody: {
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  properties: {
                    id_item: { 
                      description: "id item",
                      type: "integer"
                    },
                    image:{
                      type: 'array',
                      items:{
                        type: 'string',
                        format: 'binary'
                      }
                    }
                  },
                  required: ["id_item","image"] 
                }
              }
            }
          },
          responses: {
              201: {
                description: "Image added",
                content: {
                  "multipart/form-data": {
                    schema: {
                      type: "object",
                      properties: {
                        id_item: { 
                          description: "id item",
                          type: "integer"
                        },
                        image: {
                          description: "image",
                          type: "file"
                        },
                      },
                      required: ["id_item","image"] 
                    }
                  }
                }
              },
              400: {
                description: "Image is required"
              },
              500: {
                description: "Error: Internal Server Error"
              }
            },            
        }     
      },
}