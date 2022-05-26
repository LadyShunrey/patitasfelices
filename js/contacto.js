"use strict"

//primero genero el captcha

//declaro una variable donde va a quedar el captcha una vez generado
let captcha;

//declaro una variable con todas las letras que puede tener el captcha
let letras = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";

//agrego un evento que inicie la función captcha al cargar la página
window.addEventListener("load", generarCaptcha);

//armo la funcion que genere el captcha
function generarCaptcha(){
    //quiero que mi captcha tenga 6 numeros y letras, entonces hago 6 variables
    //algunas van a elegir una letra al azar de la variable letras, otras van a elegir un numero al azar
    let primer = letras[Math.floor(Math.random() * letras.length)];
    let segundo = Math.floor(Math.random() * 10);
    let tercero = Math.floor(Math.random() * 10);
    let cuarto = letras[Math.floor(Math.random() * letras.length)];
    let quinto = letras[Math.floor(Math.random() * letras.length)];
    let sexto = Math.floor(Math.random() * 10);
    
    //ahora le asigno a la variable captcha el valor de todas las demás variables combinadas
    captcha = primer.toString()+segundo.toString()+tercero.toString()+cuarto.toString()+quinto.toString()+sexto.toString();
    console.log('este es el captcha generado: ' + captcha);
    
    let imagenCaptcha = document.querySelector('#js-imagen-captcha');
    imagenCaptcha.innerHTML = captcha;
}

//ahora voy a comparar el captcha que generé con el input del usuario

// declaro una variable para traer el form
let formulario = document.querySelector('#js-formulario');

//agrego el evento que escuche cuando se submitea el form y valida el captcha
formulario.addEventListener('submit', compararCaptcha)

//funcion que compara y aprueba el form
function compararCaptcha(event){
    //evitar que se envíe el form
    event.preventDefault()

    //consolear que se inicialice la funcion
    console.log('se inicializa la validación ');

    //declaro la variable que recibe el input del captcha
    let captchaEntrada = document.querySelector('#js-input-captcha').value;
    console.log('lo que ingreso el usuario es ' + captchaEntrada);
    
    //declaro la variable que va a mandar los mensajes
    let mensajeCaptcha = document.querySelector('#js-mensaje-captcha');

    //comparar lo que pone el usuario con la respuesta correcta de la imagen
    if(captchaEntrada == captcha){
        // aprobar el formulario
       mensajeCaptcha.innerHTML = "Su mensaje ha sido enviado con éxito";
       //mandar formulario 
       //formulario.submit();

       //chequeamos que el form llegue correctamente
       console.log('se submiteo correctamente el form ' + formulario);
    }
    else{
        //pedir volver a intentar
        mensajeCaptcha.innerHTML = "Captcha incorrecto por favor intente nuevamente";
        
        //que de el error correcto
        console.log('el usuario ingreso un captcha incorrecto');
    }
}