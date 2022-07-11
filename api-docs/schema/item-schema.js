module.exports = {
    Item: {
      type: 'object',
      required: [
        "name"
      ],
      properties: {
        category: {
          type: "integer",
          enum:[
            'kategori 1',
            'kategori 2',
            'kategori 3',
          ]
        },
        code: {
          type: "integer",
        },
        seotitle: {
          type: "string",
        },
        title: {
          type: "string",
        },
        price: {
          type: "integer",
        },
        qty: {
          type: "integer",
        },
      }
    },
    Item2:{
      type: 'object',
      required: [
        "name"
      ],
      properties: {
        category: {
          type: "integer",
          enum:[
            'kategori 1',
            'kategori 2',
            'kategori 3',
          ]
        },
        title: {
          type: "string",
        },
        price: {
          type: "integer",
        },
        qty: {
          type: "integer",
        },
      }   
    },
    Item3:{
      type: 'object',
      required: [
        "name"
      ],
      properties: {
        itemID: {
          type: "integer",
        },
  
      }   
    },
    Item4:{
      type: 'object',
      required: [
        "name"
      ],
      properties: {
        item_ID: {
          type: "integer",
        },
        picture: {
          type: "string",
        },
      }   
    }
  }