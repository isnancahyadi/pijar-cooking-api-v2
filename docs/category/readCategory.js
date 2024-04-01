/**
 * @swagger
 * /recipe/category:
 *  get:
 *    summary: get list category
 *    description: Fetch data of category
 *    tags: [Category]
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
 *                      name:
 *                        type: string
 *                      slug:
 *                        type: string
 */
