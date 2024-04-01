/**
 * @swagger
 * /auth/password:
 *  put:
 *    summary: update password
 *    description: Update password account
 *    tags: [Auth]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *            - password
 *            properties:
 *              password:
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
