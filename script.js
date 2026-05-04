const firebaseConfig = {
    apiKey: "AIzaSyA8n9sXo2l3m1v5z6y7x8w9z0a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6",
    authDomain: "site-chale.firebaseapp.com",
    projectId: "site-chale",
    storagebucket: "site-chale.firebassestorage.app",
    messagingSenderId: "946709101676",
    appId: "1:946709101676:web:13dca323dcc49dc9a0ec49",
    measurementId: "G-P07GCVHZR1"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


const lista = document.getElementById('lista');
const form = document.getElementById('form');

async function carregarReservas() {
    lista.innerHTML = "";
    const snapshot = await db.collection('reservas').get();

    snapshot.forEach(doc => {
        const r = doc.data();
        const li = document.createElement('li');
        li.textContent = `${r.nome} - ${r.entrada} até ${r.saida}`;
        lista.appendChild(li);
    });
    
}

function conflito(e, s, reservas){
    return reservas.some(r => (e <= r.saida && s >= r.entrada));
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const entrada = document.getElementById('entrada').value;
    const saida = document.getElementById('saida').value;

    const snapshot = await db.collection('reservas').get();
    const reservas = snapshot.docs.map(doc => doc.data());

    if(conflito(entrada, saida, reservas)){
        alert('Datas indisponíveis!');
        return;
    }

    await db.collection('reservas').add({ nome, entrada, saida });
    carregarReservas();
});

carregarReservas();

const msg = `reserva:${entrada} até ${saida}`;

window.open(`https://wa.me/5548984639106?text=${encodeURIComponent(msg)}`);


carregarReservas();