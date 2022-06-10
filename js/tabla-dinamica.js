"use strict";

// arreglo con perritos
let puppiesArray = [
    {
        perrito: "Morfeo",
        edad: "2",
        sexo: "Macho",
        tamaño: "Grande",
        castrado: "Si",
        ciudad: "Mar del Plata",
        contacto: "Julián",
        telefono: "000000001",
        email: "awesomedogo@gmail.com",
    },
    {
        perrito: "Titan",
        edad: "1",
        sexo: "Hembra",
        tamaño: "Gigante",
        castrado: "No",
        ciudad: "Tandil",
        contacto: "Jonatan",
        telefono: "000000002",
        email: "awesomedoga@gmail.com",
    },
    {
        perrito: "Luna",
        edad: "2",
        sexo: "Macho",
        tamaño: "Mediano",
        castrado: "Si",
        ciudad: "Necochea",
        contacto: "José",
        telefono: "000000003",
        email: "awesomedoge@gmail.com",
    },
    {
        perrito: "Jackie",
        edad: "4",
        sexo: "Hembra",
        tamaño: "Pequeño",
        castrado: "No",
        ciudad: "Misiones",
        contacto: "Juan",
        telefono: "000000004",
        email: "awesomedogu@gmail.com",
    },
];

// otro arreglo de perritos
const morePuppiesArray = [
    {
        perrito: "Rolando",
        edad: "6",
        sexo: "Hembra",
        tamaño: "Pequeño",
        castrado: "No",
        ciudad: "Tandil",
        contacto: "Jonatan",
        telefono: "000000005",
        email: "awesomedoga3@gmail.com",
    },
    {
        perrito: "Malafama",
        edad: "10",
        sexo: "Macho",
        tamaño: "Grande",
        castrado: "Si",
        ciudad: "Trelew",
        contacto: "José",
        telefono: "000000006",
        email: "awesomedoge2@gmail.com",
    },
    {
        perrito: "Tita",
        edad: "11",
        sexo: "Hembra",
        tamaño: "Gigante",
        castrado: "Si",
        ciudad: "Mendoza",
        contacto: "Florencia",
        telefono: "000000007",
        email: "awesomedogu1@gmail.com",
    },
];

// agregamos un evento que inicie la función buildTable al cargar la página
window.addEventListener("load", buildTable);
const table = document.querySelector("#js-tabla-adopciones-usuarios");

// armamos la funcion que genera la tabla
function buildTable() {
    buildTableHead(table, puppiesArray[0]);
    buildTableData(table, puppiesArray, true);
}

function buildTableHead(table, puppies) {
    // creamos la cabeceras de la tabla e insertamos una fila
    let thead = table.createTHead();
    let row = thead.insertRow();
    // recorremos los atributos de cada perro
    for (let puppy in puppies) {
        // creamos una celda por cada key de los atributos
        let th = document.createElement("th");
        // seteamos el atributo a la celda correspondiente
        let text = document.createTextNode(puppy);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function buildTableData(table, puppies, firstTime) {
    let tbody;
    if (firstTime) {
        tbody = table.createTBody();
    } else {
        tbody = table.getElementsByTagName("tbody")[0];
    }

    tbody;

    // recorremos el json
    for (let puppy of puppies) {
        // por cada objeto creamos una fila
        let row = tbody.insertRow();
        // recorremos los atributos de cada perro
        for (let key in puppy) {
            // creamos una celda por cada atributo
            let cell = row.insertCell();
            // seteamos el atributo a la celda correspondiente
            let text = document.createTextNode(puppy[key]);
            cell.appendChild(text);
        }
    }
}

const addPuppies = document.querySelector("#js-agregar-perritos");
const killPuppies = document.querySelector("#js-borrar-perritos");

addPuppies.addEventListener("click", addPuppiesToTable);
killPuppies.addEventListener("click", killPuppiesInTable);

function addPuppiesToTable(event) {
    event.preventDefault();
    // pusheamos a la tabla existente otro arreglo con más perritos
    buildTableData(table, morePuppiesArray);
    puppiesArray = [...puppiesArray, ...morePuppiesArray];
    console.log(puppiesArray);
}

function killPuppiesInTable(event) {
    event.preventDefault();
    // seleccionamos cada fila de la tabla y las borramos
    table.querySelectorAll("td").forEach((td) => td.remove());
    puppiesArray = [];
}

const form = document.querySelector("#js-formulario-adopciones-usuarios");
form.addEventListener("submit", addPuppyToTable);

function addPuppyToTable(event) {
    event.preventDefault();
    // creamos un formData a partir del form
    const formData = new FormData(form);
    // generamos 2 funciones genéricas para borrar los textos de los campos y para borrar los números con una expresión regular
    // de esta manera ordenamos los campos según la posición de cada atributo en el arreglo
    const removeText = (value) => value.replace(/\D/g, "");
    const removeNumbers = (value) => value.replace(/[0-9]+-/g, "");
    // a partir de los campos del form creamos una variable y los reordenamos según la posición en el arreglo inicial
    // y corremos una función de reducer para crear un objeto con todos con todos los valores
    const puppy = Array.from(formData.entries())
        .sort((a, b) => removeText(a[0]) - removeText(b[0]))
        .reduce(
            (previousValue, [key, value]) => ({
                ...previousValue,
                [removeNumbers(key)]: value,
            }),
            {}
        );
    //creamos la fila en la tabla
    buildTableData(table, [puppy]);
    // agregamos al arreglo el cachorro

    puppiesArray.push(puppy);
    console.log(puppiesArray);
    // reseteamos los campos del form
    form.reset();
}

const tds = document.querySelectorAll("#table td");
for (let i = 0; i < tds.length; i++) {
    let text = tds[i].innerText;
    if (text === "Macho" || text === "macho") {
        tds[i].classList.add("perrito-macho");
    }
}
