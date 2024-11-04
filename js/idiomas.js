let isSpanish = true;

function cambiarIdioma() {
    const elements = document.querySelectorAll('[data-en]');
    
    elements.forEach(element => {
        // Cambia el texto basado en el estado de isSpanish
        element.innerText = isSpanish 
            ? element.getAttribute('data-en') 
            : element.getAttribute('data-es');
    });

    // Cambiar placeholder de inputs
    const inputs = document.querySelectorAll('input[data-es][data-en]');
    inputs.forEach(input => {
        input.placeholder = isSpanish 
            ? input.getAttribute('data-en') 
            : input.getAttribute('data-es');
    });

    // Cambiar el estado del toggle
    const toggle = document.getElementById("toggle");
    toggle.classList.toggle("active");

    // Cambiar el texto del label del toggle
    const toggleLabel = document.getElementById("toggle-label");
    toggleLabel.innerText = isSpanish 
        ? "Spanish" 
        : "Español";

    // Invertir el estado
    isSpanish = !isSpanish; // Cambiar el estado
}

// Configuración inicial al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById("toggle");
    toggle.classList.remove("active"); // Iniciar en el estado original
});