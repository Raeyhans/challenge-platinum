module.exports = {
    Item: {
      type: 'object',
      required: [
        "seller_code","code","seotitle","title","price","qty"
      ],
      properties: {
        seller_code: {
          type: "string",
        },
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
    ItemGallery:{
      type: 'object',
      required: [
        "item_id","picture"
      ],
      properties: {
        item_id: {
          type: "integer",
        }
      }   
    },
  }