function inputRange(id_input, id_label, unit){
    let elInput3 = document.querySelector(id_input);
    if (elInput3) {
    let w = parseInt(window.getComputedStyle(elInput3, null).getPropertyValue('width'));

    // LA ETIQUETA 
    let etq = document.querySelector(id_label);
    if (etq) {
        // el valor de la etiqueta (el tooltip) 
        etq.innerHTML = elInput3.value;

        // calcula la posición inicial de la etiqueta (el tooltip); 
        var pxls = w / 128;

        etq.style.left = ((elInput3.value * pxls) - 11) + 'px';

        elInput3.addEventListener('input', function() {
            // cambia el valor de la etiqueta (el tooltip) 
            etq.innerHTML = elInput3.value;
            // cambia la posición de la etiqueta (el tooltip) 
            etq.style.left = ((elInput3.value * pxls) - 11) + 'px';

        }, false);
    }
    }
}
inputRange('#input-range', '.etiqueta-range', 'minutos');
