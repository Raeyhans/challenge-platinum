module.exports = {
    Seller: {
      type: 'object',
      required: [
<<<<<<< HEAD
        "name"
=======
        "firstname","email","password","address","city","code"
>>>>>>> bf4066e71c168bdc34947da6052c3993d978feb0
      ],
      properties: {
        id: {
          type: "integer",
        },
        firstname: {
          type: "string",
        },
        lastname: {
            type: "string",
<<<<<<< HEAD
          },
        email: {
            type: "string",
          },
        address: {
            type: "string",
          },
        city: {
            type: "string",
          },
=======
        },
        email: {
            type: "string",
        },
        address: {
            type: "string",
        },
        city: {
            type: "string",
        },
        code: {
          type: "string",
        },
>>>>>>> bf4066e71c168bdc34947da6052c3993d978feb0
      }
    }
  }