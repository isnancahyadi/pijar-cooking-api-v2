/**
 * @swagger
 * /recipe/detail/{id}:
 *  get:
 *    summary: get new recipe
 *    description: Fetch data of new recipe
 *    tags: [Recipe]
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
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
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                      title:
 *                        type: string
 *                      ingredients:
 *                        type: string
 *                      image:
 *                        type: string
 *                      video:
 *                        type: string
 *                      direction:
 *                        type: string
 *                      created_by:
 *                        type: string
 *                      liked:
 *                        type: integer
 *                      created_at:
 *                        type: string
 *                      category:
 *                        type: integer
 *                      description:
 *                        type: string
 */
