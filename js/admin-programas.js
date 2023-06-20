const botonAniadir = document.querySelector('#button-add-program');
const datosProgramas = document.querySelector("#contenedor-programa-datos");
const datosEstadoCargaBarra = document.querySelector('.barras-de-carga');

// FORMULARIO
const form = document.querySelector(".form-modal");
const botonCloseForm = document.querySelector('.boton-close');
const formPrograma = document.querySelector('#form-programa');
//formulario inputs, label
const tituloForm = document.querySelector('#frm-titulo');
const hdnId = document.querySelector('#hdn-id');
const txtNombrePrograma = document.querySelector('#nombre_programa');
const lblIdCategoria = document.querySelector('#id_categoria');
const tAreaDescripcion = document.querySelector('#descripcion');
const checkIdiomas = document.getElementsByName('idioma');
const checkDiasEmision = document.getElementsByName('dias_de_emision');
const inRangeDuracionPromedio = document.querySelector('#duracion_promedio');
const timeHoraInicioEmision = document.querySelector('#hora_inicio_emision');
const timeHoraFinEmision = document.querySelector('#hora_fin_emision');
const frmBotonEnviar = document.querySelector("#frm-boton");
const alertaErrores = document.querySelector('.alerta');

const fileImagen = document.querySelector('#imagen');
const hdnRutaImagen = document.querySelector('#ruta_imagen');
const imgVistaPrevia = document.querySelector('#imagen-previa');

// MODAL DETALLES
const modDetTitulo = document.querySelector('#mod-det-titulo');
const modDetImagen = document.querySelector('#mod-det-imagen');
const modDetDetalles = document.querySelector('#mod-det-detalles');
const modDetCategoria = document.querySelector('#mod-det-categoria');
const modDetDuracion = document.querySelector('#mod-det-duracion');
const modDetDiasEmision = document.querySelector('#mod-det-dias');
const modDetHorario = document.querySelector('#mod-det-emision');
const modDetIdiomas = document.querySelector('#mod-det-idiomas');
const modDetBtnEditar = document.querySelector('#mod-det-btn-editar');
const modDetBtnEliminar = document.querySelector('#mod-det-btn-borrar');

/*         INICIO FUNCIONES         */
const mostrarFormulario = (()=>{
    form.classList.remove("ocultar");
});
const ocultarFormulario = (()=> {
    form.classList.add('ocultar')
});

const restaurarFormularioPrograma = ((valor)=> {
    tituloForm.innerText = '';
    hdnId.value = "0";
    txtNombrePrograma.value = '';
    tAreaDescripcion.value = '';
    checkIdiomas.forEach((idiomaCheck)=>{ idiomaCheck.checked = false; });
    //checkIdiomas[0].checked = true;
    checkDiasEmision.forEach((diasCheck)=>{diasCheck.checked = false; });
    inRangeDuracionPromedio.value = '30';
    timeHoraInicioEmision.value = '';
    timeHoraFinEmision.value = '';
    fileImagen.value = '';
    hdnRutaImagen.value = '';
    imgVistaPrevia.src = '';
    frmBotonEnviar.value = 'Crear';
    // cargar categorias disponibles
    lblIdCategoria.innerHTML = '';
    if(valor){
        llenarLabelCategorias();
    }
});

const llenarLabelCategorias = (()=> {
  let optTmp = document.createElement("option");
  optTmp.innerText = "Seleccione categoria";
  lblIdCategoria.appendChild(optTmp);
  fetch(`${URL}/categorias`, {})
  .then((response) => response.json())
  .then((data) => {
      if(data.code=='1'){
          //console.log(data.data);
          data.data.forEach(datCategoria => {
            let optCategoria = document.createElement("option");
            optCategoria.value = datCategoria.id;
            optCategoria.innerText = datCategoria.nombre_categoria;
            lblIdCategoria.appendChild(optCategoria);
          });
      } else {
          console.log(data.error);
      }
  })
  .catch((error)=> {
      console.error('>> ERRROR NO HAY CONEXIÓN PARA LISTAR CATEGORIAS', error);
  });
});

const renderProgramas = (programas) => {
    if (programas.length > 0) {
      let tabla = document.createElement("table");
      {
        let tr = document.createElement("tr");
        {
          let th = document.createElement("th");
          th.innerText = "Id";
          tr.appendChild(th);
          let th2 = document.createElement("th");
          th2.innerText = "Programa";
          tr.appendChild(th2);
          let th3 = document.createElement("th");
          th3.innerText = "Categoria";
          tr.appendChild(th3);
          let th4 = document.createElement("th");
          th4.innerText = "Duración";
          tr.appendChild(th4);
          let th5 = document.createElement("th");
          th5.innerText = "Acciones";
          tr.appendChild(th5);
        }
        tabla.appendChild(tr);
  
        // registros
        programas.forEach((program) => {
          let tr2 = document.createElement("tr");
          {
            let td = document.createElement("td");
            td.innerText = program.id;
            tr2.appendChild(td);
  
            let td2 = document.createElement("td");
            {
                let tda2 = document.createElement("a");
                tda2.innerText = program.nombre_programa;
                tda2.href = `${URL}/programas/${program.id}`;
                tda2.classList.add("nombre-programa-a");
                td2.appendChild(tda2);
            }
            tr2.appendChild(td2);
  
            let td3 = document.createElement("td");
            td3.innerText = program.id_categoria;
            tr2.appendChild(td3);

            let td4 = document.createElement("td");
            td4.innerText = `${program.duracion_promedio} min.`;
            tr2.appendChild(td4);
  
            let td5 = document.createElement("td");
            td5.classList.add("action");
            {
              let button = document.createElement("button");
              button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M384 480c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0zM224 352c-6.7 0-13-2.8-17.6-7.7l-104-112c-6.5-7-8.2-17.2-4.4-25.9s12.5-14.4 22-14.4l208 0c9.5 0 18.2 5.7 22 14.4s2.1 18.9-4.4 25.9l-104 112c-4.5 4.9-10.9 7.7-17.6 7.7z"/></svg>`;
              td5.appendChild(button);
  
              let divAcOp = document.createElement("div");
              divAcOp.classList.add("action-option");
              {
                let boton1 = document.createElement("a");
                boton1.href = `${URL}/programas/${program.id}`;
                boton1.classList.add("option-edit");
                boton1.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>
                              <span>Editar</span>`;
                divAcOp.appendChild(boton1);
  
                let boton2 = document.createElement("a");
                boton2.href = `${URL}/programas/${program.id}`;
                boton2.classList.add('option-delete');
                boton2.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"> <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                              <span>Borrar</span>`;
                divAcOp.appendChild(boton2);
              }
              td5.appendChild(divAcOp);
            }
            tr2.appendChild(td5);
          }
          tabla.append(tr2);
        });
      }
      datosProgramas.appendChild(tabla);
      
      const aDetallesPrograma = document.querySelectorAll('.nombre-programa-a');
        for(let k=0; k<aDetallesPrograma.length; k++){
            aDetallesPrograma[k].addEventListener("click", (e) => {
                    e.preventDefault();
                    let nuevaURL = aDetallesPrograma[k].href;
                    renderDetallesProgramas({id:0, nombre_programa:'', descripcion:'', idioma:'', duracion_promedio:'',dias_de_emision:'', id_categoria:'', ruta_imagen:'', hora_inicio_emision:'', hora_fin_emision:''});
                    mostrarContendorDetalles();
                    fetch(nuevaURL, {})
                    .then((response) => response.json())
                    .then((data) => {
                        if(data.code=='1'){
                            //console.log(data.data);
                            renderDetallesProgramas(data.data)
                        } else {
                            console.log(data.error);
                            ocultarContenedorDetalles();
                        }
                    })
                    .catch((error)=> {
                        console.error('>> ERRROR NO HAY CONEXIÓN PARA RECUPERAR PROGRAMA', error);
                    });
            });
        }

      // escucha option-option edit
      let aAll = document.querySelectorAll(".option-edit");
      for (let i = 0; i < aAll.length; i++) {
  
          // click en optionEdit
          aAll[i].addEventListener("click", (e) => {
              e.preventDefault();
              let nuevaURL = aAll[i].href;
              restaurarFormularioPrograma();
              llenarDatosFormActualizar(nuevaURL);
          });
      }

      
      // escucha option-option delete
      let delAll = document.querySelectorAll(".option-delete");
      for (let j = 0; j < delAll.length; j++) {
  
        // click en option-delete
        delAll[j].addEventListener("click", (g) => {
            let nuevaUR = delAll[j].href;
            g.preventDefault();
            llamatBorrarPrograma(nuevaUR);
        });
      }
    } else {
      let p = document.createElement("p");
      p.innerText = "No hay registros de Programas";
      datosCategoria.appendChild(p);
    }
};

const renderDetallesProgramas = ((detalleProg)=> {
    modDetTitulo.innerText = detalleProg.nombre_programa.toUpperCase();
    if(detalleProg.ruta_imagen.length!==0){
      modDetImagen.src = `${URL.substring(0, URL.length-4)}/storage/${detalleProg.ruta_imagen}`;
    }
    modDetDetalles.innerText = detalleProg.descripcion;
    modDetCategoria.innerText = detalleProg.id_categoria;
    modDetDuracion.innerText = `${detalleProg.duracion_promedio} minutos.`;
    modDetDiasEmision.innerText = detalleProg.dias_de_emision;
    modDetHorario.innerText = `De ${detalleProg.hora_fin_emision} a ${detalleProg.hora_inicio_emision} horas`;
    modDetIdiomas.innerText = detalleProg.idioma;
    modDetBtnEditar.href = `${URL}/programas/${detalleProg.id}`;
    modDetBtnEliminar.href = `${URL}/programas/${detalleProg.id}`;
});

const actualizarTabla = (()=> {
    datosEstadoCargaBarra.classList.remove('ocultar');
    fetch(`${URL}/programas`, {})
    .then((response) => response.json())
    .then((data) => {
        //console.log(data);
        datosProgramas.innerHTML = '';
        if(data.code=='1'){
            renderProgramas(data.data);
        } else {
            console.log(data.error);
            let p = document.createElement("p");
            p.innerText = data.message;
            datosProgramas.appendChild(p);
        }
        datosEstadoCargaBarra.classList.add('ocultar');
    })
    .catch((error)=> {
        console.error('>> ERRROR NO HAY CONEXIÓN ', error);
        let p = document.createElement("p");
        let a = document.createElement("a");
        a.innerText = "No hay conexión con el servidor";
        p.appendChild(a);
        datosProgramas.appendChild(p);
        datosEstadoCargaBarra.classList.add('ocultar');
    });
});

const nuevoFormPrograma = (()=>{
  let idiomasArrayTmp = new Array();
  checkIdiomas.forEach((idiomaCheck)=>{ 
    if(idiomaCheck.checked){
      idiomasArrayTmp.push(idiomaCheck.value);
    }
  });
  let diasArrayTmp = new Array();
  checkDiasEmision.forEach((diaEmision)=> {
    if(diaEmision.checked){
      diasArrayTmp.push(diaEmision.value);
    }
  });

  fetch(`${URL}/programas`, {
      method: 'POST',
      headers: {
          'Content-Type': 'applicaction/json'
      },
      body: JSON.stringify({
          nombre_programa: txtNombrePrograma.value.trim(),
          descripcion: tAreaDescripcion.value.trim(),
          idioma: idiomasArrayTmp.join(' '),
          duracion_promedio: inRangeDuracionPromedio.value,
          dias_de_emision: diasArrayTmp.join(' '),
          hora_inicio_emision: timeHoraInicioEmision.value,
          hora_fin_emision: timeHoraFinEmision.value,
          ruta_imagen: hdnRutaImagen.value,
          id_categoria: lblIdCategoria.options[lblIdCategoria.selectedIndex].value
      })
  })
  .then((response) => response.json())
  .then((data) => {
    //renderCategoria(data);
    console.log('Datos', data);
    if(data.code=="1"){
      habilitarBotonForm();
      restaurarFormularioPrograma(true);
      actualizarTabla();
    } else {
      habilitarBotonForm();
      mostrarAlerta(data.error, 4000);
    }
  })
  .catch(error => {
    console.error('error CREATE Programa::', error);
    habilitarBotonForm();
    mostrarAlerta('Error conexion', 2000);
  });
});

const editarFormPrograma = (()=> {
  let idiomasArrayTmp = new Array();
  checkIdiomas.forEach((idiomaCheck)=>{ 
    if(idiomaCheck.checked){
      idiomasArrayTmp.push(idiomaCheck.value);
    }
  });
  let diasArrayTmp = new Array();
  checkDiasEmision.forEach((diaEmision)=> {
    if(diaEmision.checked){
      diasArrayTmp.push(diaEmision.value);
    }
  });
  fetch(`${URL}/programas/${hdnId.value}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'applicaction/json'
      },
      body: JSON.stringify({
          nombre_programa: txtNombrePrograma.value.trim(),
          descripcion: tAreaDescripcion.value.trim(),
          idioma: idiomasArrayTmp.join(' '),
          duracion_promedio: inRangeDuracionPromedio.value,
          dias_de_emision: diasArrayTmp.join(' '),
          hora_inicio_emision: timeHoraInicioEmision.value,
          hora_fin_emision: timeHoraFinEmision.value,
          ruta_imagen: hdnRutaImagen.value,
          id_categoria: lblIdCategoria.options[lblIdCategoria.selectedIndex].value
      })
  })
  .then((response) => response.json())
  .then((data) => {
    //renderCategoria(data);
    console.log('Datos', data);
    habilitarBotonForm();
    if(data.code=="1"){
      restaurarFormularioPrograma();
      ocultarFormulario();
      actualizarTabla();
    } else {
      mostrarAlerta(data.error, 4000);
    }
  })
  .catch(error => {
    console.error('error EDIT Programa::', error);
    habilitarBotonForm();
    mostrarAlerta('Error conexion', 2000);
  });
});

const llenarDatosFormActualizar = ((url_s) =>{
  restaurarFormularioPrograma();
  // llamar formulario
  fetch(url_s, {})
  .then((response) => response.json())
  .then((datos) => {
    mostrarFormulario();
    console.log(datos);
    tituloForm.innerText = `Editar Programa ${datos.data.id}`;
    hdnId.value = datos.data.id;
    txtNombrePrograma.value = datos.data.nombre_programa;
    tAreaDescripcion.value = datos.data.descripcion;
    inRangeDuracionPromedio.value = datos.data.duracion_promedio;
    timeHoraInicioEmision.value = datos.data.hora_inicio_emision;
    timeHoraFinEmision.value = datos.data.hora_fin_emision;
    fileImagen.value = '';
    hdnRutaImagen.value = datos.data.ruta_imagen;
    imgVistaPrevia.src = `${URL.substring(0, URL.length-4)}/storage/${datos.data.ruta_imagen}`;
    frmBotonEnviar.value = 'Actualizar';
    frmBotonEnviar.innerText = "Actualizar";

    let arrayIdiomas = datos.data.idioma.split(' ');
    if(arrayIdiomas.length>0){
        arrayIdiomas.forEach(idioValue => {
            checkIdiomas.forEach(idioDefault =>{
                if(idioDefault.value==idioValue){
                    idioDefault.checked = true;
                    return;
                }
            });
        });
    }

    let arrayDias = datos.data.dias_de_emision.split(' ');
    if(arrayDias.length>0){
        arrayDias.forEach(diaValue => {
            checkDiasEmision.forEach(diaDefault =>{
                if(diaDefault.value==diaValue){
                    diaDefault.checked = true;
                    return;
                }
            });
        });
    }
    
    let optTmp = document.createElement("option");
    optTmp.innerText = "Seleccione categoria";
    lblIdCategoria.appendChild(optTmp);
    fetch(`${URL}/categorias`, {})
    .then((response) => response.json())
    .then((data) => {
        if(data.code=='1'){
            //console.log(data.data);
            data.data.forEach(datCategoria => {
                let optCategoria = document.createElement("option");
                optCategoria.value = datCategoria.id;
                optCategoria.innerText = datCategoria.nombre_categoria;
                lblIdCategoria.appendChild(optCategoria);
            });
            lblIdCategoria.value = datos.data.id_categoria;
        } else {
            console.log(data.error);
        }
    })
    .catch((error)=> {
        console.error('>> ERRROR NO HAY CONEXIÓN PARA LISTAR CATEGORIAS', error);
    });
  });
});

const llamatBorrarPrograma = ((url_b)=> {
  if(!confirm('Estas seguro de Eliminar el programa seleccionado')){
    return;
  }
  // peticion controlador
  fetch(url_b, {
    method: 'DELETE'
  })
  .then((response) => response.json())
  .then((datos) => {
      console.log(datos);
      actualizarTabla();
  });
});

const inputRange = ((id_input, id_label) => {
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
});


/*     subir arvhivo inicio */
const subirArchivo = (()=> {
    let formData = new FormData();
    
    formData.append('imagen', fileImagen.files[0]);
    fileImagen.classList.add('desactivar-drop-imagen');
    fetch(`${URL}/programas/upload`, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if(data.code=="1"){
            //exito
            hdnRutaImagen.value = data.data.nuevo;
            imgVistaPrevia.src = `${URL.substring(0, URL.length-4)}/storage/${data.data.nuevo}`;
        } else {
            mostrarAlerta(data.message, 2000);
        }
        fileImagen.classList.remove('desactivar-drop-imagen');
    })
    .catch(error => {
        console.error('ERROR EN SERVIDOR', error);
        fileImagen.classList.remove('desactivar-drop-imagen');
    });
});
function handleFileSelection(file) {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!file || !allowedTypes.includes(file.type)) {
        fileImagen.value = '';
        mostrarAlerta('Por favor, selecciona un archivo de imagen válido (JPEG o PNG).', 2500);
    } else {
        subirArchivo();
        if(file.size >= 5242880) {
            fileImagen.value = '';
            mostrarAlerta('imagen supera los 5MB o 5242Kb', 2500);
        }
    }
}
/*    subir archivo fin */

const mostrarAlerta = ((texto, tiempo)=>{
  alertaErrores.innerText = texto;
  alertaErrores.style.opacity = "1";
  setTimeout(()=> {
    alertaErrores.style.opacity = "0";
    setTimeout(()=> {
      alertaErrores.innerText = texto.substring(0, 20)+'...';
    }, 500)
  }, tiempo);
});
const deshabilitarBotonForm = (()=>{
  frmBotonEnviar.classList.add('boton-disabled');
});
const habilitarBotonForm = (()=>{
  frmBotonEnviar.classList.remove('boton-disabled');
});

/*            FIN FUNCIONES         */


/*          MAIN        */
document.addEventListener('DOMContentLoaded', ()=> {

    actualizarTabla();

    botonAniadir.addEventListener('click', (e)=> {
        mostrarFormulario();
        restaurarFormularioPrograma(true);
    });
    botonCloseForm.addEventListener('click', (e)=> {
        ocultarFormulario();
    });
 
    inputRange('.input-range-prom', '.etiqueta-range');
    
    formPrograma.addEventListener('submit', (e)=> {
      e.preventDefault();
      deshabilitarBotonForm();
      if(!isNaN(hdnId.value)){
        if(parseInt(hdnId.value)>=0){
            if(parseInt(hdnId.value)===0){
              // NUEVO REGISTRO
              nuevoFormPrograma();
            } else {
              // EDITAR REGISTRO
              editarFormPrograma();
            }
        }
      }
    });

    fileImagen.addEventListener('change', function(event) {
        const selectedFile = event.target.files[0];
        handleFileSelection(selectedFile);
    });

    modDetBtnEditar.addEventListener('click', (e)=>{
      e.preventDefault();
      llenarDatosFormActualizar(modDetBtnEditar.href);
    });
    modDetBtnEliminar.addEventListener('click', (e)=>{
      e.preventDefault();
      llamatBorrarPrograma(modDetBtnEliminar.href);
      ocultarContenedorDetalles();
    });
});