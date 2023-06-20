const contenedorSwiperProgramas = document.querySelector('.mySwiper');
//const contnedorNuestrosProgramasc = document.querySelector('main');

const cargarSwiper = (()=> {
    fetch(`${URL}/programas`, {})
    .then((response) => response.json())
    .then((data) => {
        console.log('SSSSS', data);
        if(data.code=='1'){
            contenedorSwiperProgramas.innerHTML = '';
            if(data.data.length>0){
                let divSwiperWraper = document.createElement('div');
                divSwiperWraper.classList.add('swiper-wrapper');
                 data.data.forEach(element => {
                    let swiperSlider = document.createElement('div');
                    swiperSlider.classList.add('swiper-slide');
                    {
                        let imgSwiper = document.createElement('img');
                        imgSwiper.src = `${URL.substring(0, URL.length-4)}/storage/${element.ruta_imagen}`;
                        imgSwiper.alt = element.nombre_programa;
                        swiperSlider.appendChild(imgSwiper);
                    }
                    divSwiperWraper.appendChild(swiperSlider);
                 });
                contenedorSwiperProgramas.appendChild(divSwiperWraper);
                let divswiperPagination = document.createElement('div');
                divswiperPagination.classList.add('swiper-pagination');
                contenedorSwiperProgramas.appendChild(divswiperPagination);
                // swiper style
                {
                    var swiper = new Swiper(".mySwiper", {
                        slidesPerView: 1.4,
                        effect: "coverflow",
                        grabCursor: true,
                        centeredSlides: true,
                        spaceBetween: 1,
                        coverflowEffect: {
                            rotate: 50,
                            stretch: 30,
                            depth: 15,
                            modifier: 1,
                        }, autoplay: {
                            delay: 2000,
                            disableOnInteraction: false,
                        },
                        loop: true,
                        pagination: {
                        el: ".swiper-pagination",
                        clickable: true,
                      },
                      breakpoints: {
                        // cuando la ventana es >= 768px
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 38,
                                coverflowEffect: {
                                rotate: 20,
                                stretch: 30,
                                depth: 700,
                                modifier: 1,
                            },
                        },
                        // cuando la ventana sea >= 1400px
                      }
                    });
                }
            } else {
                let pe = document.createElement('p');
                p.innerText = "No hay programas";
                contenedorSwiperProgramas.appendChild(pe);
            }
        } else {
            console.log(data.error);
        }
    })
    .catch((error)=> {
      console.error('>> ERRROR NO HAY CONEXIÓN PARA PROGRAMAS SWIP', error);
    });
});


const cargarSecciones = ((ListaProgramas)=> {
    let contnedorNuestrosProgramasc = document.querySelector('main');
    
    for(let icat=0; icat<ListaProgramas.length; icat++){
    let sectionNuestrosProg = document.createElement('section');
    sectionNuestrosProg.classList.add('nuestros-programas');
    {
        let divTitulo = document.createElement('div');
        divTitulo.classList.add('contenedor-titulo-categoria');
        {
            let h3 = document.createElement('h3');
            h3.innerText = ListaProgramas[icat].categoria;
            h3.classList.add(ListaProgramas[icat].tono);
            divTitulo.appendChild(h3)
        }
        sectionNuestrosProg.appendChild(divTitulo);

        // cargar programas
        let divContenedorProgramas = document.createElement('div');
        divContenedorProgramas.classList.add('contenedor-portadas-programas');
        for(let i=0; i<ListaProgramas[icat].programas.length; i++){
            {
                let articulo = document.createElement('article');
                articulo.classList.add('contenedor-programa-m', ListaProgramas[icat].tono);
                {
                    let divProgPortada = document.createElement('div');
                    divProgPortada.classList.add('programa-m-portada');
                    {
                        let img = document.createElement('img');
                        img.src = `${URL.substring(0, URL.length-4)}/storage/${ListaProgramas[icat].programas[i].ruta_imagen}`;
                        divProgPortada.appendChild(img);
                    }
                    articulo.appendChild(divProgPortada);

                    let divProgTitulo = document.createElement('div');
                    divProgTitulo.classList.add('programa-m-titulo');
                    {
                        let p = document.createElement('p');
                        {
                            let ahre = document.createElement('a');
                            ahre.href = `./user_videos.html#${ListaProgramas[icat].programas[i].id}`;
                            ahre.classList.add('programa_verificar');
                            let stroH = document.createElement('strong');
                            stroH.innerText = ListaProgramas[icat].programas[i].nombre_programa;
                            ahre.appendChild(stroH);
                            p.appendChild(ahre);
                        }
                        divProgTitulo.appendChild(p);

                        let divConducen = document.createElement('div');
                        divConducen.classList.add('programa-m-conducen');
                        /*  inicio temporal */
                        let arrayDias = ListaProgramas[icat].programas[i].dias_de_emision.split(' ');
                        let texto_dia_emision = '';
                        if(arrayDias.length>=5){
                            if(ListaProgramas[icat].programas[i].dias_de_emision=='Lunes Martes Miércoles Jueves Viernes'){
                                texto_dia_emision = 'Lunes a Viernes';
                            } else {
                                texto_dia_emision = arrayDias.join(',');
                            }
                        } else {
                            texto_dia_emision = arrayDias.join(',');
                        }
                        /*     fin temporal */
                        {
                            let pCon = document.createElement('p');
                            pCon.innerText = texto_dia_emision;
                            divConducen.appendChild(pCon);
                        }
                        divProgTitulo.appendChild(divConducen);
                    }
                    articulo.appendChild(divProgTitulo);

                    let divProgDescripcion = document.createElement('div');
                    divProgDescripcion.classList.add('programa-m-descripcion');
                    {
                        let pDes = document.createElement('p');
                        pDes.innerText = ListaProgramas[icat].programas[i].descripcion;
                        divProgDescripcion.appendChild(pDes);
                    }
                    articulo.appendChild(divProgDescripcion);

                    let divProgHorario = document.createElement('div');
                    divProgHorario.classList.add('programa-m-horarios');
                    {
                        let pHor = document.createElement('p');
                        pHor.innerText = `${ListaProgramas[icat].programas[i].hora_inicio_emision} - ${ListaProgramas[icat].programas[i].hora_fin_emision}`;
                        divProgHorario.appendChild(pHor);
                    }
                    articulo.appendChild(divProgHorario);

                    let divProgMasDetalles = document.createElement('div');
                    divProgMasDetalles.classList.add('programa-m-mas-detalles');
                    {
                        let pUltimaEmision = document.createElement('p');
                        let arrayDias = ListaProgramas[icat].programas[i].dias_de_emision.split(' ');
                        let texto_dia_emision = '';
                        if(arrayDias.length>=5){
                            if(ListaProgramas[icat].programas[i].dias_de_emision=='Lunes Martes Miércoles Jueves Viernes'){
                                texto_dia_emision = 'Lunes a Viernes';
                            } else {
                                texto_dia_emision = arrayDias.join(',');
                            }
                        } else {
                            texto_dia_emision = arrayDias.join(',');
                        }
                        {
                            pUltimaEmision.innerHTML = `<svg width="18px" height="18px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="Rounded" transform="translate(-475.000000, -553.000000)">
                                    <g id="Action" transform="translate(100.000000, 100.000000)">
                                        <g id="-Round-/-Action-/-update" transform="translate(372.000000, 450.000000)">
                                            <g>
                                                <rect id="Rectangle-Copy-25" x="0" y="0" ></rect>
                                                <path d="M11,8.75 L11,12.43 C11,12.78 11.19,13.11 11.49,13.29 L14.61,15.14 C14.97,15.35 15.43,15.23 15.64,14.88 C15.85,14.52 15.74,14.06 15.38,13.85 L12.51,12.14 L12.51,8.74 C12.5,8.34 12.16,8 11.75,8 C11.34,8 11,8.34 11,8.75 Z M21,9.5 L21,4.21 C21,3.76 20.46,3.54 20.15,3.86 L18.37,5.64 C16.56,3.83 13.98,2.79 11.16,3.04 C6.97,3.42 3.52,6.79 3.06,10.98 C2.46,16.4 6.69,21 12,21 C16.59,21 20.38,17.56 20.93,13.12 C21,12.52 20.53,12 19.93,12 C19.43,12 19.01,12.37 18.95,12.86 C18.52,16.35 15.51,19.05 11.9,19 C8.19,18.95 5.06,15.82 5,12.1 C4.94,8.2 8.11,5 12,5 C13.93,5 15.68,5.79 16.95,7.05 L14.86,9.14 C14.54,9.46 14.76,10 15.21,10 L20.5,10 C20.78,10 21,9.78 21,9.5 Z" id="🔹Icon-Color" fill="#1D1D1D"></path>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg> 
                        <span>${texto_dia_emision}</span>`;  // revisar
                        }
                        //divProgMasDetalles.appendChild(pUltimaEmision);

                        let pIdiomas = document.createElement('p');
                        {
                            let svgAll =`<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 510 510" style="enable-background:new 0 0 510 510;" xml:space="preserve">
                                            <g>
                                                <g id="language">
                                                    <path d="M255,0C114.75,0,0,114.75,0,255s114.75,255,255,255s255-114.75,255-255S395.25,0,255,0z M430.95,153H357
                                                        c-7.65-33.15-20.4-61.2-35.7-91.8C367.2,79.05,408,109.65,430.95,153z M255,51c20.4,30.6,38.25,63.75,48.45,102h-96.9
                                                        C216.75,117.3,234.6,81.6,255,51z M58.65,306c-5.1-15.3-7.65-33.15-7.65-51c0-17.85,2.55-35.7,7.65-51h86.7
                                                        c-2.55,17.85-2.55,33.15-2.55,51c0,17.85,2.55,33.15,2.55,51H58.65z M79.05,357H153c7.65,33.15,20.4,61.2,35.7,91.8
                                                        C142.8,430.95,102,400.35,79.05,357z M153,153H79.05c25.5-43.35,63.75-73.95,109.65-91.8C173.4,91.8,160.65,119.85,153,153z
                                                        M255,459c-20.4-30.6-38.25-63.75-48.45-102h96.9C293.25,392.7,275.4,428.4,255,459z M313.65,306h-117.3
                                                        c-2.55-17.85-5.1-33.15-5.1-51c0-17.85,2.55-33.15,5.1-51H316.2c2.55,17.85,5.1,33.15,5.1,51
                                                        C321.3,272.85,316.2,288.15,313.65,306z M321.3,448.8c15.3-28.05,28.05-58.649,35.7-91.8h73.95
                                                        C408,400.35,367.2,430.95,321.3,448.8z M367.2,306c2.55-17.85,2.55-33.15,2.55-51c0-17.85-2.55-33.15-2.55-51h86.7
                                                        c5.1,15.3,7.649,33.15,7.649,51c0,17.85-2.55,35.7-7.649,51H367.2z"/>
                                                </g>
                                            </g>
                                        </svg> 
                                        <span>${ListaProgramas[icat].programas[i].idioma}</span>`;
                            //spanUltumaEm.innerText = ListaProgramas[icat].programas[i].idiomas[0].idioma;
                            pIdiomas.innerHTML = svgAll;
                        }
                        divProgMasDetalles.appendChild(pIdiomas);

                        let pTiempo = document.createElement('p');
                        {
                            pTiempo.innerHTML = `<svg viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <g>
                                <g id="Rounded" transform="translate(-136.000000, -420.000000)">
                                    <g id="Action" transform="translate(100.000000, 100.000000)">
                                        <g id="-Round-/-Action-/-schedule" transform="translate(34.000000, 318.000000)">
                                            <g>
                                                <polygon id="Path" points="0 0 24 0 24 24 0 24"></polygon>
                                                <path d="M11.99,2 C6.47,2 2,6.48 2,12 C2,17.52 6.47,22 11.99,22 C17.52,22 22,17.52 22,12 C22,6.48 17.52,2 11.99,2 Z M12,20 C7.58,20 4,16.42 4,12 C4,7.58 7.58,4 12,4 C16.42,4 20,7.58 20,12 C20,16.42 16.42,20 12,20 Z M11.78,7 L11.72,7 C11.32,7 11,7.32 11,7.72 L11,12.44 C11,12.79 11.18,13.12 11.49,13.3 L15.64,15.79 C15.98,15.99 16.42,15.89 16.62,15.55 C16.83,15.21 16.72,14.76 16.37,14.56 L12.5,12.26 L12.5,7.72 C12.5,7.32 12.18,7 11.78,7 Z" ></path>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                        <span>${ListaProgramas[icat].programas[i].duracion_promedio} min.</span>`;
                        }
                        divProgMasDetalles.appendChild(pTiempo);
                    }
                    articulo.appendChild(divProgMasDetalles)
                }
                divContenedorProgramas.appendChild(articulo);
            }
        }
        sectionNuestrosProg.appendChild(divContenedorProgramas);
    }

    contnedorNuestrosProgramasc.appendChild(sectionNuestrosProg);
    }
    
});

const solicitarDatos = (()=>{
    fetch(`${URL}/programas/get`, {})
    .then((response) => response.json())
    .then((data) => {
        if(data.code=='1'){
            console.log(data.data);
            cargarSecciones(data.data);
        } else {
            console.log(data.error);
        }
    })
    .catch((error)=> {
      console.error('>> ERRROR NO HAY CONEXIÓN PARA LISTAR DOS TABLAS', error);
    });
});
document.addEventListener('DOMContentLoaded', ()=> {
    cargarSwiper();
    solicitarDatos();
});