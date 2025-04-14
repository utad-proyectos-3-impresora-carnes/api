import swaggerJsdoc from 'swagger-jsdoc';

export function swaggerDocs(): any {

	// Configure the app to use Swagger
	const swaggerOptions = {
		swaggerDefinition: {
			openapi: '3.0.0',

			// Información general de la API
			info: {
				title: 'Impresora de carnes UTAD',
				version: '1.0.0',
				description: "Documentaciónd el al API de la impresora de carnes UTAD.",
			},

			// Entornos.
			servers: [
				{
					url: `http://localhost:${process.env.PORT || 3000}`,
				},
				{
					url: "https://api-hxge.onrender.com",
				}
			],

			// Componentes de la página.
			components: {
				securitySchemes: {
					bearerAuth: {
						type: 'http',
						scheme: 'bearer',
						bearerFormat: 'JWT',
					},
				},
				// Modelos de Swagger
				schemas: {
					MongoDBGenericObject: {
						type: "object",
						properties: {
							_id: {
								type: "string",
								description: "El id del objeto.",
							},
							createdAt: {
								type: "date",
								format: "date-time",
								description: "Fecha en la que el objeto fue creado.",
							},
							updatedAt: {
								type: "string",
								format: "date-time",
								description: "Fecha en la que el objeto fue actualizado por última vez.",
							}
						},
					},
				},
			},
			security: [  // This applies security globally
				{
					bearerAuth: [],
				},
			],
		},
		apis: ['./routers/*.ts'],
	};
	return swaggerJsdoc(swaggerOptions);
}
