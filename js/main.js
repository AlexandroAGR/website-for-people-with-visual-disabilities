document.addEventListener('DOMContentLoaded', () => {
    const covertura = document.querySelector('.covertura');
    const linkRegistro = document.querySelector('.link-registro');
    const linkInicio = document.querySelector('.link-inicio');
    const btnInicio = document.querySelector('.btn-login');
    const btnCerrar = document.querySelector('.close');

    const linkCasa = document.querySelector('nav a[href="#casa"]');
    const linkSobre = document.querySelector('nav a[href="#sobre"]');
    const linkContacto = document.querySelector('nav a[href="#contacto"]');

    const barraBusqueda = document.getElementById('barra-busqueda');
    const main = document.querySelector('.main');
    const enlaces = document.querySelectorAll('nav.opciones a');

    const infoCuadro = document.getElementById('info-cuadro');
    const imagenes = document.querySelector('.imagenes');

    const contacto = document.getElementById('contacto');
    const contactoItems = document.querySelectorAll('.contacto-item');
    const contactForm = document.getElementById('contact-form');
    const contactTitle = document.getElementById('contact-title');
    const closeForm = document.querySelector('.close-form');


    contactoItems.forEach(item => {
        item.addEventListener('click', () => {
            const nombre = item.getAttribute('data-nombre');
            contactTitle.textContent = `Contacta a ${nombre}`;
            contactForm.style.display = 'flex';
            document.querySelector('.contacto-info').style.display = 'none';
        });
    });

    let indices = {
        'libros-populares': 0,
        'libros-romanticos': 0,
        'libros-comicos': 0,
        'libros-terror':0,
        'libros-medieval':0
    };

    function moverCarrusel(direccion, claseLibros) {
        const libros = document.querySelector(`.${claseLibros}`);
        const cantidadLibros = libros.children.length;
        const libro = libros.children[0];
        const estiloLibro = window.getComputedStyle(libro);
        const libroWidth = libro.offsetWidth + parseInt(estiloLibro.marginRight);
    
        // Mueve el índice de acuerdo a la dirección
        indices[claseLibros] += direccion;

        // Lógica para un carrusel infinito
        if (indices[claseLibros] < 0) {
            indices[claseLibros] = cantidadLibros - 5; // Si se mueve a la izquierda desde el primer libro, va al último bloque
        } else if (indices[claseLibros] >= cantidadLibros - 4) {
            indices[claseLibros] = 0; // Si se mueve a la derecha desde el último bloque, vuelve al principio
        }

        // Mueve los libros
        libros.style.transform = `translateX(-${indices[claseLibros] * libroWidth}px)`;
    }

    // Asignar la función a los botones de flecha
    document.querySelectorAll('.flecha.izquierda').forEach(button => {
        button.addEventListener('click', () => {
            const claseLibros = button.getAttribute('onclick').match(/'([^']+)'/)[1];
            moverCarrusel(-1, claseLibros);
        });
    });

    document.querySelectorAll('.flecha.derecha').forEach(button => {
        button.addEventListener('click', () => {
            const claseLibros = button.getAttribute('onclick').match(/'([^']+)'/)[1];
            moverCarrusel(1, claseLibros);
        });
    });
    

    // Inicialmente ocultar el cuadro de información e imágenes
    if (infoCuadro) {
        infoCuadro.style.display = 'none';
    }
    if (imagenes) {
        imagenes.style.display = 'none';
    }
    if (contacto) {
        contacto.style.display = 'none';
    }

    // Función para mostrar/ocultar elementos
    function toggleElementos(seccion) {
        if (seccion === '#casa') {
            // Mostrar la barra de búsqueda y el contenido principal
            barraBusqueda.style.display = 'flex';
            main.style.display = 'block';
        } else {
            // Ocultar la barra de búsqueda y el contenido principal
            barraBusqueda.style.display = 'none';
            main.style.display = 'none';
        }
    }

    // Mostrar el popup al hacer clic en "Inicio de sesión"
    btnInicio.addEventListener('click', (e) => {
        e.preventDefault();
        covertura.classList.add('active-popup');
        covertura.classList.remove('active');
        if (infoCuadro) {
            infoCuadro.style.display = 'none';
        }
        if (imagenes) {
            imagenes.style.display = 'none';
        }
        if (contacto) {
            contacto.style.display = 'none';
        }
        toggleElementos('#iniciar-sesion');
    });

    // Cerrar el popup al hacer clic en el botón de cerrar
    btnCerrar.addEventListener('click', (e) => {
        e.preventDefault();
        covertura.classList.remove('active-popup');
        if (infoCuadro) {
            infoCuadro.style.display = 'none';
        }
        if (imagenes) {
            imagenes.style.display = 'none';
        }
        if (contacto) {
            contacto.style.display = 'none';
        }
        toggleElementos('#casa');
    });

    // Alternar a "Registro" al hacer clic en "Regístrate aquí"
    linkInicio.addEventListener('click', (e) => {
        e.preventDefault();
        covertura.classList.add('active');
        if (infoCuadro) {
            infoCuadro.style.display = 'none';
        }
        if (imagenes) {
            imagenes.style.display = 'none';
        }
        if (contacto) {
            contacto.style.display = 'none';
        }
        toggleElementos('#registro');
    });

    // Alternar a "Inicio de sesión" al hacer clic en "Inicia sesión aquí"
    linkRegistro.addEventListener('click', (e) => {
        e.preventDefault();
        covertura.classList.remove('active');
        if (infoCuadro) {
            infoCuadro.style.display = 'none';
        }
        if (imagenes) {
            imagenes.style.display = 'none';
        }
        if (contacto) {
            contacto.style.display = 'none';
        }
        toggleElementos('#iniciar-sesion');
    });

    // Mostrar la sección de beneficios y ocultar el cuadro de información al hacer clic en "Casa"
    linkCasa.addEventListener('click', (e) => {
        e.preventDefault();
        covertura.classList.remove('active-popup');
        if (infoCuadro) {
            infoCuadro.style.display = 'none';
        }
        if (imagenes) {
            imagenes.style.display = 'none';
        }
        if (contacto) {
            contacto.style.display = 'none';
        }
        toggleElementos('#casa');
    });

    // Mostrar el cuadro de información y las imágenes al hacer clic en "Sobre"
    linkSobre.addEventListener('click', (e) => {
        e.preventDefault();
        covertura.classList.remove('active-popup'); // Ocultar el cuadro de inicio de sesión
        if (infoCuadro) {
            infoCuadro.style.display = 'block';
        }
        if (imagenes) {
            imagenes.style.display = 'flex';
        }
        if (contacto) {
            contacto.style.display = 'none';
        }
        toggleElementos('#sobre');
    });

    // Ocultar la sección de beneficios y las imágenes cuando se hace clic en "Contáctanos"
    linkContacto.addEventListener('click', (e) => {
        e.preventDefault();
        covertura.classList.remove('active-popup');
        if (infoCuadro) {
            infoCuadro.style.display = 'none';
        }
        if (imagenes) {
            imagenes.style.display = 'none';
        }
        if (contacto) {
            contacto.style.display = 'flex';
        }
        toggleElementos('#contacto');
    });

    closeForm.addEventListener('click', () => {
        contactForm.style.display = 'none';
        document.querySelector('.contacto-info').style.display = 'flex';
    });

    // Ocultar las imágenes y el cuadro de información al cargar la página
    window.addEventListener('load', () => {
        if (infoCuadro) {
            infoCuadro.style.display = 'none';
        }
        if (imagenes) {
            imagenes.style.display = 'none';
        }
        if (contacto) {
            contacto.style.display = 'none';
        }
    });

    // Limpiar los campos de entrada al hacer clic
    const inputs = document.querySelectorAll('#contact-form input, #contact-form textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.placeholder = '';
        });
        input.addEventListener('blur', () => {
            if (input.id === 'name') input.placeholder = 'Ingrese su nombre';
            if (input.id === 'email') input.placeholder = 'Ingrese su email';
            if (input.id === 'message') input.placeholder = 'Ingrese el mensaje...';
        });
    });

    // Escuchar los clics en los enlaces del menú
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function (event) {
            const seccion = this.getAttribute('href'); // Obtener el valor de href
            toggleElementos(seccion); // Llamar a la función para mostrar/ocultar
        });
    });

    // Inicializar con la sección actual al cargar la página (por defecto, mostrar en 'casa')
    toggleElementos('#casa');
});