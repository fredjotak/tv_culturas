const modalContenedor = document.querySelector('.detalles-modal');
const botonCerrarModal = document.querySelector(".boton-close-modal-detalles");
botonCerrarModal.addEventListener('click', (e)=> {
    ocultarContenedorDetalles();
});

function mostrarContendorDetalles(){
    modalContenedor.classList.remove('modal-detalles-none');
}
function ocultarContenedorDetalles(){
    modalContenedor.classList.add('modal-detalles-none');
}