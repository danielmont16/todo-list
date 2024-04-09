// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js'
import { getFirestore, collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot, query, orderBy } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: "AIzaSyCS4af3B-SIO688y6d4_I_GloocAb8ob-Q",
  authDomain: "todo-list-a8b81.firebaseapp.com",
  projectId: "todo-list-a8b81",
  storageBucket: "todo-list-a8b81.appspot.com",
  messagingSenderId: "722468287684",
  appId: "1:722468287684:web:8d4d799bac5a1a3b11c591",
  measurementId: "G-8NWVVNM57B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

export const saveTask = async (taskData) => {
    const colRef = collection(db, 'TaskList');
    const docRef = await addDoc(colRef, {...taskData, createdAt: new Date(), checked: false});
    console.log("Document wrote with ID: ", docRef.id);
};

export async function deleteTask(taskId){
    await deleteDoc(doc(db, "TaskList", taskId));
}

export async function toggleCheck(taskId, checkedStatus){
    const taskRef = doc(db, "TaskList", taskId);
    await updateDoc(taskRef, {checked: checkedStatus});
}

export function listenForTasks(updateUI) {
    const q = query(collection(db, "TaskList"), orderBy("createdAt"));

    onSnapshot(q, (snapshot) => {
        const tasks = [];
        console.log(snapshot);
        snapshot.forEach((doc) => {
            const task = doc.data();
            task.id = doc.id; 
            tasks.push(task);
        });
        updateUI(tasks); 
    });
}