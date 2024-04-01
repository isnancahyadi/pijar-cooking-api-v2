/**
 * @swagger
 * /recipe/{id}:
 *  delete:
 *    summary: delete recipe
 *    description: Deleting data recipe
 *    tags: [Recipe]
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *    security:
 *      - ApiKeyAuth:
 *          type: apiKey
 *          in: header
 *          name: Authorization
 */
