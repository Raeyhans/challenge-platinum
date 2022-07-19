module.exports = {
    User: {
      type: 'object',
      required: [
<<<<<<< HEAD
        "name"
=======
        "username","name","password","email"
>>>>>>> bf4066e71c168bdc34947da6052c3993d978feb0
      ],
      properties: {
        id: {
          type: "integer",
        },
        username: {
          type: "string",
        },
        name: {
            type: "string",
<<<<<<< HEAD
          },
        email: {
            type: "string",
          },
=======
        },
        email: {
            type: "string",
        },
        password: {
          type: "string",
      },
>>>>>>> bf4066e71c168bdc34947da6052c3993d978feb0
      }
    }
  }