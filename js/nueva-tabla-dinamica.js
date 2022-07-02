"use strict";

const url = "https://62b613b242c6473c4b3f4601.mockapi.io/api/patitasfelices" //?page=4&limit=10

window.addEventListener("load", llamarServicio);
let tabla = document.querySelector("#js-tabla-adopciones-usuarios");

let idDelJson = 0;
let sizeArreglo;

//?page=1&limit=10

let numeroDePágina = 1;
document.querySelector("#js-siguiente").addEventListener("click", irALaSiguientePagina);
function irALaSiguientePagina(){
    numeroDePágina++;
    llamarServicio();
}

document.querySelector("#js-anterior").addEventListener("click", irALaAnteriorPagina);
function irALaAnteriorPagina(){
    numeroDePágina--;
    llamarServicio();
}


async function llamarServicio() {
    console.log("Entre a la funcion");
    try {
        let respuesta = await fetch(`${url}?page=${numeroDePágina}&limit=10`);
        console.log(respuesta);
        let json = await respuesta.json();
        console.log(json);
        // crearCabeceras(tabla, json[0]);
        // crearContenido(tabla, json, true);
        sizeArreglo = json.length;
        console.log("El tamaño del arreglo es de " + sizeArreglo);
        tabla.innerHTML = `<th>PERRITO</th><th>EDAD</th><th>SEXO</th><th>TAMAÑO</th><th>CASTRADO</th><th>CIUDAD</th><th>CONTACTO</th><th>TELÉFONO</th><th>EMAIL</th><th>ID</th>`
        for (let numeroDeVuelta =0; numeroDeVuelta<sizeArreglo; numeroDeVuelta++){
            //if castrado == true castrado = "Sí"
            ////else (castrado == false) castrado = "No"
            tabla.innerHTML += `<td>${json[numeroDeVuelta].perrito}</td><td>${json[numeroDeVuelta].edad}</td><td>${json[numeroDeVuelta].sexo}</td><td>${json[numeroDeVuelta].tamano}</td><td>${json[numeroDeVuelta].castrado}</td><td>${json[numeroDeVuelta].ciudad}</td><td>${json[numeroDeVuelta].contacto}</td><td>${json[numeroDeVuelta].telefono}</td><td>${json[numeroDeVuelta].email}</td><td>${json[numeroDeVuelta].id}</td>`;
            idDelJson = json[numeroDeVuelta].id;
            console.log("en esta vuelta: "+ numeroDeVuelta +", el id es: "+idDelJson);
        }
    
    
    } catch (error) {
        console.log(error);
    }
    

    //if sexo==hembra hacer resaltado {
    //  td.numeroDeVuelta.classList.add('resaltado')
    //}
}

let form = document.querySelector("#js-formulario-adopciones-usuarios")
form.addEventListener("submit", agregarPerrito);

async function agregarPerrito(event){
    event.preventDefault();
    //levanto los input del form y los guardo en un json
    let formData = new FormData(form);
    let perrito = formData.get('0-perrito');
    let edad = formData.get('1-edad');
    let sexo = formData.get('2-sexo');
    let tamano = formData.get('3-tamano');
    let castrado = formData.get('4-castrado');
    let ciudad = formData.get('5-ciudad');
    let contacto = formData.get('6-contacto');
    let telefono = formData.get('7-telefono');
    let email = formData.get('8-email');

    let perritoNuevo = {
        "perrito": perrito,
        "edad": edad,
        "sexo": sexo,
        "tamano": tamano,
        "castrado": castrado,
        "ciudad": ciudad,
        "contacto": contacto,
        "telefono": telefono,
        "email": email,
    };

    //post al json
    try{
        let respuesta = await fetch(url, {
            "method": "POST",
            "headers": {"Content-type": "application/json"},
            "body": JSON.stringify(perritoNuevo)
        })
        if(respuesta.status === 201){ //no olvidarme de poner todos los errores
            document.querySelector("#mensaje").innerHTML = "Perrito cargado correctamente!";
        }
    } catch (error) {
        console.log(error);
    }

    llamarServicio();

}

document.querySelector("#js-borrar-perrito-por-id").addEventListener("click", borrarPerritoPorID);

async function borrarPerritoPorID(){
    let idParaBorrar = document.querySelector("#js-borrar-este-id").value;
    console.log(idParaBorrar);
    console.log(idParaBorrar);
    console.log(idDelJson);

    
    //DELETE a ese ID "idParaBorrar" -1 (el -1 porque va desfazado por 1 el ID en relación al arreglo)

    try{
        let respuesta = await fetch(`${url}/${idParaBorrar}`, {
            "method":"DELETE"
        });
        if(respuesta.status === 200){
            document.querySelector("#mensaje").innerHTML = "Perrito de ID " + idParaBorrar + " eliminado correctamente!";
        }
    } catch(error){
        console.log(error);
    }
    llamarServicio();
}

//agregar la función editar capaz con partial Render?

document.querySelector("#js-modificar-perrito-por-id").addEventListener("click", modificarPerritoPorID)

async function modificarPerritoPorID(){
    let idParaModificar = document.querySelector("#js-modificar-este-id").value;
    console.log(idParaModificar);

    let formData = new FormData(form);
    let perrito = formData.get('0-perrito');
    let edad = formData.get('1-edad');
    let sexo = formData.get('2-sexo');
    let tamano = formData.get('3-tamano');
    let castrado = formData.get('4-castrado');
    let ciudad = formData.get('5-ciudad');
    let contacto = formData.get('6-contacto');
    let telefono = formData.get('7-telefono');
    let email = formData.get('8-email');

    let perritoNuevo = {
        "perrito": perrito,
        "edad": edad,
        "sexo": sexo,
        "tamano": tamano,
        "castrado": castrado,
        "ciudad": ciudad,
        "contacto": contacto,
        "telefono": telefono,
        "email": email,
    };
    
    console.log("El size del arreglo para modificar es" + sizeArreglo);

    try{
        let respuesta = await fetch(`${url}/${idParaModificar}`, {
            "method":"PUT",
            "headers": {"Content-type": "application/json"},
            "body": JSON.stringify(perritoNuevo)
        });
        if(respuesta.status === 200){
            document.querySelector("#mensaje").innerHTML = "Perrito de ID " + idParaModificar + " modificado correctamente!";
        }
    } catch(error){
        console.log(error);
    }
    llamarServicio();
}










// function crearCabeceras(tabla, perritos) {
//     // creamos la cabeceras de la tabla e insertamos una fila
//     let thead = tabla.createTHead();
//     let row = thead.insertRow();
//     // recorremos los atributos de cada perro
//     for (let perrito in perritos) {
//         // creamos una celda por cada key de los atributos
//         let th = document.createElement("th");
//         // seteamos el atributo a la celda correspondiente
//         let text = document.createTextNode(perrito);
//         th.appendChild(text);
//         row.appendChild(th);
//     }
// }

// function crearContenido(tabla, perritos, firstTime) {
//     let tbody;
//     if (firstTime) {
//         tbody = tabla.createTBody();
//     } else {
//         tbody = tabla.getElementsByTagName("tbody")[0];
//     }

//     tbody;

//     // recorremos el json
//     for (let perrito of perritos) {
//         // por cada objeto creamos una fila
//         let row = tbody.insertRow();
//         // recorremos los atributos de cada perro
//         for (let key in perrito) {
//             // creamos una celda por cada atributo
//             let cell = row.insertCell();
//             // seteamos el atributo a la celda correspondiente
//             let text = document.createTextNode(perrito[key]);
//             cell.appendChild(text);
//         }
//     }
// }
