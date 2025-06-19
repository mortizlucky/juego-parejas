document.addEventListener('DOMContentLoaded', () => {
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
        { id: 16, img: 'img/15.png', parejaCon: 15 }
    ];

    let primera = null;
    let segunda = null;
    let bloqueado = true;
    let juegoIniciado = false;
    let matchedPairs = 0;

    const gameBoard = document.getElementById('game-board');
    const restartBtn = document.getElementById('restartBtn');
    const matchModal = document.getElementById('matchModal');
    const winModal = document.getElementById('winModal');

    // Crear y mostrar las cartas
    function crearCartas() {
        gameBoard.innerHTML = "";
        const cartas = [...pares].sort(() => 0.5 - Math.random());

        cartas.forEach(data => {
            const card = document.createElement('div');
            card.classList.add('card', 'revealed');
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

                    const m1 = parseInt(primera.dataset.match);
                    const m2 = parseInt(segunda.dataset.match);

                    if (
                        parseInt(primera.dataset.id) === m2 &&
                        parseInt(segunda.dataset.id) === m1
                    ) {
                        primera.classList.add('matched');
                        segunda.classList.add('matched');
                        mostrarModalMatch();

                        matchedPairs++;

                        if (matchedPairs === pares.length / 2) {
                            setTimeout(() => {
                                winModal.style.display = 'flex';

                                // Ocultar después de 3 segundos
                                setTimeout(() => {
                                    winModal.style.display = 'none';
                                }, 3000);

                            }, 500);
                        }


                        resetSeleccion();
                    } else {
                        setTimeout(() => {
                            primera.classList.remove('revealed');
                            segunda.classList.remove('revealed');
                            resetSeleccion();
                        }, 1000);
                    }
                }
            });

            gameBoard.appendChild(card);
        });
    }

    // Iniciar o reiniciar el juego
    function iniciarJuego() {
        bloqueado = true;
        juegoIniciado = false;
        primera = null;
        segunda = null;
        matchedPairs = 0;

        matchModal.style.display = 'none';
        winModal.style.display = 'none';

        crearCartas();

        setTimeout(() => {
            document.querySelectorAll('.card').forEach(card => card.classList.remove('revealed'));
            bloqueado = false;
            juegoIniciado = true;
        }, 15000);
    }

    // Reset de la selección
    function resetSeleccion() {
        primera = null;
        segunda = null;
        bloqueado = false;
    }

    // Mostrar el modal de match
    function mostrarModalMatch() {
        matchModal.style.display = 'flex';
        setTimeout(() => {
            matchModal.style.display = 'none';
        }, 1000);
    }

    // Botón de reinicio
    //restartBtn.addEventListener('click', iniciarJuego);
    restartBtn.addEventListener('click', () => location.reload());

    // Iniciar el juego al cargar
    iniciarJuego();
});
