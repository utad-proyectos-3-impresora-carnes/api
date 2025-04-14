import request from "supertest"; // Importa la librería para realizar solicitudes HTTP en los tests.
import { server } from "../app"; // Importa el servidor de la aplicación para enviar solicitudes.
import { registerUserTest, loginUserTest, deleteUserTest } from "../fragments/user"; // Importa las funciones de prueba para registrar, iniciar sesión y eliminar usuarios desde un archivo fragmento.

/**
 * Describe el conjunto de pruebas para la API de miembros (Member API).
 */
describe("Member API", () => {
    let authToken: string; // Variable para almacenar el token de autenticación.
    let userId: string; // Variable para almacenar el ID del usuario registrado.
    let testMemberId: string; // Variable para almacenar el ID de un miembro creado durante las pruebas.

    // Datos de prueba para un usuario.
    const testEmail = `testuser_${Date.now()}@example.com`;
    const testPassword = "Test1234!";
    const testPhone = "123456789";

    /**
     * Antes de ejecutar todos los tests, se registra un usuario, se inicia sesión para obtener un token,
     * y luego se crea un miembro asociado al usuario.
     */
    beforeAll(async () => {
        // Registro de usuario con los datos de prueba.
        const registerResponse = await registerUserTest(server, testEmail, testPassword, testPhone);
        userId = registerResponse.body._id; // Almacena el ID del usuario registrado.

        // Inicio de sesión con las credenciales del usuario registrado para obtener un token de autenticación.
        const loginResponse = await loginUserTest(server, testEmail, testPassword);
        authToken = loginResponse.body.token; // Almacena el token de autenticación.

        // Creación de un miembro asociado al usuario.
        const memberResponse = await request(server)
            .post("/api/member/") // Realiza una solicitud POST para crear un miembro.
            .set("Authorization", `Bearer ${authToken}`) // Añade el token en los headers de autorización.
            .send({
                fullName: "John Doe", // Nombre completo del miembro.
                dni: "12345678A", // DNI del miembro.
                creationYear: 2024 // Año de creación del miembro.
            });

        testMemberId = memberResponse.body._id; // Almacena el ID del miembro creado.
    });

    /**
     * Test que verifica la obtención de todos los miembros.
     */
    it("Should get all members", async () => {
        const response = await request(server)
            .get("/api/member/") // Realiza una solicitud GET para obtener todos los miembros.
            .set("Authorization", `Bearer ${authToken}`); // Añade el token en los headers de autorización.

        expect(response.status).toBe(200); // Verifica que la respuesta tenga un estado 200 (OK).
        expect(Array.isArray(response.body)).toBe(true); // Verifica que la respuesta sea un array.
    });

    /**
     * Test que verifica la obtención de miembros filtrados por nombre.
     */
    it("Should get filtered members", async () => {
        const response = await request(server)
            .get("/api/member/filtered?name=John") // Realiza una solicitud GET para obtener miembros filtrados por nombre.
            .set("Authorization", `Bearer ${authToken}`); // Añade el token en los headers de autorización.

        expect(response.status).toBe(200); // Verifica que la respuesta tenga un estado 200 (OK).
        expect(Array.isArray(response.body)).toBe(true); // Verifica que la respuesta sea un array.
    });

    /**
     * Test que verifica la generación de una vista previa de la tarjeta del miembro.
     */
    it("Should generate a preview of a member's card", async () => {
        const response = await request(server)
            .get(`/api/member/preview/${testMemberId}`) // Realiza una solicitud GET para generar una vista previa de la tarjeta del miembro.
            .set("Authorization", `Bearer ${authToken}`); // Añade el token en los headers de autorización.

        expect(response.status).toBe(200); // Verifica que la respuesta tenga un estado 200 (OK).
        expect(typeof response.body).toBe("string"); // Verifica que la respuesta sea de tipo string (representación de la tarjeta).
    });

    /**
     * Test que verifica la actualización del estado de validación de un miembro.
     */
    it("Should update member validation status", async () => {
        const response = await request(server)
            .patch(`/api/member/editMemberValidatioStatus/${testMemberId}`) // Realiza una solicitud PATCH para actualizar el estado de validación del miembro.
            .set("Authorization", `Bearer ${authToken}`) // Añade el token en los headers de autorización.
            .send({ validationState: "validated" }); // Envía el nuevo estado de validación como 'validated'.

        expect(response.status).toBe(200); // Verifica que la respuesta tenga un estado 200 (OK).
        expect(response.body.validationState).toBe("validated"); // Verifica que el estado de validación se haya actualizado correctamente.
    });

    /**
     * Test que simula la impresión de miembros (aquí se espera un error por ser una funcionalidad no implementada).
     */
    it("Should print members", async () => {
        const response = await request(server)
            .patch("/api/member/printMembers") // Realiza una solicitud PATCH para imprimir miembros (funcionalidad no implementada).
            .set("Authorization", `Bearer ${authToken}`) // Añade el token en los headers de autorización.
            .send({ memberIds: [testMemberId] }); // Envía los IDs de los miembros a imprimir.

        expect(response.status).toBe(501); // Verifica que la respuesta sea un error 501 (Not Implemented).
    });

    /**
     * Después de todos los tests, se elimina el usuario creado durante las pruebas.
     */
    afterAll(async () => {
        await deleteUserTest(server, userId, authToken); // Elimina el usuario creado utilizando el ID y token obtenidos previamente.
    });
});
