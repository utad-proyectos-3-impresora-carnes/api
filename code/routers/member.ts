import express from "express";
import controller from "../controllers/member";
import auth from "../middleware/auth";

/**
 * Objeto de router de los miembros.
 * Ofrece los siguientes endpoints:
 * - GET / -> devuelve todos los miembros en la base de datos
 * - GET /filtered -> devuelve los miembros que sigan una serie de filtros
 * - GET /inGroup:groupId -> devuelve los miembros que pertenezcan a un grupo
 * - GET /preview -> devuelve la previsualización de como quedaría el carné de un miembro
 * - PATCH /print:id -> manda a imprir un carne con el id dado
 */
const memberRouter = express.Router();

/**
 * Obtener todos los miembros.
 */
memberRouter.get(
	"/",
	[

	],
	auth,
	controller.getAllMembers
);

/**
 * Obtener los miembros filtrados.
 */
memberRouter.get(
	"/filtered",
	[

	],
	auth,
	controller.getFilteredMembers
);

/**
 * Obtener los miembros en un grupo.
 */
memberRouter.get(
	"/inGroup",
	[

	],
	auth,
	controller.getMembersInGroup
);

/**
 * Obtener la previasualización de un carné.
 */
memberRouter.get(
	"/preview",
	[

	],
	auth,
	controller.previewMemberCard
);

/**
 * Mandar a imprimir un meimbro.
 */
memberRouter.patch(
	"/print",
	[

	],
	auth,
	controller.printMember
);

// Exporta el router una vez definidos todos los endpointss.
export { memberRouter };
