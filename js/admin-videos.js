const botonAniadir = document.querySelector('#button-add-video');
const datosProgramas = document.querySelector("#contenedor-video-datos");
const datosEstadoCargaBarra = document.querySelector('.barras-de-carga');

// MODAL DETALLES
const modDetTitulo = document.querySelector('#mod-det-titulo');
const modDetEmbedYutu = document.querySelector('#mod-det-embed-yutu');
const modDetDetalles = document.querySelector('#mod-det-detalles');
const modDetPrograma = document.querySelector('#mod-det-programa');
const modDetURL = document.querySelector('#mod-det-url');
const modDetBtnEditar = document.querySelector('#mod-det-btn-editar');
const modDetBtnEliminar = document.querySelector('#mod-det-btn-borrar');


// FORMULARIO
const form = document.querySelector(".form-modal");
const botonCloseForm = document.querySelector('.boton-close');
const formPrograma = document.querySelector('#form-video');

const tituloForm = document.querySelector('#frm-titulo');
const hdnId = document.querySelector('#hdn-id');
const txtNombreVideo = document.querySelector('#nombre-video');

const lblIdPrograma = document.querySelector('#lbl-id-programa');
const tAreaDescripcion = document.querySelector('#descripcion');
const urlVideo = document.querySelector('#url-video');
const frmBotonEnviar = document.querySelector("#frm-boton");
const alertaErrores = document.querySelector('.alerta');

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
          th2.innerText = "Video";
          tr.appendChild(th2);
          let th3 = document.createElement("th");
          th3.innerText = "Programa";
          tr.appendChild(th3);
          let th4 = document.createElement("th");
          th4.innerText = "Descripción";
          tr.appendChild(th4);
          let th5 = document.createElement("th");
          th5.innerText = "URL videos";
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
                tda2.innerText = program.nombre_video;
                tda2.href = `${URL}/videos/${program.id}`;
                tda2.classList.add("nombre-video-a");
                td2.appendChild(tda2);
            }
            tr2.appendChild(td2);
  
            let td3 = document.createElement("td");
            td3.innerText = program.nombre_programa;
            tr2.appendChild(td3);

            let td4 = document.createElement("td");
            td4.innerText = program.descripcion;
            tr2.appendChild(td4);
  
            let td6 = document.createElement("td");
            {
                let tda6 = document.createElement("a");
                tda6.innerText = program.url_video;
                tda6.target = 'blank';
                tda6.href = `https://youtu.be/${program.url_video}`;
                tda6.classList.add("nombre-video-ignoarar");//nombre-video-a
                td6.appendChild(tda6);
            }
            tr2.appendChild(td6);
          }
          tabla.append(tr2);
        });
      }
      datosProgramas.appendChild(tabla);
      
      const aDetallesPrograma = document.querySelectorAll('.nombre-video-a');
        for(let k=0; k<aDetallesPrograma.length; k++){
            aDetallesPrograma[k].addEventListener("click", (e) => {
                    e.preventDefault();
                    let nuevaURL = aDetallesPrograma[k].href;
                    renderDetallesProgramas({id:0, nombre_video:'', descripcion:'', nombre_programa: '', url_video:''});
                    mostrarContendorDetalles();
                    fetch(nuevaURL, {})
                    .then((response) => response.json())
                    .then((data) => {
                        if(data.code=='1'){
                            console.log(data.data);
                            renderDetallesProgramas(data.data);
                        } else {
                            console.log(data.error);
                            ocultarContenedorDetalles();
                        }
                    })
                    .catch((error)=> {
                        console.error('>> ERRROR NO HAY CONEXIÓN PARA RECUPERAR VIDEO...', error);
                    });
            });
        }
    } else {
      let p = document.createElement("p");
      p.innerText = "No hay registros de Videos";
      datosCategoria.appendChild(p);
    }
};





const renderDetallesProgramas = ((detalleVide)=> {
    modDetTitulo.innerText = detalleVide.nombre_video.toUpperCase();
    if(detalleVide.url_video.length!==0){
      modDetEmbedYutu.src = `https://www.youtube.com/embed/${detalleVide.url_video}`;
    } else {
        modDetEmbedYutu.src = '';
    }
    modDetDetalles.innerText = detalleVide.descripcion;
    modDetPrograma.innerText = detalleVide.nombre_programa;
    modDetURL.innerText = detalleVide.url_video;
    modDetBtnEditar.href = `${URL}/videos/${detalleVide.id}`;
    modDetBtnEliminar.href = `${URL}/videos/${detalleVide.id}`;
});





const actualizarTabla = (()=> {
    datosEstadoCargaBarra.classList.remove('ocultar');
    fetch(`${URL}/videos`, {})
    .then((response) => response.json())
    .then((data) => {
        //console.log(data);
        datosProgramas.innerHTML = '';
        if(data.code=='1'){
            console.log(data.data);
            renderProgramas(data.data);
        } else {
            console.log(data.error);
            let p = document.createElement("p");
            p.innerText = data.message;
            datosProgramas.appendChild(p);
        }
        //renderCategoria(data.data);
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







const restaurarFormularioPrograma = ((valor)=> {
    tituloForm.innerText = '';
    hdnId.value = "0";
    txtNombreVideo.value = '';
    tAreaDescripcion.value = '';
    urlVideo.value = '';
    frmBotonEnviar.value = 'Crear';
   
    // cargar categorias disponibles
    lblIdPrograma.innerHTML = '';
    if(valor){
        llenarLabelProgramas();
    }
});


const llenarLabelProgramas = (()=> {
    let optTmp = document.createElement("option");
    optTmp.innerText = "Seleccione programa";
    lblIdPrograma.appendChild(optTmp);
    fetch(`${URL}/programas`, {})
    .then((response) => response.json())
    .then((data) => {
        if(data.code=='1'){
            //console.log(data.data);
            data.data.forEach(datCategoria => {
              let optCategoria = document.createElement("option");
              optCategoria.value = datCategoria.id;
              optCategoria.innerText = datCategoria.nombre_programa;
              lblIdPrograma.appendChild(optCategoria);
            });
        } else {
            console.log(data.error);
        }
    })
    .catch((error)=> {
        console.error('>> ERRROR NO HAY CONEXIÓN PARA LISTAR PROGRAMAS', error);
    });
  });





  const nuevoFormPrograma = (()=>{
    let tmp = urlVideo.value.trim().split('/');
    let nueURL = '';
    if(tmp.length>0){
        nueURL = tmp[tmp.length-1];
    } else {
        nueURL = urlVideo.value.trim();
    }
    fetch(`${URL}/videos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre_video: txtNombreVideo.value.trim(),
            descripcion: tAreaDescripcion.value.trim(),
            url_video: nueURL,
            id_programa: lblIdPrograma.options[lblIdPrograma.selectedIndex].value
        })
    })
    .then((response) => response.json())
    .then((data) => {
      //renderCategoria(data);
      console.log('Datos', data);
      if(data.code=="1"){
        console.log(data.data);
        habilitarBotonForm();
        restaurarFormularioPrograma(true);
        actualizarTabla();
      } else {
        habilitarBotonForm();
        mostrarAlerta(data.error, 4000);
      }
    })
    .catch(error => {
      console.error('error CREATE Video', error);
      habilitarBotonForm();
      mostrarAlerta('Error conexion', 2000);
    });
  });


  const editarFormPrograma = (()=> {
    let tmp = urlVideo.value.trim().split('/');
    let nueURL = '';
    if(tmp.length>0){
        nueURL = tmp[tmp.length-1];
    } else {
        nueURL = urlVideo.value.trim();
    }
    fetch(`${URL}/videos/${hdnId.value}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre_video: txtNombreVideo.value.trim(),
            descripcion: tAreaDescripcion.value.trim(),
            url_video: nueURL,
            id_programa: lblIdPrograma.options[lblIdPrograma.selectedIndex].value
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
        renderDetallesProgramas(data.data);
        actualizarTabla();
      } else {
        mostrarAlerta(data.error, 4000);
      }
    })
    .catch(error => {
      console.error('error EDIT Video::', error);
      habilitarBotonForm();
      mostrarAlerta('Error conexion', 2000);
    });
  });





const mostrarFormulario = (()=>{
    form.classList.remove("ocultar");
});
const ocultarFormulario = (()=> {
    form.classList.add('ocultar')
});
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


const llenarDatosFormActualizar = ((url_s) =>{
    restaurarFormularioPrograma(true);
    // llamar formulario
    fetch(url_s, {})
    .then((response) => response.json())
    .then((datos) => {
      mostrarFormulario();
      console.log(datos);
      tituloForm.innerText = `Editar Programa ${datos.data.id}`;
      hdnId.value = datos.data.id;
      txtNombreVideo.value = datos.data.nombre_video;
      tAreaDescripcion.value = datos.data.descripcion;
      urlVideo.value = datos.data.url_video;
      lblIdPrograma.value = datos.data.id_programa;
      frmBotonEnviar.value = 'Actualizar';
      frmBotonEnviar.innerText = "Actualizar";
    });
  });


  const llamatBorrarVideo = ((url_b)=> {
    if(!confirm('Estas seguro de Eliminar el video seleccionado')){
      return;
    }
    // peticion controlador
    fetch(url_b, {
      method: 'DELETE'
    })
    .then((response) => response.json())
    .then((datos) => {
        console.log(datos);
        if (datos.code=='1') {
            actualizarTabla();
            ocultarContenedorDetalles();
        } else {
            alertaErrores(data.error, 2000);
        }
    });
  });



document.addEventListener('DOMContentLoaded', ()=> {
    actualizarTabla();

    botonAniadir.addEventListener('click', (e)=> {
        mostrarFormulario();
        restaurarFormularioPrograma(true);
    });
    botonCloseForm.addEventListener('click', (e)=> {
        ocultarFormulario();
    });

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
    
    document.querySelector(".boton-close-modal-detalles").addEventListener('click', (e)=> {
        renderDetallesProgramas({id:0, nombre_video:'', descripcion:'', nombre_programa: '', url_video:''});
    });

    modDetBtnEditar.addEventListener('click', (e)=>{
        e.preventDefault();
        llenarDatosFormActualizar(modDetBtnEditar.href);
    });
    modDetBtnEliminar.addEventListener('click', (e)=>{
        e.preventDefault();
        llamatBorrarVideo(modDetBtnEliminar.href);
    });
});