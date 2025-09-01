import { Router } from "express";
import { authMiddleware, registrarUsuario, logarUsuario } from "../middleware/middleware.js";

const router = Router();

router.get("/profile", authMiddleware, (req, res) => {
  res.json(req.user);
});
router.post("/register", registrarUsuario);
router.post("/login", logarUsuario); 

export default router;