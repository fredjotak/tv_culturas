const contenedorSectionVideos = document.querySelector('.section-view-videos');
const sectionVideosTitulo = contenedorSectionVideos.querySelector('h2');
const contenedorVideos = document.querySelector('.contenedor-videos-programa'); //ver
const videoReproductor = document.querySelector('.video-inicial');
const demasVideos = document.querySelector('.demas-videos');
let datosLocal = new Array();
let indiceLocal = 0;

const renderAll = ((datos)=> {
    videoReproductor.innerHTML = '';
    demasVideos.innerHTML = '';
    if(datos.length>0){
        sectionVideosTitulo.innerText = datos[0].nombre_programa;
        videoReproductor.innerHTML = `<iframe src="https://www.youtube.com/embed/${datos[indiceLocal].url_video}" title="${datos[0].nombre_video}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe>
                                        <div class="video-inicial-caracteristicas">
                                            <h3>${datos[indiceLocal].nombre_video}</h3>
                                            <p>${datos[indiceLocal].descripcion}</p>
                                        </div>`;
        for(let i=0; i<datos.length; i++){
            if(i!=indiceLocal){
                let aVideos = document.createElement('a');
                aVideos.classList.add('article-videos');
                aVideos.href = i;
                {
                    let img = document.createElement('img');
                    img.src = `${URL.substring(0, URL.length-4)}/storage/${datos[i].ruta_imagen}`;
                    img.alt = datos[i].nombre_video;
                    aVideos.appendChild(img);

                    let pDescripcion = document.createElement('p');
                    pDescripcion.innerText = datos[i].nombre_video;
                    aVideos.appendChild(pDescripcion);
                }
                demasVideos.appendChild(aVideos);
            }
        }

        // escuchar eventos de cambiar video
        if(datos.length>1){
            let escuchar = document.querySelectorAll('.article-videos');
            escuchar.forEach(element => {
                element.addEventListener('click', (e)=> {
                    e.preventDefault();
                    //console.log('-> ',indiceLocal, ', es ',element.href.split('/')[element.href.split('/').length-1]);
                    indiceLocal = element.href.split('/')[element.href.split('/').length-1];
                    renderAll(datosLocal);
                });
            });
        }

    } else {
        let p = document.createElement('p');
        p.innerText = 'Ups. No tenemos videos aun en este programa';
        videoReproductor.appendChild(p);
    }
});
const solicitarDatos = ((indi)=> {
    fetch(`${URL}/programas/videos/${indi}`, {})
    .then((response) => response.json())
    .then((data) => {
        if(data.code=='1'){
            //console.log(data.data);
            datosLocal = data.data;
            renderAll(datosLocal);
        } else {
            console.log(data.error);
        }
    })
    .catch((error)=> {
      console.error('>> ERRROR NO HAY LISTAR VIDEOS DE UNA CATEGORIA', error);
    });
});

document.addEventListener('DOMContentLoaded', ()=> {
    let prog = window.location.href.split('#');
    if(prog.length>0){
        console.log(prog[1]);
        solicitarDatos(prog[1]);
    }
});