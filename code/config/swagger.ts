import swaggerJsdoc from 'swagger-jsdoc';

// Configure the app to use Swagger
const swaggerOptions = {
	swaggerDefinition: {
		openapi: '3.0.0',
		info: {
			title: 'Impresora de carnes UTAD',
			version: '1.0.0',
			description: "Documentaciónd el al API de la impresora de carnes UTAD.",
		},
		servers: [
			{
				url: `http://localhost:${process.env.PORT || 3000}`,
			},
			{
				url: "https://api-hxge.onrender.com",
			}
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
			},
		}
	},
	apis: ['./routers/*.ts'],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);

export default swaggerDocs;