import request from 'supertest';
import app from '../app';
import { GroupTypes } from '../constants/groupTypes';

// Descripción general de las pruebas para la API de Grupos
describe('Group API', () => {

	// Test para verificar la metadata de los grupos
	describe('GET /api/group/metadata', () => {
		// Este test verifica que la metadata devuelva los tipos de grupo esperados
		it('should return metadata with group types', async () => {
			const res = await request(app)
				.get('/api/group/metadata') // Realiza la solicitud GET a la ruta de metadata
				.set('Authorization', `Bearer your_token_here`); // Incluye el token de autorización en la cabecera

			// Verifica que el código de estado sea 200 (OK)
			expect(res.status).toBe(200);
			// Verifica que los tipos de grupos coincidan con los valores definidos en 'GroupTypes'
			expect(res.body.groupTypes).toEqual(expect.arrayContaining(Object.values(GroupTypes)));
		});

		// Este test verifica que la API retorne un error 401 si no se proporciona el token de autorización
		it('should return 401 if no authorization token is provided', async () => {
			const res = await request(app).get('/api/group/metadata'); // Solicita la misma ruta sin token
			expect(res.status).toBe(401); // Verifica que se reciba un 401 (Unauthorized)
		});
	});

	// Test para obtener todos los grupos
	describe('GET /api/group/allGroups', () => {
		// Este test verifica que se obtengan todos los grupos correctamente
		it('should return all groups', async () => {
			const res = await request(app)
				.get('/api/group/allGroups')
				.set('Authorization', `Bearer your_token_here`); // Se incluye el token en la cabecera para autorización

			// Verifica que el código de estado sea 200 y que la respuesta sea un array
			expect(res.status).toBe(200);
			expect(Array.isArray(res.body)).toBe(true);
		});

		// Este test verifica que se reciba un error 401 si no se proporciona el token de autorización
		it('should return 401 if no authorization token is provided', async () => {
			const res = await request(app).get('/api/group/allGroups');
			expect(res.status).toBe(401); // Se espera un error 401
		});
	});

	// Test para obtener grupos filtrados según parámetros de consulta
	describe('GET /api/group/filtered', () => {
		// Este test verifica que los grupos se filtren correctamente según los parámetros de consulta
		it('should return filtered groups based on query params', async () => {
			const res = await request(app)
				.get('/api/group/filtered')
				.query({ name: 'Test Group', type: GroupTypes.PUBLIC, limit: 10, offset: 0 }) // Se pasa una consulta con parámetros
				.set('Authorization', `Bearer your_token_here`); // Token de autorización incluido

			expect(res.status).toBe(200); // Verifica que la respuesta tenga estado 200
			expect(Array.isArray(res.body)).toBe(true); // Verifica que el cuerpo de la respuesta sea un array
			expect(res.body.length).toBeLessThanOrEqual(10); // Verifica que el número de grupos devueltos sea menor o igual a 10
		});

		// Este test verifica que se devuelva un error 400 si los parámetros de consulta no son válidos
		it('should return 400 if query parameters are invalid', async () => {
			const res = await request(app)
				.get('/api/group/filtered')
				.query({ name: 'Test Group', type: 'INVALID_TYPE', limit: -10 }) // Parámetros incorrectos
				.set('Authorization', `Bearer your_token_here`); // Token de autorización incluido

			expect(res.status).toBe(400); // Verifica que se reciba un error 400 (Bad Request)
		});

		// Este test verifica que se reciba un error 401 si no se proporciona el token de autorización
		it('should return 401 if no authorization token is provided', async () => {
			const res = await request(app)
				.get('/api/group/filtered')
				.query({ name: 'Test Group', limit: 10 }); // Solicita sin token
			expect(res.status).toBe(401); // Verifica que se reciba un error 401 (Unauthorized)
		});
	});

	// Test para realizar una acción de impresión en un grupo
	describe('PATCH /api/group/print/:groupId', () => {
		// Este test verifica que la acción de impresión no esté implementada y devuelva un código 501
		it('should return 501 for unimplemented print action', async () => {
			const groupId = 'validGroupIdHere'; // Un id de grupo válido para la prueba
			const res = await request(app)
				.patch(`/api/group/print/${groupId}`)
				.set('Authorization', `Bearer your_token_here`); // Token de autorización incluido

			expect(res.status).toBe(501); // Verifica que se reciba un error 501 (Not Implemented)
			expect(res.text).toContain('You have requested to print the group'); // Verifica el mensaje de respuesta
		});

		// Este test verifica que se devuelva un error 400 si el ID del grupo es inválido
		it('should return 400 if groupId is invalid', async () => {
			const res = await request(app)
				.patch('/api/group/print/invalidGroupId') // ID de grupo inválido
				.set('Authorization', `Bearer your_token_here`); // Token de autorización incluido

			expect(res.status).toBe(400); // Verifica que se reciba un error 400 (Bad Request)
		});

		// Este test verifica que se reciba un error 401 si no se proporciona el token de autorización
		it('should return 401 if no authorization token is provided', async () => {
			const groupId = 'validGroupIdHere'; // ID de grupo válido
			const res = await request(app)
				.patch(`/api/group/print/${groupId}`); // Solicita sin token de autorización

			expect(res.status).toBe(401); // Verifica que se reciba un error 401 (Unauthorized)
		});
	});
});
