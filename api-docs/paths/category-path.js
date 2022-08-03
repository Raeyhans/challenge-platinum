module.exports = {
    '/categories': {
      post: {
        tags: ['Category'],
        summary: 'Create category',
        operationId: "createCategory",
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
              "application/x-www-form-urlencoded": {
                schema: {
                  type: "object",
                  properties: {
                    title: { 
                      description: "Category Name",
                      type: "string"
                    }
                  },
                  required: ["title"] 
                }
              }
            }
          },
        responses: {
          201: {
            description: "Success create category",
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Category'
                }
              }
            },
          },
        },
      },
      get: {
        tags: ['Category'],
        summary: 'get all categories',
        operationId: "getAllCategory",
        consumes: [
          "application/json"
        ],
        produces: [
          "application/json"
        ],
        responses: {
          201: {
            description: "Success create category",
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Category'
                }
              }
            },
          },
        },
      }
    },
    "/categories/{id}": {
      get: {
        tags: ['Category'],
        summary: "Find categories by ID",
        description: "Returns a single categories",
        operationId: "getCategoryById",
        produces: [
          "application/json"
        ],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            type: "integer",
          }
        ],
        responses: {
          200: {
            description: "successfuly find categories",
            content: {
                'application/json': {
                }
              }
          },
          401: {
            description: "Unauthorized"
          },
          404: {
            description: "Category not found"
          }
        }
      },
      put: {
        tags: ['Category'],
        summary: "Edit categories by ID",
        description: "Edit a single categories",
        operationId: "editCategoryById",
        security: [{
          bearerAuth: []
        }],
        produces: [
          "application/json"
        ],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            type: "integer",
          }
        ],
        requestBody: {
        content: {
            "application/x-www-form-urlencoded": {
            schema: {
                type: "object",
                properties: {
                title: { 
                    description: "Category Name",
                    type: "string"
                }
                },
                required: ["title"] 
            }
            }
        }
        },
        responses: {
          200: {
            description: "successfuly Edit customer",
            content: {
              'application/json': {
                schema: {
                  $ref: "#/components/schemas/Category"
                }
              }
            }
          },
          400: {
            description: "Invalid"
          },
          404: {
            description: "User not found"
          }
        }
      },
      delete: {
        tags: ['Category'],
        summary: "delete categories by ID",
        description: "delete a single categories",
        operationId: "deleteCategoryById",
        security: [{
          bearerAuth: []
        }],
        produces: [
          "application/json"
        ],
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
            type: "integer",
          }
        ],
        responses: {
          200: {
            description: "successfuly delete categories",
            content: {
              'application/json': {
              }
            }
          },
          400: {
            description: "Invalid"
          },
          404: {
            description: "categories not found"
          }
        }
      }
    },
  }