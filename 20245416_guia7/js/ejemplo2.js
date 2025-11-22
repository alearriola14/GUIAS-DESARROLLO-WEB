// Obteniendo la referencia de los elementos
// por medio de arreglos asociativos
// aqui se esta utilizando el atributo name de cada elemento
const formulario = document.forms["frmRegistro"];
const button = document.forms["frmRegistro"].elements["btnRegistro"];
// CREANDO MODAL CON BOOTSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});
// OBTENIENDO LA REFERENCIA DEL CUERPO DEL MODAL
// PARA IMPRIMIR EL RESULTADO
const bodyModal = document.getElementById("idBodyModal");
// Recorrer el formulario
const recorrerFormulario = function () {
    let totText = 0;
    let totRadio = 0;
    let totCheck = 0;
    let totDate = 0;
    let totSelect = 0;
    let totFile = 0;
    let totPass = 0;
    let totEmail = 0;

    // Recorriendo elementos del formulario
    let elementos = formulario.elements;
    let totalElementos = elementos.length;

    for (let index = 0; index < totalElementos; index++) {
        // Accediendo a cada hijo del formulario
        let elemento = elementos[index];

        // verificando el tipo de control en el formulario
        let tipoElemento = elemento.type;
        // verificando el tipo de nodo
        let tipoNode = elemento.nodeName;

        // Contabilizando el total de INPUT TYPE = TEXT
        if ((tipoElemento == "text") && tipoNode == "INPUT") {
            console.log(elemento);
            totText++;
        }

        // Contabilizando el total de INPUT TYPE = PASSWORD
        else if ((tipoElemento == "password") && tipoNode == "INPUT") {
            console.log(elemento);
            totPass++;
        }

        // Contabilizando el total de INPUT TYPE = EMAIL
        else if ((tipoElemento == "email") && tipoNode == "INPUT") {
            console.log(elemento);
            totEmail++;
        }

        // Contabilizando el total de INPUT TYPE = RADIO
        else if ((tipoElemento == "radio") && tipoNode == "INPUT") {
            console.log(elemento);
            totRadio++;
        }

        // Contabilizando el total de INPUT TYPE = CHECKBOX
        else if ((tipoElemento == "checkbox") && tipoNode == "INPUT") {
            console.log(elemento);
            totCheck++;
        }

        // Contabilizando el total de INPUT TYPE = FILE
        else if ((tipoElemento == "file") && tipoNode == "INPUT") {
            console.log(elemento);
            totFile++;
        }

        // Contabilizando el total de INPUT TYPE = CHECKBOX
        else if ((tipoElemento == "date") && tipoNode == "INPUT") {
            console.log(elemento);
            totDate++;
        }

        // Contabilizando el total de INPUT TYPE = EMAIL
        else if (tipoNode == "SELECT") {
            console.log(elemento);
            totSelect++;
        }
    }

    let resultado = `
Total de input[type="text"] = ${totText}<br>
Total de input[type="password"] = ${totPass}<br>
Total de input[type="radio"] = ${totRadio}<br>
Total de input[type="checkbox"] = ${totCheck}<br>
Total de input[type="date"] = ${totDate}<br>
Total de input[type="email"] = ${totEmail}<br>
Total de select = ${totSelect}<br>
`;

    bodyModal.innerHTML = resultado;
    // Funcion que permite mostrar el modal de Bootstrap
    // Esta funcion es definida por Bootstrap
    modal.show();
};

// Validar campos vacíos
const validarCamposVacios = function() {
    const campos = {
        nombres: document.getElementById("idNombre"),
        apellidos: document.getElementById("idApellidos"),
        fechaNac: document.getElementById("idFechaNac"),
        correo: document.getElementById("idCorreo"),
        password: document.getElementById("idPassword"),
        passwordRepetir: document.getElementById("idPasswordRepetir")
    };

    for (let campo in campos) {
        if (campos[campo].value.trim() === "") {
            alert(`El campo ${campo} es obligatorio`);
            campos[campo].focus();
            return false;
        }
    }
    return true;
};

// fecha de nacimiento
const validarFechaNacimiento = function() {
    const fechaNac = new Date(document.getElementById("idFechaNac").value);
    const fechaActual = new Date();
    
    if (fechaNac >= fechaActual) {
        alert("La fecha de nacimiento no puede ser mayor o igual a la fecha actual");
        document.getElementById("idFechaNac").focus();
        return false;
    }
    return true;
};

// email 
const validarEmail = function() {
    const email = document.getElementById("idCorreo").value;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!regexEmail.test(email)) {
        alert("Por favor ingrese un correo electrónico válido");
        document.getElementById("idCorreo").focus();
        return false;
    }
    return true;
};

// contraseñas
const validarPasswords = function() {
    const password = document.getElementById("idPassword").value;
    const passwordRepetir = document.getElementById("idPasswordRepetir").value;
    
    if (password !== passwordRepetir) {
        alert("Las contraseñas no coinciden");
        document.getElementById("idPasswordRepetir").focus();
        return false;
    }
    return true;
};

// intereses
const validarIntereses = function() {
    const checkboxes = [
        document.getElementById("idCkProgramacion"),
        document.getElementById("idCkBD"),
        document.getElementById("idCkRedes"),
        document.getElementById("idCkSeguridad")
    ];
    
    const algunoSeleccionado = checkboxes.some(checkbox => checkbox.checked);
    
    if (!algunoSeleccionado) {
        alert("Debe seleccionar al menos un interés");
        return false;
    }
    return true;
};

// carrera
const validarCarrera = function() {
    const radios = document.querySelectorAll('input[name="idRdCarrera"]');
    const algunoSeleccionado = Array.from(radios).some(radio => radio.checked);
    
    if (!algunoSeleccionado) {
        alert("Debe seleccionar una carrera");
        return false;
    }
    return true;
};

// país
const validarPais = function() {
    const pais = document.getElementById("idCmPais");
    
    if (pais.selectedIndex === 0) {
        alert("Debe seleccionar un país de origen");
        pais.focus();
        return false;
    }
    return true;
};

// crear tabla con dom
const crearTablaConDatos = function() {
    while (bodyModal.firstChild) {
        bodyModal.removeChild(bodyModal.firstChild);
    }
    
    // título
    const titulo = document.createElement("h5");
    titulo.appendChild(document.createTextNode("Datos del Registro"));
    titulo.setAttribute("class", "mb-3");
    bodyModal.appendChild(titulo);
    
    // tabla
    const tabla = document.createElement("table");
    tabla.setAttribute("class", "table table-striped");
    const tbody = document.createElement("tbody");
    
    // datos del formulario
    const datos = obtenerDatosFormulario();
    
    // filas de la tabla
    for (let campo in datos) {
        const fila = document.createElement("tr");
        const celdaCampo = document.createElement("td");
        celdaCampo.appendChild(document.createTextNode(campo));
        celdaCampo.setAttribute("class", "fw-bold");
        const celdaValor = document.createElement("td");
        celdaValor.appendChild(document.createTextNode(datos[campo]));
        fila.appendChild(celdaCampo);
        fila.appendChild(celdaValor);
        tbody.appendChild(fila);
    }
    
    tabla.appendChild(tbody);
    bodyModal.appendChild(tabla);
};

const obtenerDatosFormulario = function() {
    // obtener intereses
    const intereses = [];
    if (document.getElementById("idCkProgramacion").checked) intereses.push("Programación");
    if (document.getElementById("idCkBD").checked) intereses.push("Base de Datos");
    if (document.getElementById("idCkRedes").checked) intereses.push("Inteligencia Artificial");
    if (document.getElementById("idCkSeguridad").checked) intereses.push("Seguridad Informática");
    
    // obtener carrera
    let carrera = "";
    const radios = document.querySelectorAll('input[name="idRdCarrera"]');
    radios.forEach(radio => {
        if (radio.checked) {
            carrera = radio.nextElementSibling.textContent;
        }
    });
    
    // obtener país
    const paisSelect = document.getElementById("idCmPais");
    const pais = paisSelect.options[paisSelect.selectedIndex].text;
    return {
        "Nombres": document.getElementById("idNombre").value,
        "Apellidos": document.getElementById("idApellidos").value,
        "Fecha de Nacimiento": document.getElementById("idFechaNac").value,
        "Correo Electrónico": document.getElementById("idCorreo").value,
        "Intereses": intereses.join(", "),
        "Carrera": carrera,
        "País de Origen": pais
    };
};

const validarFormulario = function() {
    // ejecutar todas las validaciones
    if (!validarCamposVacios()) return false;
    if (!validarFechaNacimiento()) return false;
    if (!validarEmail()) return false;
    if (!validarPasswords()) return false;
    if (!validarIntereses()) return false;
    if (!validarCarrera()) return false;
    if (!validarPais()) return false;
    
    // si esta todo bien, mostrar los datos
    crearTablaConDatos();
    modal.show();
    return true;
};
button.onclick = () => {
    validarFormulario();
};