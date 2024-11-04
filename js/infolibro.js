document.addEventListener('DOMContentLoaded', () => {
    const libros = document.querySelectorAll('.libro');
    const infoLibro = document.getElementById('info-libro');
    const tituloLibro = document.getElementById('titulo-libro');
    const imagenLibro = document.getElementById('imagen-libro');
    const cerrarBtn = document.getElementById('cerrar-btn');
    const overlay = document.createElement('div');

    // Agregar la clase de superposición al cuerpo
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    libros.forEach(libro => {
        libro.addEventListener('click', () => {
            const titulo = libro.getAttribute('data-titulo');
            const imagen = libro.getAttribute('data-imagen');

            tituloLibro.textContent = titulo;
            imagenLibro.src = imagen;

            infoLibro.style.display = 'block'; // Muestra el cuadro
            overlay.style.display = 'block'; // Muestra la superposición
        });
    });

    cerrarBtn.addEventListener('click', () => {
        infoLibro.style.display = 'none'; // Oculta el cuadro
        overlay.style.display = 'none'; // Oculta la superposición
    });

    overlay.addEventListener('click', () => {
        infoLibro.style.display = 'none'; // Oculta el cuadro
        overlay.style.display = 'none'; // Oculta la superposición
    });
});