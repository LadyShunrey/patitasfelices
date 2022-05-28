"use strict"
document.querySelector(".menu-hamburguesa").addEventListener("click", alternarMenu);

function alternarMenu(){
    document.querySelector(".menuDesplegado").classList.toggle("mostrar");
}