"use strict"

function push(event){
    let id = event.target.id;
    select_tab(id);
    document.title = id;
    load_content(id);
    window.history.pushState({ id }, `${id}`, `/page/${id}`);
}

window.onload = (event) => {
    //agrego el history push() event cuando se hace click
    // window["home"].addEventListener("click", (event) => push(event));
    window["about"].addEventListener("click", (event) => push(event));
    window["adopciones"].addEventListener("click", (event) => push(event));
    window["tienda"].addEventListener("click", (event) => push(event));
    window["contacto"].addEventListener("click", (event) => push(event));
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
    console.log("Loading content for {" + id + "}");
    let contenedorDeContenido =  document.querySelector("#contenido");
    try {
        let response = await fetch(`${window.location.origin}/patitasfelices/${id}.html`);
        if(response.ok){
            let content = await response.text();
            contenedorDeContenido.innerHTML = content;    
        }
        else{
            contenedorDeContenido.innerHTML = "Contenido cargando para /" + id+".....";
        }
    } catch (error){
        contenedorDeContenido.innerHTML = "Error";
    }
}
    

//vamos a colorear cada botón
//generar el partial render para cambiar el contenido
// y con el history push agregar eso a la historia con el id del boton apretado