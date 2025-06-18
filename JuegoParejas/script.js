const pares = [
    { id: 1, img: 'img/1.png', parejaCon: 2 },
    { id: 2, img: 'img/11.png', parejaCon: 1 },
    { id: 3, img: 'img/2.png', parejaCon: 4 },
    { id: 4, img: 'img/12.png', parejaCon: 3 },
    { id: 5, img: 'img/3.png', parejaCon: 6 },
    { id: 6, img: 'img/8.png', parejaCon: 5 },
    { id: 7, img: 'img/4.png', parejaCon: 8 },
    { id: 8, img: 'img/9.png', parejaCon: 7 },
    { id: 9, img: 'img/5.png', parejaCon: 10 },
    { id: 10, img: 'img/10.png', parejaCon: 9 },
    { id: 11, img: 'img/6.png', parejaCon: 12 },
    { id: 12, img: 'img/14.png', parejaCon: 11 },
    { id: 13, img: 'img/7.png', parejaCon: 14 },
    { id: 14, img: 'img/13.png', parejaCon: 13 },
    { id: 15, img: 'img/15.png', parejaCon: 16 },
    { id: 16, img: 'img/15.png', parejaCon: 15 },
   
];


let primera = null;
let segunda = null;
let bloqueado = true;
let juegoIniciado = false;
let matchedPairs = 0;

const gameBoard = document.getElementById('game-board');

// Barajamos las cartas
const cartas = [...pares].sort(() => 0.5 - Math.random());

// Creamos las cartas
cartas.forEach(data => {
    const card = document.createElement('div');
    card.classList.add('card', 'revealed'); // Mostrar todas al inicio
    card.dataset.id = data.id;
    card.dataset.match = data.parejaCon;

    const img = document.createElement('img');
    img.src = data.img;
    card.appendChild(img);

    card.addEventListener('click', () => {
        if (bloqueado || !juegoIniciado || card.classList.contains('revealed') || card.classList.contains('matched')) return;

        card.classList.add('revealed');

        if (!primera) {
            primera = card;
        } else {
            segunda = card;
            bloqueado = true;

            const match1 = parseInt(primera.dataset.match);
            const match2 = parseInt(segunda.dataset.match);

            if (
                parseInt(primera.dataset.id) === match2 &&
                parseInt(segunda.dataset.id) === match1
            ) {
                primera.classList.add('matched');
                segunda.classList.add('matched');

                mostrarModalMatch(); // <<<<< Aquí va el mensaje "¡Match!"

                matchedPairs++;

                if (matchedPairs === pares.length / 2) {
                    setTimeout(() => {
                        document.getElementById('winModal').style.display = 'flex';
                    }, 500);
                }
               
                reset();
            } else {
                setTimeout(() => {
                    primera.classList.remove('revealed');
                    segunda.classList.remove('revealed');
                    reset();
                }, 1000);
            }
        }
    });

    gameBoard.appendChild(card);
});

// Ocultamos las cartas luego de 5 segundos
setTimeout(() => {
    document.querySelectorAll('.card').forEach(card => card.classList.remove('revealed'));
    bloqueado = false;
    juegoIniciado = true;
}, 5000);

// Reset de selección
function reset() {
    primera = null;
    segunda = null;
    bloqueado = false;


}

function mostrarModalMatch() {
    const modal = document.getElementById('matchModal');
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 1000);
}
