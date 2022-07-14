module.exports = {
    '/items':{
      post:{
        tags: ["Item"],
        summary: "Create Item",
        description: "An endpoint to Create Item (Seller/Admin Access)",
        operationId: "CreateItem",
        consumes: [
          "application/json"
        ],
        produces: [
          "application/json"
        ],   
        parameters: [
            {
              in: "path",
              name: "category_id",
              description: "Item Category",
              required: true,
              schema: {
                type: "string"
              },
              enum: [
                "kategori 1",
                "kategori 2",
                "kategori 3"
              ]
            },
            {
              in: "path",
              name: "code",
              description: "Item Code",
              required: true,
              schema: {
                type: "integer"
              }
            },
            {
              in: "path",
              name: "seotitle",
              description: "SEO Title",
              required: true,
              schema: {
                type: "string"
              }
            },
            {
              in: "path",
              name: "title",
              description: "Title of Item",
              required: true,
              schema: {
                type: "string"
              }
            },
            {
              in: "path",
              name: "price",
              description: "Price of Item",
              required: true,
              schema: {
                type: "integer"
              }
            },
            {
              in: "path",
              name: "qty",
              description: "Quantity of Item",
              required: true,
              schema: {
                type: "integer"
              }
            },
        ],
        responses: {
            201: {
              description: "Successfully Created Item",
              content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/Item'
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
        tags: ["Item"],
        summary: "Get Item",
        description: "An endpoint to Get All Items (Seller/Admin/Cust Access)",
        operationId: "GetItem",
        consumes: [
          "application/json"
        ],
        produces: [
          "application/json"
        ],   
        responses: {
            201: {
              description: "Successfully Get All Items",
              content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/Item'
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
    '/items/{id}':{
        get:{
          tags: ["Item"],
          summary: "Get Item by ID",
          description: "An endpoint to get Item by ID (Seller/Admin/Cust Access)",
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
                description: "Successfully Edited Item",
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
        delete:{
          tags: ["Item"],
          summary: "Delete Item by ID",
          description: "An endpoint to delete Item by ID (Seller/Admin Access)",
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
                description: "Successfully Delete Item",
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
                        $ref: '#/components/schemas/Item'
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