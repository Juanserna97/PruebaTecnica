const { Router } = require("express");
const router = Router();
const { getNewToken } = require("../controllers/token_controller");

//rutas para las categorías
router.post("/token", getNewToken);

module.exports = router;
