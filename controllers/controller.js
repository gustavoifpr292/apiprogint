import db from "../data/firebase.js";
import { query, collection, getDocs, getDoc, deleteDoc, doc, addDoc, updateDoc, where } from "firebase/firestore";

export async function isUser(req, res, next) {
  try {
    const username = req.user.username;
    const expectedUsername = req.headers["username"];
    //console.log(expectedUsername);
    if (username != expectedUsername) return res.json({message: "Não tem acesso a esse documento"});
    next();
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: "Ocorreu um erro ao verificar usuário" });
  }
}

export async function getAllDados(req, res) {
  try {
    const snapshot = await getDocs(query(collection(db, "pessoas"), where("usuario", "==", req.user.username)));
    
    const pessoas = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    res.json(pessoas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar pessoas" });
  }
}

export async function getPessoa(req, res) {
  try {
    const { id } = req.params;
    const docRef = doc(db, "pessoas", id);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) return res.status(404).json({ error: "Pessoa não existe" });

    const pessoa = {
      id,
      ...snapshot.data()
    }
    
    res.json(pessoa);
  } catch(err) {
    res.status(500).json({ error: "Erro ao buscar pessoa" });
  }
}

export async function editPessoa(req, res) {
  try {
    const { id } = req.params;
    const pessoa = req.body;

    if (!pessoa) return res.status(400).json({ error: "Dados inválidos" });

    await updateDoc(doc(db, "pessoas", id), {
      nome: pessoa.nome,
      cpf: pessoa.cpf,
      idade: pessoa.idade,
      profissao: pessoa.profissao,
      email: pessoa.email
    });
    res.status(201).json({ success: true, pessoa });
  } catch(err) {
    res.status(500).json({ error: "Erro ao editar pessoa" });
  }
}

export async function criarPessoa(req, res) {
  try {
    const pessoa = req.body;
    console.log(pessoa);

    if (!pessoa) return res.status(400).json({ error: "Dados inválidos" });

    await addDoc(collection(db, "pessoas"), pessoa);
    res.status(201).json({ success: true, pessoa });
  } catch(err) {
    console.error(err);
  }
}

// Deletar um documento pelo id
export async function deletePessoa(req, res) {
  try {
    const { id } = req.params;
    const docRef = doc(db, "pessoas", id);
    await deleteDoc(docRef);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao deletar pessoa" });
  }
}