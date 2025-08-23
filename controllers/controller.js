import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, deleteDoc, doc, addDoc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXkbFxsYqJOoTqACkVp-JhrV8pDITO5GE",
  authDomain: "apiprogint.firebaseapp.com",
  projectId: "apiprogint",
  storageBucket: "apiprogint.appspot.com",
  messagingSenderId: "665902347049",
  appId: "1:665902347049:web:b9c51fb81a5fbdd3903d38"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Buscar todos os documentos da coleção "pessoas"
export async function getAllDados(req, res) {
  try {
    const snapshot = await getDocs(collection(db, "pessoas"));

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
      idade: pessoa.idade,
      profissao: pessoa.profissao
    });
    res.status(201).json({ success: true, pessoa });
  } catch(err) {
    res.status(500).json({ error: "Erro ao editar pessoa" });
  }
}

export async function criarPessoa(req, res) {
  try {
    const pessoa = req.body;

    if (!pessoa) return res.status(400).json({ error: "Dados inválidos" });

    await addDoc(collection(db, "pessoas"), {
      nome: pessoa.nome,
      idade: pessoa.idade,
      profissao: pessoa.profissao
    });
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
