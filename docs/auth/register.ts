/**
 * @swagger
 * /auth/register:
 *  post:
 *    summary: register
 *    description: Register account for login
 *    tags: [Auth]
 *    requestBody:
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            required:
 *            - username
 *            - nickname
 *            - email
 *            - password
 *            - confirm_password
 *            properties:
 *              username:
 *                type: string
 *              nickname:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *              confirm_password:
 *                type: string
 *    responses:
 *      201:
 *        description: Created
 *        content:
 *          application/x-www-form-urlencoded:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                data:
 *                  type: object
 *                  properties:
 *                    id_account:
 *                      type: string
 *                    username:
 *                      type: string
 *                    nickname:
 *                      type: string
 *                    email:
 *                      type: string
 *      422:
 *        description: Unprocessable Content
 *        content:
 *          application/x-www-form-urlencoded:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      msg:
 *                        type: string
 *                      type:
 *                        type: string
 *                message:
 *                  type: string
 *      409:
 *        description: Conflict
 *        content:
 *          application/x-www-form-urlencoded:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                message:
 *                  type: string
 *      500:
 *        description: Internal Server Error
 *        content:
 *          application/x-www-form-urlencoded:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                message:
 *                  type: string
 */
