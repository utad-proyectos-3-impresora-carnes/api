

import express from "express";
const controller = require("../controllers/example");

const exampleRouter = express.Router();

exampleRouter.get("/", controller.exampleGet);

exampleRouter.post("/", controller.examplePost);

exampleRouter.put("/", controller.examplePut);

exampleRouter.patch("/", controller.examplePatch);

exampleRouter.delete("/", controller.exampleDelete);
export { exampleRouter };
