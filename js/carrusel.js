const contenedorElementos = document.querySelector('.presentadores');
const contenedorPresentadoresAll = document.querySelectorAll('.contenedor-presentador');

let isDragStart = false, prevPageX, prevScroolLeft, positionDiff;

const dragstart = ((e)=> {
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScroolLeft = contenedorElementos.scrollLeft;
});

const dragging = ((e)=> {
    if(!isDragStart) return;
    e.preventDefault();
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    contenedorElementos.scrollLeft = prevScroolLeft - positionDiff;
});

const dragStop = ((e)=> {
    if(isDragStart){
        autoCenter();
    }
    isDragStart = false;
});
const autoCenter = (()=> {
    positionDiff = isNaN(positionDiff)? 0: positionDiff;
    //console.log(positionDiff, '>>', Math.abs(positionDiff), 'clie:', contenedorPresentadoresAll[0].clientWidth);
    positionDiff = Math.abs(positionDiff);
    let firstContentWidth = contenedorPresentadoresAll[0].clientWidth + /* 30 */ contenedorPresentadoresAll[0].clientWidth*.115 /* contenedorPresentadoresAll[0].clientWidth*.058 */;
    console.log('hei    ',contenedorPresentadoresAll[0].clientWidth*.1355);
    let valDiference = firstContentWidth - positionDiff;
    console.log(valDiference, firstContentWidth, positionDiff);
    console.log(contenedorElementos.scrollLeft, '> ', prevScroolLeft);
    if(contenedorElementos.scrollLeft == prevScroolLeft){
        return;
    }
    if(contenedorElementos.scrollLeft > prevScroolLeft) {
        return contenedorElementos.scrollLeft += (positionDiff > firstContentWidth/3)?valDiference: -positionDiff;
    }
    contenedorElementos.scrollLeft -= (positionDiff > firstContentWidth/3)?valDiference: -positionDiff;
});

contenedorElementos.addEventListener("mousedown", dragstart);
contenedorElementos.addEventListener("touchstart", dragstart);

contenedorElementos.addEventListener("mousemove", dragging);
contenedorElementos.addEventListener("touchmove", dragging);

contenedorElementos.addEventListener("mouseup", dragStop);
/* contenedorElementos.addEventListener("touchup", dragStop); */

contenedorElementos.addEventListener("mouseleave", dragStop);
contenedorElementos.addEventListener("touchend", dragStop);