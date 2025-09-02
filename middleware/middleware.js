import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import db from "../data/firebase.js";
import { getDocs, query, collection, where, addDoc } from "firebase/firestore";

export function authMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];

    if (!authHeader) return res.status(401).json({message: "Token não fornecido"})

    const token = authHeader.split(" ")[1];
    //console.log(token);

    try {
        const decode = jwt.verify(token, "martielo");
        req.user = decode;
        next();
    } catch (err) {
        res.status(401).json({message: "Token inválido ou expirado"})
    }
}

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
        res.status(500).json({message:"Erro ao registrar usuario"});
        console.error(err);
    }
}

export async function logarUsuario(req, res) {
  try {
    const {username, password} = req.body;
    
    const snapshot = await getDocs(query(collection(db, "usuarios"), where("username", "==", username)));

    if (snapshot.empty) {
        return res.status(400).json({ message: "Usuário não existe" });
    }
    
    const user = snapshot.docs[0].data();
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
        return res.status(400).json({message: "Senha incorreta"});
    }

    const token = jwt.sign({username}, "martielo", {expiresIn:"5m"});
    res.json({token});
  } catch(err) {
    res.status(500).json({message:"Erro ao logar usuario"});
    console.error(err);
  }
}