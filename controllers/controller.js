import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";

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
    console.log(snapshot);

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
