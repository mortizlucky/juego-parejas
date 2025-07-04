﻿const pares = [
    { id: 1, img: 'img/frame1.png', parejaCon: 2 },
    { id: 2, img: 'img/frame2.png', parejaCon: 1 },
    { id: 3, img: 'img/frame3.png', parejaCon: 4 },
    { id: 4, img: 'img/frame4.png', parejaCon: 3 },
    { id: 5, img: 'img/frame5.png', parejaCon: 6 },
    { id: 6, img: 'img/frame6.png', parejaCon: 5 }
];

// Mezclar las cartas
const cartas = [...pares].sort(() => 0.5 - Math.random());

const gameBoard = document.getElementById('game-board');
let primera = null;
let segunda = null;
let bloqueado = false;

cartas.forEach(data => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.id = data.id;
    card.dataset.match = data.parejaCon;

    const img = document.createElement('img');
    img.src = data.img;
    card.appendChild(img);

    card.addEventListener('click', () => {
        if (bloqueado || card.classList.contains('revealed') || card.classList.contains('matched')) return;

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
                mostrarModalMatch();
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
    }, 3000); // se oculta luego de 1 segundo
}