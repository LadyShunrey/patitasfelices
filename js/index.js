"use strict"

window.addEventListener("load", mostrarBanner);
function mostrarBanner(){
    document.querySelector("#contenido").classList.add('main-estilos');
}

function push(event){
    let id = event.target.id;
    select_tab(id);
    document.title = id;
    load_content(id);
    window.history.pushState({ id }, `${id}`, `/patitasfelices/${id}`);
}

window.onload = (event) => {
    //agrego el history push() event cuando se hace click
    window["adopciones"].addEventListener("click", (event) => push(event));
    window["rescatistas"].addEventListener("click", (event) => push(event));
    window["tienda-nav"].addEventListener("click", (event) => push(event));
    window["contacto-nav"].addEventListener("click", (event) => push(event));
    window["about"].addEventListener("click", (event) => push(event));
};

window.addEventListener("popstate", (event)=> {
    //agarro el estado actual
    let estadoId = event.state.id;
    console.log("estadoId = " + estadoId);
    select_tab(estadoId);
    load_content(estadoId);
});

function select_tab(id){
    
    document
        .querySelectorAll(".ruta")
        .forEach((item) => item.classList.remove("selected"));

    document
        .querySelectorAll("#" + id)
        .forEach((item) => item.classList.add("selected"));
}

async function load_content(id){
    document.querySelector("#contenido").classList.remove('main-estilos');
    console.log("Loading content for {" + id + "}");
    let contenedorDeContenido =  document.querySelector("#contenido");
    try {
        let response = await fetch(`${window.location.origin}/patitasfelices/${id}.html`);
        if(response.ok){
            let content = await response.text();
            contenedorDeContenido.innerHTML = content;    
        }
        else{
            contenedorDeContenido.innerHTML = "Cargando contenido para /" + id+".....";
        }
    } catch (error){
        contenedorDeContenido.innerHTML = "Error";
    }
}  

//no logro hacer funcionar este pedacito de código, CONSULTAR.

// function loadClick(event) {
//     event.preventDefault();
//     fetch("https://www.instagram.com/proyecto4patas/")
//         .then(response => {
//             console.log(response);
//             console.log(response.status);
//             response.text().then(text => {
//                 document.querySelector("#use-ajax").innerHTML = text;
//             });
//          });
// } 

// let jsloads = document.querySelectorAll(".js-load");
// jsloads.forEach(e=> e.addEventListener("click", loadClick));