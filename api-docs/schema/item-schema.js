module.exports = {
  AddItem: {
    type: 'object',
    required: [
      "category_id","code","title","price","qty"
    ],
    properties: {
      category_id: {
        type: "integer"
      },
      code: {
        type: "integer",
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
  Item: {
    type: 'object',
    required: [
      "seller_code","code","title","price","qty"
    ],
    properties: {
      seller_code: {
        type: "string",
      },
      category_id: {
        type: "integer"
      },
      code: {
        type: "integer",
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
      itemGalleries: {
        type: "array",
        xml: {
          name: "itemGalleries",
          wrapped: true
        },
        items: {
          $ref: "#/components/schemas/ItemGalleries"
        }
      },
    }
  },
  ItemGalleries:{
    type: 'object',
    properties: {
      picture_url: {
        type: "string",
      },
      item_id: {
        type: "integer",
      },
      picture: {
        type: "string",
      }
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