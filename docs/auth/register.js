/**
 * @swagger
 * /auth/register:
 *  post:
 *    summary: register
 *    description: Register account for login
 *    tags: [Auth]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *            - username
 *            - email
 *            - password
 *            - rePassword
 *            properties:
 *              username:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *              rePassword:
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
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      username:
 *                        type: string
 */
