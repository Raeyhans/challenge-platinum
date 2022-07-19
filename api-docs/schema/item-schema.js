module.exports = {
    Item: {
      type: 'object',
      required: [
<<<<<<< HEAD
        "name"
      ],
      properties: {
=======
        "seller_code","code","seotitle","title","price","qty"
      ],
      properties: {
        seller_code: {
          type: "string",
        },
>>>>>>> bf4066e71c168bdc34947da6052c3993d978feb0
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
<<<<<<< HEAD
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
=======
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
>>>>>>> bf4066e71c168bdc34947da6052c3993d978feb0
  }