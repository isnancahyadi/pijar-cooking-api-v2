/**
 * @swagger
 * /recipe/my-recipe:
 *  get:
 *    summary: get my recipe
 *    description: Fetch data of my recipe
 *    tags: [Recipe]
 *    parameters:
 *      - name: page
 *        in: path
 *        required: false
 *        schema:
 *          type: integer
 *      - name: limit
 *        in: path
 *        required: false
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                message:
 *                  type: string
 *                payload:
 *                  type: object
 *                  properties:
 *                    next_page:
 *                      type: integer
 *                    current_page:
 *                      type: integer
 *                    total_page:
 *                      type: integer
 *                    total_data:
 *                      type: integer
 *                    metadata:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          id:
 *                            type: integer
 *                          title:
 *                            type: string
 *                          ingredients:
 *                            type: string
 *                          image:
 *                            type: string
 *                          video:
 *                            type: string
 *                          direction:
 *                            type: string
 *                          created_by:
 *                            type: string
 *                          liked:
 *                            type: integer
 *                          created_at:
 *                            type: string
 *                          category:
 *                            type: integer
 *                          description:
 *                            type: string
 *    security:
 *      - ApiKeyAuth:
 *          type: apiKey
 *          in: header
 *          name: Authorization
 */
