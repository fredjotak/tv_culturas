const form = document.querySelector(".form-modal");

const URL = "http://192.168.0.43:2000/api";

const colores = new Map();
colores.set("", "#282c31");
colores.set("rojo", "#e32831");
colores.set("morado", "#921e5f");
colores.set("amarillo", "#face0b");
colores.set("naranja", "#ed7129");
colores.set("verde", "#0d7e40");
colores.set("azul", "#134783");

// Formulario
const formCategoria = document.querySelector('#form-categoria');
const frmTitulo = document.querySelector("#frm-titulo");
const frmTxtNombreCategoria = document.querySelector("#nombre-categoria");
const frmSelColor = document.querySelector("#nombre-color");
const frmHdnid = document.querySelector("#hdn-id");
const frmBoton = document.querySelector("#frm-boton");

const datosCategoria = document.querySelector("#contenedor-categoria-datos");
const datosEstadoCargaBarra = document.querySelector('.barras-de-carga');

/* const xhr = new XMLHttpRequest();
function onRequestHandler(){
    if(this.readyState === 4 && this.status === 200){
        // 0 : UNSET, no se ha llamado al método open
        // 1 : OPENED, se ha llamado al método open
        // 2 : HEADERS_RECEIVED, se está llamando al mentodo send()
        // 3 : LOADING, está caragando, es decir, está recibiendo la respuesta
        // 4 : DONE, que se ha completado la operación 
        //console.log(this.response);
        const data = JSON.parse(this.response);
        console.log(data);
    }
}

xhr.addEventListener('load', onRequestHandler);
xhr.open('GET', `${URL}/categorias`);
xhr.send(); */

const renderCategoria = (categorias) => {
  if (categorias.length > 0) {
    console.log(categorias);
    let tabla = document.createElement("table");
    {
      let tr = document.createElement("tr");
      {
        let th = document.createElement("th");
        th.innerText = "Nro";
        tr.appendChild(th);
        let th2 = document.createElement("th");
        th2.innerText = "Categoria";
        tr.appendChild(th2);
        let th3 = document.createElement("th");
        th3.innerText = "Color Portada";
        tr.appendChild(th3);
        let th4 = document.createElement("th");
        th4.innerText = "Acciones";
        tr.appendChild(th4);
      }
      tabla.appendChild(tr);

      // registros
      let contador = 1;
      categorias.forEach((categoria) => {
        let tr2 = document.createElement("tr");
        {
          let td = document.createElement("td");
          td.innerText = contador++;
          tr2.appendChild(td);

          let td2 = document.createElement("td");
          td2.innerText = categoria.nombre_categoria;
          tr2.appendChild(td2);

          let td3 = document.createElement("td");
          td3.innerText = categoria.nombre_clase_color;
          tr2.appendChild(td3);

          let td4 = document.createElement("td");
          td4.classList.add("action");
          {
            let button = document.createElement("button");
            button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M384 480c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0zM224 352c-6.7 0-13-2.8-17.6-7.7l-104-112c-6.5-7-8.2-17.2-4.4-25.9s12.5-14.4 22-14.4l208 0c9.5 0 18.2 5.7 22 14.4s2.1 18.9-4.4 25.9l-104 112c-4.5 4.9-10.9 7.7-17.6 7.7z"/></svg>`;
            td4.appendChild(button);

            let divAcOp = document.createElement("div");
            divAcOp.classList.add("action-option");
            {
              let boton1 = document.createElement("a");
              //boton1.type = "button";
              //boton1.onclick = hola;
              boton1.href = `${URL}/categorias/${categoria.id}`;
              boton1.classList.add("option-edit");
              boton1.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>
                            <span>Editar</span>`;
              divAcOp.appendChild(boton1);

              let boton2 = document.createElement("button");
              boton2.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"> <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                            <span>Borrar</span>`;
              divAcOp.appendChild(boton2);
            }
            td4.appendChild(divAcOp);
          }
          tr2.appendChild(td4);
        }
        tabla.append(tr2);
      });
    }
    datosCategoria.appendChild(tabla);

    // escucha option-option edit
    let aAll = document.querySelectorAll(".option-edit");
    for (let i = 0; i < aAll.length; i++) {

        // click en optionEdit
        aAll[i].addEventListener("click", (e) => {
            let nuevaURL = aAll[i].href;
            e.preventDefault();

            // llamar formulario
            fetch(nuevaURL, {})
            .then((response) => response.json())
            .then((datos) => {
                crearNuevoregistro();
                frmTitulo.innerText = `Editar Categoria ${datos.id}`;
                frmHdnid.value = datos.id;
                frmTxtNombreCategoria.value = datos.nombre_categoria;
                frmSelColor.value = datos.nombre_clase_color;
                frmSelColor.style.background = colores.get(
                datos.nombre_clase_color
                );
                frmBoton.innerText = 'Actualizar';
                console.log(datos);
            });
        });
    }
  } else {
    let p = document.createElement("p");
    p.innerText = "No hay registros de Categorias";
    datosCategoria.appendChild(p);
  }
};


function cambiaColor(color) {
  //idSelct.className = color;
  frmSelColor.style.background = colores.get(color);
  //idSelct.classList.add(color);
}

//

function crearNuevoregistro() {
  limpiarForm();
  frmTitulo.innerText = "NUEVA CATEGORIA";
  form.classList.remove("ocultar");
  let close = document.querySelector(".boton-close");
  close.addEventListener("click", (e) => {
    form.classList.add("ocultar");
  });
}

function actualizarTabla() {
    datosEstadoCargaBarra.classList.remove('ocultar');
    datosCategoria.innerHTML = '';
    fetch(`${URL}/categorias`, {})
    .then((response) => response.json())
    .then((data) => {
        renderCategoria(data);
        datosEstadoCargaBarra.classList.remove('ocultar');
    });

}

function limpiarForm() {    
    frmHdnid.value = "0";
    frmTxtNombreCategoria.value = "";
    frmSelColor.value = colores.get("");
    frmBoton.innerText = 'Crear';
}

// DETENER ENVIO
formCategoria.addEventListener('submit', ((e)=> {
    e.preventDefault();
    // obtener datos 
    console.table({id: frmHdnid.value, nombre: frmTxtNombreCategoria.value, color: frmSelColor.options[frmSelColor.selectedIndex].value});
    if(!isNaN(frmHdnid.value)){
        if(parseInt(frmHdnid.value)>=0){
            if(parseInt(frmHdnid.value)===0){
                // NUEVO REGISTRO
                fetch(`${URL}/categorias`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'applicaction/json'
                    },
                    body: JSON.stringify({
                        nombre_categoria: frmTxtNombreCategoria.value,
                        nombre_clase_color: frmSelColor.options[frmSelColor.selectedIndex].value
                    })
                })
                .then((response) => response.json())
                .then((data) => {
                  //renderCategoria(data);
                  console.log('Datos', data);
                  actualizarTabla();
                });
            }
        }
    }
}));


actualizarTabla();