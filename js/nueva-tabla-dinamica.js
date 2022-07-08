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

window.addEventListener("load", paginacion);
async function paginacion(){
    try{
        let respuesta = await fetch (`${url}`);
        console.log(respuesta);
        let json = await respuesta.json();
        console.log(json);
        let sizeJson = json.length;

        let mensajePerritosDisponibles = document.querySelector(".mensaje-perritos-disponibles");
        mensajePerritosDisponibles.innerHTML = "En éste momento hay " + sizeJson + " perritos disponibles para adoptar!";

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
        sizeArreglo = json.length;
        console.log("El tamaño del arreglo es de " + sizeArreglo);    
        tabla.innerHTML = `<th>PERRITO</th><th>EDAD</th><th>SEXO</th><th>TAMAÑO</th><th>CASTRADO</th><th>CIUDAD</th><th>CONTACTO</th><th>TELÉFONO</th><th>EMAIL</th><th>ID</th>`

        for (let numeroDeVuelta =0; numeroDeVuelta<sizeArreglo; numeroDeVuelta++){
            //if castrado == true castrado = "Sí"
            ////else (castrado == false) castrado = "No"
            idDelJson = json[numeroDeVuelta].id;
            tabla.innerHTML += `<td>${json[numeroDeVuelta].perrito}</td><td>${json[numeroDeVuelta].edad}</td><td>${json[numeroDeVuelta].sexo}</td><td>${json[numeroDeVuelta].tamano}</td><td>${json[numeroDeVuelta].castrado}</td><td>${json[numeroDeVuelta].ciudad}</td><td>${json[numeroDeVuelta].contacto}</td><td>${json[numeroDeVuelta].telefono}</td><td>${json[numeroDeVuelta].email}</td><td><button class="js-editar-perrito-por-id" data-id2=${idDelJson}>EDITAR✏️</button></td><td><button class="js-borrar-perrito-por-id" data-id=${idDelJson}>ELIMINAR🗑️</button></td>`;
            
            console.log("en esta vuelta: "+ numeroDeVuelta +", el id es: "+idDelJson);
        }
        document.querySelectorAll(".js-borrar-perrito-por-id").forEach((boton) =>{
            boton.addEventListener("click", borrarPerrito);
        })
        document.querySelectorAll(".js-editar-perrito-por-id").forEach((boton) =>{
            boton.addEventListener("click", editarPerrito);
        })
    } catch (error) {
        console.log(error);
    }
    //if sexo==hembra hacer resaltado {
    //  (algo que me agarre toda la fila).classList.add('resaltado')
    //}
}

let form = document.querySelector("#js-formulario-adopciones-usuarios")
form.addEventListener("submit", agregarPerrito);

async function agregarPerrito(event){
    event.preventDefault();
    //levantar los input del form y los guardo en un json
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

async function borrarPerrito(){
    // let idParaBorrar = document.querySelector("#js-borrar-este-id").value;
    console.log("entré a la función borrar");
    
    let deleteId = this.getAttribute("data-id");
    
    //DELETE a ese ID "idParaBorrar" -1 (el -1 porque va desfazado por 1 el ID en relación al arreglo)

    try{
        let respuesta = await fetch(`${url}/${deleteId}`, {
            "method":"DELETE"
        });
        if(respuesta.status === 200){
            document.querySelector("#mensaje-perrito-agregado").innerHTML = "Perrito de ID " + idDelJson + " eliminado correctamente!";
        }
    } catch(error){
        console.log(error);
    }
    llamarServicio();
}

//agregar la función editar capaz con partial Render? O algo que cargue alguna ventanita, pensar y decidir.

let editar = document.querySelector(".paraEditar"); 
document.querySelector(".cerrar").addEventListener("click", function(e){
    editar.classList.remove('mostrar');
})

function editarPerrito(event){
    event.preventDefault();
    console.log("entré a la función editar");
    editar.classList.add('mostrar');
    let editId = this.getAttribute("data-id2");
    console.log("el id del edit es " + editId)
    document.querySelector("#js-id-editar-perrito").value = editId;
}

let formEdit = document.querySelector("#js-formulario-editar")
formEdit.addEventListener("submit", editarTabla);
async function editarTabla(event){
    event.preventDefault();
    let editId = document.querySelector("#js-id-editar-perrito").value;
    console.log("el id del edit es " + editId)

    let formData = new FormData(formEdit);
    let perrito = formData.get('perrito-edit');
    let edad = formData.get('edad-edit');
    let sexo = formData.get('sexo-edit');
    let tamano = formData.get('tamano-edit');
    let castrado = formData.get('castrado-edit');
    let ciudad = formData.get('ciudad-edit');
    let contacto = formData.get('contacto-edit');
    let telefono = formData.get('telefono-edit');
    let email = formData.get('email-edit');
     
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
        let respuesta = await fetch(`${url}/${editId}`, {
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
    editar.classList.remove('mostrar');
}

document.querySelector("#js-agregar-perritos").addEventListener("click", agregarVariosPerritos);

async function agregarVariosPerritos(event){
    for(let i = 0; i < 3; i++){
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
                document.querySelector("#mensaje-perrito-agregado").innerHTML = "Perrito cargado correctamente!";
            }
        } catch (error) {
            console.log(error);
        }

        llamarServicio();

    }
}

let filtroElegido = document.querySelector("#filtros");
filtroElegido.addEventListener("change", filtrar);

// function filtrar (){
//     console.log("entré a filtrar")
//     //esconder todo
//     let todasLasCeldas = document.querySelectorAll("#js-tabla-adopciones-usuarios td");
//     console.log(todasLasCeldas);
//     for(let i = 0; i< todasLasCeldas.length; i++){
//         todasLasCeldas[i].classList.add("filtro");
//          if(filtroElegido.value == "todos"){
//                 todasLasCeldas[i].classList.remove("filtro");
//             }
//         if(filtroElegido.value == todasLasCeldas[i].innerHTML){
//             todasLasCeldas[i].classList.remove("filtro");
//         }
//     }
// }

function filtrar (){
    console.log("entré a filtrar")
    //esconder todo
    //creo la variable que levanta del dom las tr
    let filas = document.querySelectorAll("#js-tabla-adopciones-usuarios tbody:not(:first-child) tr");
    //recorro cada fila
    for(let i = 0; i < filas.length; i++){
        //agrego la clase filtro a la fila en la que estoy recoriendo
        filas[i].classList.add("filtro");
        //creo la variable celdas que hace un arreglo con las celdas de cada fila
        let celdas = filas[i].getElementsByTagName("td");
        console.log(celdas);
        //ahora recorro cada columna de la fila
        for (let j = 0; j < celdas.length; j++) {
            //creo una variable por cada celda en particular
            let celda = filas[i].getElementsByTagName("td")[j];
            //si la celda existe
            if (celda) {
                //si existe el indice del valor de la celda va a dar 0 (ésto va amostrar TODOS)
                if ((celda.innerHTML.indexOf(filtroElegido.value) > -1) ||(filtroElegido.value == "todos")) {
                    //si existe le saca la clase filtro
                    filas[i].classList.remove("filtro");
                    break;
                } 
            }
        }
    }
}