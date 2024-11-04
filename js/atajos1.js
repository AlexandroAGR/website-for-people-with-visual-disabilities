document.addEventListener('DOMContentLoaded', () => {
    // Selección de elementos
    const linkCasa = document.querySelector('nav a[href="#casa"]');
    const linkSobre = document.querySelector('nav a[href="#sobre"]');
    const linkContacto = document.querySelector('nav a[href="#contacto"]');
    const btnInicio = document.querySelector('.btn-login');

    // Función para seleccionar secciones
    function seleccionarSeccion(enlace) {
        enlace.click(); // Simula el clic en el enlace
        if (audioGuideActive) {
            hablar(`Has seleccionado: ${enlace.textContent || enlace.getAttribute('aria-label')}`);
        }
    }

    // Evento para detectar la combinación de teclas
    document.addEventListener('keydown', (event) => {
        if (event.altKey) {
            switch (event.key) {
                case '3':
                    seleccionarSeccion(linkCasa); // Alt + 3 para Inicio
                    break;
                case '4':
                    seleccionarSeccion(linkSobre); // Alt + 4 para Sobre
                    break;
                case '5':
                    seleccionarSeccion(linkContacto); // Alt + 5 para Contáctanos
                    break;
                case '6':
                    seleccionarSeccion(btnInicio); // Alt + 6 para Inicio de sesión
                    break;
                default:
                    break;
            }
        }
    });
});