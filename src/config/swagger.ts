import swaggerJSDoc, { OAS3Definition, OAS3Options } from 'swagger-jsdoc';

const swaggerDefinition: OAS3Definition = {
  openapi: '3.1.0',
  info: {
    title: 'Pijar Cooking API',
    description: 'This is API docs for Pijar Cooking mobile and web aplication',
    contact: {
      name: 'Isnan A. Cahyadi',
      email: 'isnan.arifc@gmail.com',
    },
    version: '2.0.0',
  },
  servers: [
    {
      url: `${process.env.BASE_URL}/api`,
      description:
        process.env.PREFIX_MODE === 'prod'
          ? 'Production Server'
          : 'Development Server',
    },
  ],
  // components: {
  //   securitySchemes: {
  //     // bearerAuth: {
  //     //   type: "http",
  //     //   scheme: "bearer",
  //     //   bearerFormat: "JWT"
  //     // },
  //   },
  // },
  // security: [
  //   {
  //     bearerAut: []
  //   }
  // ]
};

const swaggerOption: OAS3Options = {
  swaggerDefinition,
  apis: ['./docs/*.ts', './docs/*/*.ts'],
};

export const swaggerDocs = swaggerJSDoc(swaggerOption);
