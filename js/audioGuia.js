// Variables para manejar el estado del audio
let audioGuideActive = true; // La guía de audio está activa por defecto
const toggleAudioButton = document.getElementById('toggle-audio');
let narrationTimeout; // Para manejar el timeout de narración
let reminderInterval; // Para recordar los atajos

// Función para hablar
function hablar(texto) {
    if (!audioGuideActive){
        window.speechSynthesis.cancel(); // Asegúrate de que se cancele cualquier narración en curso
        return; // No hablar si la guía de audio está desactivada
    }
    window.speechSynthesis.cancel(); // Detener cualquier discurso en curso
    const utterance = new SpeechSynthesisUtterance(texto);
    window.speechSynthesis.speak(utterance);
}

// Función para anunciar los atajos
function anunciarAtajos() {
    hablar('Los atajos disponibles son: Presiona Alt + 3 para ir a Inicio, Alt + 4 para Sobre, Alt + 5 para Contáctanos, y Alt + 6 para Inicio de sesión.');
}

// Función para alternar la guía de audio
function toggleAudioGuide() {
    audioGuideActive = !audioGuideActive;
    console.log(`Audio guide active: ${audioGuideActive}`); // Debugging

    if (audioGuideActive) {
        toggleAudioButton.textContent = 'Desactivar audio guía';
        hablar('Se activó la guía de audio');
        // Anunciar atajos solo si se activa por primera vez
        if (reminderInterval === undefined) {
            setTimeout(anunciarAtajos, 2000); // 2 segundos de espera
            reminderInterval = setInterval(anunciarAtajos, 30000); // Recordar cada 30 segundos
        }
    } else {
        toggleAudioButton.textContent = 'Activar audio guía';
        hablar('Se desactivó la guía de audio');
        clearInterval(reminderInterval); // Limpiar el intervalo al desactivar
        reminderInterval = undefined; // Reiniciar el intervalo
        window.speechSynthesis.cancel();
    }
}

// Evento del botón para activar/desactivar la guía de audio
toggleAudioButton.addEventListener('click', toggleAudioGuide);

// Evento para detectar la combinación de teclas Alt + 2
document.addEventListener('keydown', (event) => {
    if (event.altKey && event.key === '2') {
        console.log('Alt + 2 pressed'); // Debugging
        toggleAudioGuide();
        event.preventDefault(); // Prevenir acciones por defecto del navegador
    }
});

// Inicializar la guía de audio
window.addEventListener('load', () => {
    hablar('Bienvenido a Mundo en voz. Presione Alt + 2 para activar o desactivar la guía de audio.');
    setTimeout(anunciarAtajos, 2000); // 2 segundos de espera
});

// Eventos para narrar acciones del usuario
document.addEventListener('mouseover', (event) => {
    if (audioGuideActive) {
        const element = event.target;
        clearTimeout(narrationTimeout);

        if (element.hasAttribute('aria-label')) {
            const description = element.getAttribute('aria-label');
            narrationTimeout = setTimeout(() => hablar(`Estás sobre: ${description}`), 3000);
        } else if (element.tagName === 'BUTTON') {
            narrationTimeout = setTimeout(() => hablar(`Estás sobre el botón: ${element.innerText}`), 3000);
        }
    }
});

// Evento para narrar al hacer clic en un botón
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        if (audioGuideActive) {
            const description = button.getAttribute('aria-label') || button.innerText;
            hablar(`Hiciste clic en: ${description}`);
        }
    });
});

// Evento para narrar al cambiar el enfoque en campos de entrada
const inputs = document.querySelectorAll('input, textarea');
inputs.forEach(input => {
    input.addEventListener('focus', () => {
        if (audioGuideActive) {
            hablar(`Estás en el campo de: ${input.placeholder}`);
        }
    });
});