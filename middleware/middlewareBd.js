import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import authMiddleware from "./middleware.js";
import db from "./firebase.js";

export async function registrarUsuario(req, res) {
    try {
        const {username, password} = req.body;

        const snapshot = await getDocs(query(collection(db, "usuarios"), where("username", "==", username)));

        if (!snapshot.empty) {
            return res.status(400).json({ message: "Usuário já existe" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        await addDoc(collection(db, "usuarios"), {
            username,
            password: hashPassword,
        });
        res.json({message:"Usuário registrado com sucesso."});
    } catch (err) {
        console.error(err);
        
    }
}