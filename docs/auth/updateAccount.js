/**
 * @swagger
 * /auth/account:
 *  put:
 *    summary: update account
 *    description: Update username account
 *    tags: [Auth]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *            - user
 *            properties:
 *              user:
 *                type: string
 *    responses:
 *      201:
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
 *    security:
 *      - ApiKeyAuth:
 *          type: apiKey
 *          in: header
 *          name: Authorization
 */
