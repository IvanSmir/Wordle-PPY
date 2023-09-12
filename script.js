const MAX_INTENTOS = 6;
const DICCIONARIO = ['BAILE', 'CALLE', 'DUROS', 'FALTA', 'GLOBO',
'HUMOR', 'IDOLO', 'JABON', 'LARGO', 'MOLDE', 'NOCHE', 'QUITA', 
'ROBLE', 'TOMAR', 'USADO', 'VALLE', 'ZUMBA'];

let intentosRestantes = MAX_INTENTOS;
let palabraSeleccionada = seleccionarPalabraAleatoria(DICCIONARIO);
const botonIntentar = document.getElementById("guess-button");
const inputIntento = document.getElementById('guess-input');
const container = document.getElementById('container')
const botonReiniciar = document.getElementById("reset-button");



botonIntentar.addEventListener('click', intentar);
botonReiniciar.addEventListener('click', reiniciarJuego);

function seleccionarPalabraAleatoria(diccionario) {
    return diccionario[Math.floor(Math.random() * diccionario.length)];
}

function intentar() {
    const intento = obtenerIntentoUsuario();
    const errorMessageDiv = document.getElementById('error-message');
    errorMessageDiv.textContent = ''; 
    if (intento.length !== palabraSeleccionada.length) {
        errorMessageDiv.textContent = 'La palabra ingresada no tiene el tamaño correcto.';
        return;
    }

    const grid = document.getElementById("grid");
    const row = crearRow(intento, palabraSeleccionada);
    grid.appendChild(row);

    if (intento === palabraSeleccionada) {
        container.style.boxShadow = '0 14px 28px rgba(74, 189, 21, 0.25), 0 10px 10px rgba(17, 203, 27, 0.22)'
        finalizarJuego('<h1>Ganaste :D<h1>');
        return;
    }

    intentosRestantes--;
    if (intentosRestantes === 0) {
        container.style.boxShadow = '0 14px 28px rgba(207, 14, 14, 0.25), 0 10px 10px rgba(221, 3, 3, 0.22)'
        finalizarJuego('<h1>Perdiste D:<h1>');
    }
}

function obtenerIntentoUsuario() {
    return inputIntento.value.toUpperCase();
}

function crearRow(intento, palabra) {
    const row = document.createElement('div');
    row.className = 'row';

    for (let i = 0; i < palabra.length; i++) {
        const letra = crearLetra(intento[i], palabra[i]);
        row.appendChild(letra);
    }

    return row;
}

function crearLetra(letraIntento, letraPalabra) {
    const span = document.createElement('span');
    span.className = 'letter';
    span.innerHTML = letraIntento;

    if (letraIntento === letraPalabra) {
        span.style.backgroundColor = '#79b851';
    } else if (palabraSeleccionada.includes(letraIntento)) {
        span.style.backgroundColor = '#f3c237';
    } else {
        span.style.backgroundColor = '#a4aec4';
    }

    return span;
}

function finalizarJuego(mensaje) {
    const input = document.getElementById('guess-input');
    const container = document.getElementById('guesses');

    input.disabled = true;
    botonIntentar.disabled = true;

    if (mensaje.includes('Ganaste')) {
        container.innerHTML = '<h1 class="ganaste">Ganaste :D</h1>';
    } else {
        container.innerHTML = '<h1 class="perdiste">Perdiste D:</h1>';
    }

    botonReiniciar.style.display = 'inline-block';
}

function reiniciarJuego() {
    intentosRestantes = MAX_INTENTOS;
    palabraSeleccionada = seleccionarPalabraAleatoria(DICCIONARIO);

    const grid = document.getElementById("grid");
    grid.innerHTML = '';
    inputIntento.value = '';
    
    inputIntento.disabled = false;
    botonIntentar.disabled = false;
    
    const errorMessageDiv = document.getElementById('error-message');
    errorMessageDiv.textContent = '';
    const container = document.getElementById('guesses');
    container.innerHTML = '';
}