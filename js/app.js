// variables 

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    // cuando agregas un curs presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // reseteamos el arreglo
        LimpiarHTML();// Eliminamos todo el HTML
    })
}

//Funciones
function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }

}

// Elimina un curso del carrito
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML(); // Iterrar sobre el carrito y mostrar su HTML
    }
}



// lee el contenido del HTML al que le dimos lcik y extrae la infomrmacion del curso

function leerDatosCurso(curso) {

    // Crear un objeto con el contenido del curso actuak
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; // Retorna el objeto actualizado
            } else {
                return curso; // Retorna los obejtos que no son los duplicados
            }
        });
        articulosCarrito = [...cursos];
    } else {
        // Agregamos el curso al Carrito
        articulosCarrito = [...articulosCarrito, infoCurso];

    }

    console.log(articulosCarrito);
    carritoHTML();

}
// Muestra el carrito de compras en el HTML

function carritoHTML() {

    // Limpiar el html
    LimpiarHTML();
    // Recorrre el carrito y generla el HTML

    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
   <td>
    <img src="${imagen}" width="100"></td>
   <td> ${titulo}</td>
   <td> ${precio}</td>
   <td> ${cantidad}</td>
   <td> <a href="#" class="borrar-curso" data-id="${id}"> X </a> </td>
   `;
        // Agrega eñ HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
}
// Eliminal los cursos del tbody
function LimpiarHTML() {

    // Forma lenta
    //contenedorCarrito.innerHTML = '';

    // Forma Rapida
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}