/**
 * @swagger
 * /recipe:
 *  post:
 *    summary: create recipe
 *    description: Create some recipe
 *    tags: [Recipe]
 *    requestBody:
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            required:
 *            - title
 *            - ingredients
 *            - video
 *            - direction
 *            - image
 *            - category
 *            - description
 *            properties:
 *              title:
 *                type: string
 *              ingredients:
 *                type: string
 *              video:
 *                type: string
 *              direction:
 *                type: string
 *              image:
 *                type: string
 *                format: base64
 *              category:
 *                type: integer
 *              description:
 *                type: string
 *          encoding:
 *            image:
 *              contentType: image/png, image/jpeg, image/jpg
 *    security:
 *      - ApiKeyAuth:
 *          type: apiKey
 *          in: header
 *          name: Authorization
 */
