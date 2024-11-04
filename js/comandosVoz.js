// Verifica si el navegador soporta la API de reconocimiento de voz
if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false; // No reconocer continuamente
    recognition.interimResults = false; // No mostrar resultados intermedios
    recognition.lang = 'es-ES'; // Cambia esto si deseas otro idioma

    // Función para hablar
    function hablar(texto) {
        if (!audioGuideActive) return; // No hablar si la guía de audio está desactivada
        window.speechSynthesis.cancel(); // Detener cualquier discurso en curso
        const utterance = new SpeechSynthesisUtterance(texto);
        window.speechSynthesis.speak(utterance);
    }

    // Función para iniciar el reconocimiento de voz
    function iniciarReconocimiento() {
        if(recognition.start){
            recognition.start();
            hablar('Esperando comando de voz...');
        }
    }

    // Manejo del resultado del reconocimiento
    recognition.onresult = (event) => {
        const comando = event.results[0][0].transcript.toLowerCase();
        console.log(`Comando reconocido: ${comando}`);

        // Ejecutar la acción según el comando reconocido
        switch (comando) {
            case 'selecciona inicio':
                document.querySelector('nav a[href="#casa"]').click();
                hablar('Has seleccionado Inicio.');
                break;
            case 'selecciona sobre':
                document.querySelector('nav a[href="#sobre"]').click();
                hablar('Has seleccionado Sobre.');
                break;
            case 'selecciona contáctanos':
                document.querySelector('nav a[href="#contacto"]').click();
                hablar('Has seleccionado Contáctanos.');
                break;
            case 'selecciona inicio de sesión':
                document.querySelector('.btn-login').click();
                hablar('Has seleccionado Inicio de sesión.');
                break;
            default:
                hablar('Comando no reconocido. Intenta de nuevo.');
                break;
        }
        iniciarReconocimiento();
    };

    // Manejo de errores
    recognition.onerror = (event) => {
        console.error('Error en reconocimiento de voz:', event.error);
        hablar('Ocurrió un error, intenta de nuevo.');
        iniciarReconocimiento();
    };


    // Manejo del final del reconocimiento
    recognition.onend = () => {
        iniciarReconocimiento(); // Reinicia el reconocimiento cuando termina
    };

    // Iniciar el reconocimiento de voz cuando la página se carga
    window.addEventListener('load', iniciarReconocimiento);
} 
else {
    console.error('La API de reconocimiento de voz no es compatible con este navegador.');
    alert('Lo sentimos, la API de reconocimiento de voz no es compatible con este navegador. Intenta con Google Chrome.');
}