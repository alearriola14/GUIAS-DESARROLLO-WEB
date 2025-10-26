function aviso(){
    alert("bienvenido al mundo de JavaScript");
}
function confirmacion(){
    let confirmacion = confirm("desea salir de la sesion?")
    alert(`valor seleccionado: ${confirmacion}`);
}
function capturarDatos(){
    let nombre = prompt("cual es su nombre?");
    let edad = prompt("cual es su edad?", 0);
    alert(`su nombre es: ${nombre} y su edad es: ${edad}`);
}
function dibujarParrafo(){
    let parrafo = prompt("escriba la informacion que desea visualizar en el parrafo");
    const p = document.querySelector("#idParrafo");
    p.innerHTML = parrafo;
}