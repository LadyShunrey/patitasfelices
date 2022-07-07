"use strict";

const url = "https://62b613b242c6473c4b3f4601.mockapi.io/api/patitasfelices" //?page=4&limit=10

window.addEventListener("load", llamarServicio);
let tabla = document.querySelector("#js-tabla-adopciones-usuarios");

let idDelJson = 0;
let sizeArreglo;
console.log("el size del arreglo antes de tocar nada es de " + sizeArreglo);
let numeroDePagina = 1;
let mostrarPagina = document.querySelector("#js-pagina");
mostrarPagina.innerHTML = "Página " + numeroDePagina;

//?page=1&limit=10
window.addEventListener("load", paginacion);
async function paginacion(){
    try{
        let respuesta = await fetch (`${url}`);
        console.log(respuesta);
        let json = await respuesta.json();
        console.log(json);
        let sizeJson = json.length;
        console.log("el size de toda la api es de " + sizeJson);
        let cuantasPaginasMostrar = Math.ceil(sizeJson/10);
        console.log("limite de paginas " + cuantasPaginasMostrar);

        let botonSiguiente = document.querySelector("#js-siguiente");
        botonSiguiente.addEventListener("click", irALaSiguientePagina);
        function irALaSiguientePagina(){
            if(numeroDePagina<cuantasPaginasMostrar){
                numeroDePagina++;
                mostrarPagina.innerHTML = "Página " + numeroDePagina;
                llamarServicio();
            }
            if(numeroDePagina==cuantasPaginasMostrar){
                //escondersiguiente
                botonSiguiente.classList.add("esconder");
            }
            if(numeroDePagina>1){
                botonAnterior.classList.remove("esconder");
            }
        }

        let botonAnterior = document.querySelector("#js-anterior");
        botonAnterior.addEventListener("click", irALaAnteriorPagina);
        function irALaAnteriorPagina(){
            if(numeroDePagina>1){
                numeroDePagina--;
                mostrarPagina.innerHTML = "Página " + numeroDePagina;
                llamarServicio();
            }
            if(numeroDePagina==1){
                botonAnterior.classList.add("esconder");
            }
            if(numeroDePagina<cuantasPaginasMostrar){
                botonSiguiente.classList.remove("esconder");
            }
        }
    } catch(error){
        console.log(error);
    }
}    

async function llamarServicio() {
    console.log("Entre a la funcion");
    try {
        let respuesta = await fetch(`${url}?page=${numeroDePagina}&limit=10`);
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
            idDelJson = json[numeroDeVuelta].id;
            tabla.innerHTML += `<td>${json[numeroDeVuelta].perrito}</td><td>${json[numeroDeVuelta].edad}</td><td>${json[numeroDeVuelta].sexo}</td><td>${json[numeroDeVuelta].tamano}</td><td>${json[numeroDeVuelta].castrado}</td><td>${json[numeroDeVuelta].ciudad}</td><td>${json[numeroDeVuelta].contacto}</td><td>${json[numeroDeVuelta].telefono}</td><td>${json[numeroDeVuelta].email}</td><td>${json[numeroDeVuelta].id}</td><td><button>EDITAR</button></td><td><button class="js-borrar-perrito-por-id" data-id=${idDelJson}>ELIMINAR</button></td>`;
            
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
console.log("el id del json es " + idDelJson);
document.querySelectorAll(".js-borrar-perrito-por-id").forEach((boton) =>{
    boton.addEventListener("click", borrarPerrito);
})

async function borrarPerrito(){
    // let idParaBorrar = document.querySelector("#js-borrar-este-id").value;
    console.log("entré a la función borrar");
    
    let deleteId = this.dataset.idDelJson;
    console.log(dataset);
    console.log(idParaBorrar);
    console.log(idParaBorrar);
    console.log(idDelJson);

    //DELETE a ese ID "idParaBorrar" -1 (el -1 porque va desfazado por 1 el ID en relación al arreglo)

    try{
        let respuesta = await fetch(`${url}/${deleteId}`, {
            "method":"DELETE"
        });
        if(respuesta.status === 200){
            document.querySelector("#mensaje").innerHTML = "Perrito de ID " + idDelJson + " eliminado correctamente!";
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

document.querySelector("#js-agregar-perritos").addEventListener("click", agregarVariosPerritos);

async function agregarVariosPerritos(event){
    event.preventDefault();

    let perritosNuevos = [{
        perrito: "Colita",
        edad: "5",
        sexo: "macho",
        tamano: "chico",
        castrado: "Si",
        ciudad: "Mar del Plata",
        contacto: "Juan",
        telefono: "1111111",
        email: "juan@juan.juan",
    },
    {
        perrito: "Blanquita",
        edad: "8",
        sexo: "hembra",
        tamano: "grande",
        castrado: "Si",
        ciudad: "Mar del Plata",
        contacto: "María",
        telefono: "2222222",
        email: "maria@maria.maria",
    },
    {
        perrito: "Manchita",
        edad: "2",
        sexo: "macho",
        tamano: "mediano",
        castrado: "Si",
        ciudad: "Mar del Plata",
        contacto: "Pedro",
        telefono: "33333333333",
        email: "pedro@pedro.pedro",
    }];

    //post al json
    try{
        let respuesta = await fetch(url, {
            "method": "POST",
            "headers": {"Content-type": "application/json"},
            "body": JSON.stringify(perritosNuevos)
        })
        if(respuesta.status === 201){ //no olvidarme de poner todos los errores
            document.querySelector("#mensaje").innerHTML = "Perrito cargado correctamente!";
        }
    } catch (error) {
        console.log(error);
    }

    llamarServicio();

}

let filtroElegido = document.querySelector("#filtros");
filtroElegido.addEventListener("change", filtrar);
function filtrar (){
    console.log("entré a filtrar")
    //esconder todo
    let todasLasCeldas = document.querySelectorAll("#js-tabla-adopciones-usuarios td");
    console.log(todasLasCeldas);
    for(let i = 0; i< todasLasCeldas.length; i++){
        todasLasCeldas[i].classList.add("filtro");
        if(filtroElegido.value == todasLasCeldas[i].innerHTML){
            todasLasCeldas[i].classList.remove("filtro");
        }
    }
}








// [
//     {
//      "perrito": "Haylee",
//      "edad": "3 meses",
//      "sexo": "macho",
//      "tamano": "chico",
//      "castrado": "Si",
//      "ciudad": "Burke",
//      "contacto": "Angeline",
//      "telefono": "640.752.9686 x6367",
//      "email": "Joany28@gmail.com",
//      "id": "1"
//     },
//     {
//      "perrito": "Dandre",
//      "edad": "2",
//      "sexo": "macho",
//      "tamano": "chico",
//      "castrado": "Si",
//      "ciudad": "Rapid City",
//      "contacto": "Jamir",
//      "telefono": "(789) 902-3357 x903",
//      "email": "Carroll_Hartmann@yahoo.com",
//      "id": "2"
//     },
//     {
//      "perrito": "Rene",
//      "edad": "3",
//      "sexo": "hembra",
//      "tamano": "gigante",
//      "castrado": "Si",
//      "ciudad": "Alameda",
//      "contacto": "Art",
//      "telefono": "861.675.9369",
//      "email": "Aliza.Morar41@gmail.com",
//      "id": "3"
//     },
//     {
//      "perrito": "Zola",
//      "edad": "4 meses",
//      "sexo": "hembra",
//      "tamano": "mediano",
//      "castrado": "Si",
//      "ciudad": "Suffolk",
//      "contacto": "Wilford",
//      "telefono": "802-290-1989",
//      "email": "Ambrose.Stiedemann@gmail.com",
//      "id": "4"
//     },
//     {
//      "perrito": "Hazle",
//      "edad": "5",
//      "sexo": "macho",
//      "tamano": "grande",
//      "castrado": "Si",
//      "ciudad": "Monroe",
//      "contacto": "Bartholome",
//      "telefono": "881-666-0980",
//      "email": "Henderson2@yahoo.com",
//      "id": "5"
//     },
//     {
//      "perrito": "Yasmeen",
//      "edad": "6 meses",
//      "sexo": "hembra",
//      "tamano": "mediano",
//      "castrado": "Si",
//      "ciudad": "Keller",
//      "contacto": "Kayli",
//      "telefono": "732.985.4040 x00950",
//      "email": "Candice_Auer@gmail.com",
//      "id": "6"
//     },
//     {
//      "perrito": "Glen",
//      "edad": "7",
//      "sexo": "macho",
//      "tamano": "chico",
//      "castrado": "Si",
//      "ciudad": "Springdale",
//      "contacto": "Madisyn",
//      "telefono": "277.668.4948 x6921",
//      "email": "Zena_Homenick@yahoo.com",
//      "id": "7"
//     },
//     {
//      "perrito": "Dahlia",
//      "edad": "8",
//      "sexo": "macho",
//      "tamano": "grande",
//      "castrado": "No",
//      "ciudad": "Napa",
//      "contacto": "Tracey",
//      "telefono": "987.431.7225 x950",
//      "email": "Regan_Kunde@gmail.com",
//      "id": "8"
//     },
//     {
//      "perrito": "Dillon",
//      "edad": "9",
//      "sexo": "hembra",
//      "tamano": "mediano",
//      "castrado": true,
//      "ciudad": "Westfield",
//      "contacto": "Sienna",
//      "telefono": "338.875.0564",
//      "email": "Ona.OKeefe22@gmail.com",
//      "id": "9"
//     },
//     {
//      "perrito": "Wade",
//      "edad": "10 meses",
//      "sexo": "hembra",
//      "tamano": "chico",
//      "castrado": true,
//      "ciudad": "North Richland Hills",
//      "contacto": "Coty",
//      "telefono": "1-347-836-0044 x446",
//      "email": "Deborah_DAmore@hotmail.com",
//      "id": "10"
//     },
//     {
//      "perrito": "Roscoe",
//      "edad": "11",
//      "sexo": "macho",
//      "tamano": "gigante",
//      "castrado": true,
//      "ciudad": "Houston",
//      "contacto": "Maudie",
//      "telefono": "729-428-1208 x49716",
//      "email": "Shania_Tremblay44@hotmail.com",
//      "id": "11"
//     },
//     {
//      "perrito": "Jasen",
//      "edad": "12",
//      "sexo": "macho",
//      "tamano": "grande",
//      "castrado": true,
//      "ciudad": "Grand Forks",
//      "contacto": "Blaze",
//      "telefono": "(510) 204-7032 x0821",
//      "email": "Kianna77@hotmail.com",
//      "id": "12"
//     },
//     {
//      "perrito": "Celia",
//      "edad": "13",
//      "sexo": "hembra",
//      "tamano": "chico",
//      "castrado": true,
//      "ciudad": "West Babylon",
//      "contacto": "Lelah",
//      "telefono": "(645) 889-2773 x04868",
//      "email": "Aletha_Block71@yahoo.com",
//      "id": "13"
//     },
//     {
//      "perrito": "Iva",
//      "edad": "14",
//      "sexo": "macho",
//      "tamano": "gigante",
//      "castrado": true,
//      "ciudad": "Royal Oak",
//      "contacto": "Demetris",
//      "telefono": "(805) 758-6790",
//      "email": "Zaria.Marks13@hotmail.com",
//      "id": "14"
//     },
//     {
//      "perrito": "Mafalda",
//      "edad": "1",
//      "sexo": "macho",
//      "tamano": "grande",
//      "castrado": true,
//      "ciudad": "Arecibo",
//      "contacto": "Mireya",
//      "telefono": "878-723-5459",
//      "email": "Murphy20@yahoo.com",
//      "id": "15"
//     },
//     {
//      "perrito": "Orland",
//      "edad": "6",
//      "sexo": "hembra",
//      "tamano": "chico",
//      "castrado": true,
//      "ciudad": "Frederick",
//      "contacto": "Eryn",
//      "telefono": "(588) 341-1035 x074",
//      "email": "Enola_Stoltenberg31@yahoo.com",
//      "id": "16"
//     },
//     {
//      "perrito": "Abdiel",
//      "edad": "7 meses",
//      "sexo": "macho",
//      "tamano": "chico",
//      "castrado": true,
//      "ciudad": "Lehigh Acres",
//      "contacto": "Keanu",
//      "telefono": "886-253-6771",
//      "email": "Omer.Osinski93@gmail.com",
//      "id": "17"
//     },
//     {
//      "perrito": "Ezequiel",
//      "edad": "8",
//      "sexo": "macho",
//      "tamano": "gigante",
//      "castrado": false,
//      "ciudad": "St. Louis Park",
//      "contacto": "Grant",
//      "telefono": "726-752-7215",
//      "email": "Wava39@gmail.com",
//      "id": "18"
//     },
//     {
//      "perrito": "Kacie",
//      "edad": "9 meses",
//      "sexo": "hembra",
//      "tamano": "mediano",
//      "castrado": true,
//      "ciudad": "Meridian",
//      "contacto": "Coby",
//      "telefono": "(613) 739-0694",
//      "email": "Roman_Satterfield@hotmail.com",
//      "id": "19"
//     },
//     {
//      "perrito": "Callie",
//      "edad": "2",
//      "sexo": "hembra",
//      "tamano": "mediano",
//      "castrado": false,
//      "ciudad": "Reading",
//      "contacto": "Isac",
//      "telefono": "746.354.4149 x160",
//      "email": "Ronny59@hotmail.com",
//      "id": "20"
//     },
//     {
//      "perrito": "Rogelio",
//      "edad": "1",
//      "sexo": "macho",
//      "tamano": "mediano",
//      "castrado": true,
//      "ciudad": "Pembroke Pines",
//      "contacto": "Jayson",
//      "telefono": "332-495-6744",
//      "email": "Hiram.Hermiston57@yahoo.com",
//      "id": "21"
//     },
//     {
//      "perrito": "Ellsworth",
//      "edad": "2 meses",
//      "sexo": "hembra",
//      "tamano": "mediano",
//      "castrado": false,
//      "ciudad": "Norman",
//      "contacto": "Triston",
//      "telefono": "371-448-5740",
//      "email": "Salvador_Schultz45@yahoo.com",
//      "id": "22"
//     },
//     {
//      "perrito": "Izabella",
//      "edad": "3 meses",
//      "sexo": "macho",
//      "tamano": "chico",
//      "castrado": false,
//      "ciudad": "Springfield",
//      "contacto": "Lavern",
//      "telefono": "922-307-3816 x721",
//      "email": "Christian.Dickens53@hotmail.com",
//      "id": "23"
//     },
//     {
//      "perrito": "Trey",
//      "edad": "4",
//      "sexo": "hembra",
//      "tamano": "gigante",
//      "castrado": false,
//      "ciudad": "Rancho Cordova",
//      "contacto": "Kitty",
//      "telefono": "1-886-595-6587 x7366",
//      "email": "Zachery29@yahoo.com",
//      "id": "24"
//     },
//     {
//      "perrito": "Harmony",
//      "edad": "2",
//      "sexo": "hembra",
//      "tamano": "chico",
//      "castrado": false,
//      "ciudad": "Galveston",
//      "contacto": "Durward",
//      "telefono": "455.888.0010 x56030",
//      "email": "Elisa_McLaughlin@hotmail.com",
//      "id": "25"
//     },
//     {
//      "perrito": "Conor",
//      "edad": "6",
//      "sexo": "macho",
//      "tamano": "grande",
//      "castrado": false,
//      "ciudad": "Sunrise",
//      "contacto": "Jaclyn",
//      "telefono": "244-553-7090",
//      "email": "Elroy_Dibbert73@gmail.com",
//      "id": "26"
//     },
//     {
//      "perrito": "Noemie",
//      "edad": "7",
//      "sexo": "hembra",
//      "tamano": "mediano",
//      "castrado": false,
//      "ciudad": "Cary",
//      "contacto": "Idella",
//      "telefono": "(414) 634-6151",
//      "email": "Caleigh_Hintz@gmail.com",
//      "id": "27"
//     },
//     {
//      "perrito": "Francisca",
//      "edad": "2",
//      "sexo": "hembra",
//      "tamano": "chico",
//      "castrado": false,
//      "ciudad": "Bayamon",
//      "contacto": "Chelsie",
//      "telefono": "764-886-8766 x0010",
//      "email": "Marcella12@hotmail.com",
//      "id": "28"
//     },
//     {
//      "perrito": "",
//      "edad": "",
//      "sexo": null,
//      "tamano": "chico",
//      "castrado": null,
//      "ciudad": "",
//      "contacto": "",
//      "telefono": "",
//      "email": "",
//      "id": "29"
//     },
//     {
//      "perrito": "",
//      "edad": "",
//      "sexo": null,
//      "tamano": "chico",
//      "castrado": null,
//      "ciudad": "",
//      "contacto": "",
//      "telefono": "",
//      "email": "",
//      "id": "35"
//     },
//     {
//      "perrito": "kjgggggggggggg",
//      "edad": "klj",
//      "sexo": "macho",
//      "tamano": "chico",
//      "castrado": "si",
//      "ciudad": "Mar Del Plata",
//      "contacto": "yo",
//      "telefono": "3666666",
//      "email": "melisa.burlando@gmail.com",
//      "id": "36"
//     },
//     {
//      "perrito": "23423",
//      "edad": "dsdd",
//      "sexo": "macho",
//      "tamano": "chico",
//      "castrado": "si",
//      "ciudad": "werw",
//      "contacto": "Meli",
//      "telefono": "werw",
//      "email": "melisa.burlando@gmail.com",
//      "id": "37"
//     },
//     {
//      "perrito": "asdasd",
//      "edad": "sdasd",
//      "sexo": "macho",
//      "tamano": "chico",
//      "castrado": "si",
//      "ciudad": "Mar Del Plata",
//      "contacto": "asdasd",
//      "telefono": "234234",
//      "email": "melisa.burlando@gmail.com",
//      "id": "38"
//     },
//     {
//      "0": {
//       "perrito": "Colita",
//       "edad": "5",
//       "sexo": "macho",
//       "tamano": "chico",
//       "castrado": "Sí",
//       "ciudad": "Mar del Plata",
//       "contacto": "Juan",
//       "telefono": "1111111",
//       "email": "juan@juan.juan"
//      },
//      "1": {
//       "perrito": "Blanquita",
//       "edad": "8",
//       "sexo": "hembra",
//       "tamano": "grande",
//       "castrado": "Sí",
//       "ciudad": "Mar del Plata",
//       "contacto": "María",
//       "telefono": "2222222",
//       "email": "maria@maria.maria"
//      },
//      "2": {
//       "perrito": "Manchita",
//       "edad": "2",
//       "sexo": "macho",
//       "tamano": "mediano",
//       "castrado": "Sí",
//       "ciudad": "Mar del Plata",
//       "contacto": "Pedro",
//       "telefono": "33333333333",
//       "email": "pedro@pedro.pedro"
//      },
//      "perrito": "Leatha",
//      "edad": "edad 39",
//      "sexo": "sexo 39",
//      "tamano": "tamano 39",
//      "castrado": false,
//      "ciudad": "Wesley Chapel",
//      "contacto": "Keeley",
//      "telefono": "526.801.8243 x169",
//      "email": "Clare.Beer@yahoo.com",
//      "id": "39"
//     },
//     {
//      "0": {
//       "perrito": "Colita",
//       "edad": "5",
//       "sexo": "macho",
//       "tamano": "chico",
//       "castrado": "Sí",
//       "ciudad": "Mar del Plata",
//       "contacto": "Juan",
//       "telefono": "1111111",
//       "email": "juan@juan.juan"
//      },
//      "1": {
//       "perrito": "Blanquita",
//       "edad": "8",
//       "sexo": "hembra",
//       "tamano": "grande",
//       "castrado": "Sí",
//       "ciudad": "Mar del Plata",
//       "contacto": "María",
//       "telefono": "2222222",
//       "email": "maria@maria.maria"
//      },
//      "2": {
//       "perrito": "Manchita",
//       "edad": "2",
//       "sexo": "macho",
//       "tamano": "mediano",
//       "castrado": "Sí",
//       "ciudad": "Mar del Plata",
//       "contacto": "Pedro",
//       "telefono": "33333333333",
//       "email": "pedro@pedro.pedro"
//      },
//      "perrito": "Ivah",
//      "edad": "edad 40",
//      "sexo": "sexo 40",
//      "tamano": "tamano 40",
//      "castrado": true,
//      "ciudad": "Fort Lauderdale",
//      "contacto": "Lulu",
//      "telefono": "890.487.5888 x975",
//      "email": "Maribel48@gmail.com",
//      "id": "40"
//     },
//     {
//      "0": {
//       "perrito": "Colita",
//       "edad": "5",
//       "sexo": "macho",
//       "tamano": "chico",
//       "castrado": "Sí",
//       "ciudad": "Mar del Plata",
//       "contacto": "Juan",
//       "telefono": "1111111",
//       "email": "juan@juan.juan"
//      },
//      "1": {
//       "perrito": "Blanquita",
//       "edad": "8",
//       "sexo": "hembra",
//       "tamano": "grande",
//       "castrado": "Sí",
//       "ciudad": "Mar del Plata",
//       "contacto": "María",
//       "telefono": "2222222",
//       "email": "maria@maria.maria"
//      },
//      "2": {
//       "perrito": "Manchita",
//       "edad": "2",
//       "sexo": "macho",
//       "tamano": "mediano",
//       "castrado": "Sí",
//       "ciudad": "Mar del Plata",
//       "contacto": "Pedro",
//       "telefono": "33333333333",
//       "email": "pedro@pedro.pedro"
//      },
//      "perrito": "Savanah",
//      "edad": "edad 41",
//      "sexo": "sexo 41",
//      "tamano": "tamano 41",
//      "castrado": false,
//      "ciudad": "Frisco",
//      "contacto": "Emilio",
//      "telefono": "1-231-889-2610 x823",
//      "email": "Margarita.Krajcik85@hotmail.com",
//      "id": "41"
//     },
//     {
//      "0": {
//       "perrito": "Colita",
//       "edad": "5",
//       "sexo": "macho",
//       "tamano": "chico",
//       "castrado": "Sí",
//       "ciudad": "Mar del Plata",
//       "contacto": "Juan",
//       "telefono": "1111111",
//       "email": "juan@juan.juan"
//      },
//      "1": {
//       "perrito": "Blanquita",
//       "edad": "8",
//       "sexo": "hembra",
//       "tamano": "grande",
//       "castrado": "Sí",
//       "ciudad": "Mar del Plata",
//       "contacto": "María",
//       "telefono": "2222222",
//       "email": "maria@maria.maria"
//      },
//      "2": {
//       "perrito": "Manchita",
//       "edad": "2",
//       "sexo": "macho",
//       "tamano": "mediano",
//       "castrado": "Sí",
//       "ciudad": "Mar del Plata",
//       "contacto": "Pedro",
//       "telefono": "33333333333",
//       "email": "pedro@pedro.pedro"
//      },
//      "perrito": "Quinten",
//      "edad": "edad 42",
//      "sexo": "sexo 42",
//      "tamano": "tamano 42",
//      "castrado": false,
//      "ciudad": "Chesapeake",
//      "contacto": "Michael",
//      "telefono": "961.323.9916 x13073",
//      "email": "Dayna.Bogan81@hotmail.com",
//      "id": "42"
//     },
//     {
//      "0": {
//       "perrito": "Colita",
//       "edad": "5",
//       "sexo": "macho",
//       "tamano": "chico",
//       "castrado": "Sí",
//       "ciudad": "Mar del Plata",
//       "contacto": "Juan",
//       "telefono": "1111111",
//       "email": "juan@juan.juan"
//      },
//      "1": {
//       "perrito": "Blanquita",
//       "edad": "8",
//       "sexo": "hembra",
//       "tamano": "grande",
//       "castrado": "Sí",
//       "ciudad": "Mar del Plata",
//       "contacto": "María",
//       "telefono": "2222222",
//       "email": "maria@maria.maria"
//      },
//      "2": {
//       "perrito": "Manchita",
//       "edad": "2",
//       "sexo": "macho",
//       "tamano": "mediano",
//       "castrado": "Sí",
//       "ciudad": "Mar del Plata",
//       "contacto": "Pedro",
//       "telefono": "33333333333",
//       "email": "pedro@pedro.pedro"
//      },
//      "perrito": "Shaun",
//      "edad": "edad 43",
//      "sexo": "sexo 43",
//      "tamano": "tamano 43",
//      "castrado": false,
//      "ciudad": "Altamonte Springs",
//      "contacto": "Katrina",
//      "telefono": "(421) 312-8386 x464",
//      "email": "Mallie_Mertz@yahoo.com",
//      "id": "43"
//     },
//     {
//      "0": {
//       "perrito": "Colita",
//       "edad": "5",
//       "sexo": "macho",
//       "tamano": "chico",
//       "castrado": "Sí",
//       "ciudad": "Mar del Plata",
//       "contacto": "Juan",
//       "telefono": "1111111",
//       "email": "juan@juan.juan"
//      },
//      "1": {
//       "perrito": "Blanquita",
//       "edad": "8",
//       "sexo": "hembra",
//       "tamano": "grande",
//       "castrado": "Sí",
//       "ciudad": "Mar del Plata",
//       "contacto": "María",
//       "telefono": "2222222",
//       "email": "maria@maria.maria"
//      },
//      "2": {
//       "perrito": "Manchita",
//       "edad": "2",
//       "sexo": "macho",
//       "tamano": "mediano",
//       "castrado": "Sí",
//       "ciudad": "Mar del Plata",
//       "contacto": "Pedro",
//       "telefono": "33333333333",
//       "email": "pedro@pedro.pedro"
//      },
//      "perrito": "Arvid",
//      "edad": "edad 44",
//      "sexo": "sexo 44",
//      "tamano": "tamano 44",
//      "castrado": false,
//      "ciudad": "Gilroy",
//      "contacto": "Novella",
//      "telefono": "1-310-424-0958 x70928",
//      "email": "Myrtis4@hotmail.com",
//      "id": "44"
//     },
//     {
//      "0": {
//       "perrito": "Colita",
//       "edad": "5",
//       "sexo": "macho",
//       "tamano": "chico",
//       "castrado": "Sí",
//       "ciudad": "Mar del Plata",
//       "contacto": "Juan",
//       "telefono": "1111111",
//       "email": "juan@juan.juan"
//      },
//      "1": {
//       "perrito": "Blanquita",
//       "edad": "8",
//       "sexo": "hembra",
//       "tamano": "grande",
//       "castrado": "Sí",
//       "ciudad": "Mar del Plata",
//       "contacto": "María",
//       "telefono": "2222222",
//       "email": "maria@maria.maria"
//      },
//      "2": {
//       "perrito": "Manchita",
//       "edad": "2",
//       "sexo": "macho",
//       "tamano": "mediano",
//       "castrado": "Sí",
//       "ciudad": "Mar del Plata",
//       "contacto": "Pedro",
//       "telefono": "33333333333",
//       "email": "pedro@pedro.pedro"
//      },
//      "perrito": "Germaine",
//      "edad": "edad 45",
//      "sexo": "sexo 45",
//      "tamano": "tamano 45",
//      "castrado": false,
//      "ciudad": "Kenosha",
//      "contacto": "Shania",
//      "telefono": "1-894-901-3694 x519",
//      "email": "Marilie.Kris@hotmail.com",
//      "id": "45"
//     },
//     {
//      "0": {
//       "perrito": "Colita",
//       "edad": "5",
//       "sexo": "macho",
//       "tamano": "chico",
//       "castrado": "Sí",
//       "ciudad": "Mar del Plata",
//       "contacto": "Juan",
//       "telefono": "1111111",
//       "email": "juan@juan.juan"
//      },
//      "1": {
//       "perrito": "Blanquita",
//       "edad": "8",
//       "sexo": "hembra",
//       "tamano": "grande",
//       "castrado": "Sí",
//       "ciudad": "Mar del Plata",
//       "contacto": "María",
//       "telefono": "2222222",
//       "email": "maria@maria.maria"
//      },
//      "2": {
//       "perrito": "Manchita",
//       "edad": "2",
//       "sexo": "macho",
//       "tamano": "mediano",
//       "castrado": "Sí",
//       "ciudad": "Mar del Plata",
//       "contacto": "Pedro",
//       "telefono": "33333333333",
//       "email": "pedro@pedro.pedro"
//      },
//      "perrito": "Tyrese",
//      "edad": "edad 46",
//      "sexo": "sexo 46",
//      "tamano": "tamano 46",
//      "castrado": false,
//      "ciudad": "Kennewick",
//      "contacto": "Bobby",
//      "telefono": "202.303.0507 x56053",
//      "email": "Moises_Ziemann@yahoo.com",
//      "id": "46"
//     },
//     {
//      "0": {
//       "perrito": "Colita",
//       "edad": "5",
//       "sexo": "macho",
//       "tamano": "chico",
//       "castrado": "Sí",
//       "ciudad": "Mar del Plata",
//       "contacto": "Juan",
//       "telefono": "1111111",
//       "email": "juan@juan.juan"
//      },
//      "1": {
//       "perrito": "Blanquita",
//       "edad": "8",
//       "sexo": "hembra",
//       "tamano": "grande",
//       "castrado": "Sí",
//       "ciudad": "Mar del Plata",
//       "contacto": "María",
//       "telefono": "2222222",
//       "email": "maria@maria.maria"
//      },
//      "2": {
//       "perrito": "Manchita",
//       "edad": "2",
//       "sexo": "macho",
//       "tamano": "mediano",
//       "castrado": "Sí",
//       "ciudad": "Mar del Plata",
//       "contacto": "Pedro",
//       "telefono": "33333333333",
//       "email": "pedro@pedro.pedro"
//      },
//      "perrito": "Joanie",
//      "edad": "edad 47",
//      "sexo": "sexo 47",
//      "tamano": "tamano 47",
//      "castrado": false,
//      "ciudad": "Saginaw",
//      "contacto": "Derrick",
//      "telefono": "(685) 744-2516 x11162",
//      "email": "Maxine_OHara@yahoo.com",
//      "id": "47"
//     },
//     {
//      "0": {
//       "perrito": "Colita",
//       "edad": "5",
//       "sexo": "macho",
//       "tamano": "chico",
//       "castrado": "Sí",
//       "ciudad": "Mar del Plata",
//       "contacto": "Juan",
//       "telefono": "1111111",
//       "email": "juan@juan.juan"
//      },
//      "1": {
//       "perrito": "Blanquita",
//       "edad": "8",
//       "sexo": "hembra",
//       "tamano": "grande",
//       "castrado": "Sí",
//       "ciudad": "Mar del Plata",
//       "contacto": "María",
//       "telefono": "2222222",
//       "email": "maria@maria.maria"
//      },
//      "2": {
//       "perrito": "Manchita",
//       "edad": "2",
//       "sexo": "macho",
//       "tamano": "mediano",
//       "castrado": "Sí",
//       "ciudad": "Mar del Plata",
//       "contacto": "Pedro",
//       "telefono": "33333333333",
//       "email": "pedro@pedro.pedro"
//      },
//      "perrito": "Roma",
//      "edad": "edad 48",
//      "sexo": "sexo 48",
//      "tamano": "tamano 48",
//      "castrado": true,
//      "ciudad": "Bellevue",
//      "contacto": "Breanne",
//      "telefono": "886.280.4841 x25896",
//      "email": "Amy54@yahoo.com",
//      "id": "48"
//     },
//     {
//      "0": {
//       "perrito": "Colita",
//       "edad": "5",
//       "sexo": "macho",
//       "tamano": "chico",
//       "castrado": "Sí",
//       "ciudad": "Mar del Plata",
//       "contacto": "Juan",
//       "telefono": "1111111",
//       "email": "juan@juan.juan"
//      },
//      "1": {
//       "perrito": "Blanquita",
//       "edad": "8",
//       "sexo": "hembra",
//       "tamano": "grande",
//       "castrado": "Sí",
//       "ciudad": "Mar del Plata",
//       "contacto": "María",
//       "telefono": "2222222",
//       "email": "maria@maria.maria"
//      },
//      "2": {
//       "perrito": "Manchita",
//       "edad": "2",
//       "sexo": "macho",
//       "tamano": "mediano",
//       "castrado": "Sí",
//       "ciudad": "Mar del Plata",
//       "contacto": "Pedro",
//       "telefono": "33333333333",
//       "email": "pedro@pedro.pedro"
//      },
//      "perrito": "Elton",
//      "edad": "edad 49",
//      "sexo": "sexo 49",
//      "tamano": "tamano 49",
//      "castrado": false,
//      "ciudad": "Kansas City",
//      "contacto": "Deontae",
//      "telefono": "775-222-3748 x07839",
//      "email": "Giles_Weimann@yahoo.com",
//      "id": "49"
//     },
//     {
//      "0": {
//       "perrito": "Colita",
//       "edad": "5",
//       "sexo": "macho",
//       "tamano": "chico",
//       "castrado": "Sí",
//       "ciudad": "Mar del Plata",
//       "contacto": "Juan",
//       "telefono": "1111111",
//       "email": "juan@juan.juan"
//      },
//      "1": {
//       "perrito": "Blanquita",
//       "edad": "8",
//       "sexo": "hembra",
//       "tamano": "grande",
//       "castrado": "Sí",
//       "ciudad": "Mar del Plata",
//       "contacto": "María",
//       "telefono": "2222222",
//       "email": "maria@maria.maria"
//      },
//      "2": {
//       "perrito": "Manchita",
//       "edad": "2",
//       "sexo": "macho",
//       "tamano": "mediano",
//       "castrado": "Sí",
//       "ciudad": "Mar del Plata",
//       "contacto": "Pedro",
//       "telefono": "33333333333",
//       "email": "pedro@pedro.pedro"
//      },
//      "perrito": "Camylle",
//      "edad": "edad 50",
//      "sexo": "sexo 50",
//      "tamano": "chico",
//      "castrado": "Si",
//      "ciudad": "Brentwood",
//      "contacto": "Myrl",
//      "telefono": "912-658-6463",
//      "email": "Alana.Bartoletti@hotmail.com",
//      "id": "50"
//     }
//    ]