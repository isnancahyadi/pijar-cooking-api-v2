/**
 * @swagger
 * /auth/login:
 *  post:
 *    summary: login
 *    description: Login
 *    tags: [Auth]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *            - username
 *            - password
 *            properties:
 *              username:
 *                type: string
 *              password:
 *                type: string
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
 *                    username:
 *                      type: string
 *                    email:
 *                      type: string
 *                    role_id:
 *                      type: integer
 *                    token:
 *                      type: string
 */
