const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Quickstart Retro API',
      version: '1.0.0',
      description:
        'Example Express REST API for the quickstart scaffold. Intended to be consumed by the Next.js frontend.',
    },
    tags: [
      { name: 'System', description: 'Service/health endpoints' },
      { name: 'Example', description: 'Example endpoints for the quickstart UI' },
    ],
  },
  apis: ['./src/routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
