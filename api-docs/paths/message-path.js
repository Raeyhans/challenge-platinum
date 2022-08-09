module.exports = {
    '/messages/conversation': {
        get: {
          tags: ['Message'],
          summary: 'List Message',
          operationId: "listMessage",
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
              description: "Success get list of message",
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Message'
                  }
                }
              },
            },
          },
        }
      }
  }