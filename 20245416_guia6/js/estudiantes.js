//Accediendo a los elementos del formulario
const inputCarnet = document.getElementById("idTxtCarnet");
const inputNombreCompleto = document.getElementById("idTxtNombreCompleto");
const inputDUI = document.getElementById("idTxtDUI");
const inputNIT = document.getElementById("idTxtNIT");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputEmail = document.getElementById("idTxtEmail");
const inputEdad = document.getElementById("idTxtEdad");

//Botones del formulario
const buttonAgregarEstudiante = document.getElementById("idBtnAgregarEstudiante");
const buttonMostrarEstudiantes = document.getElementById("idBtnMostrarEstudiantes");
const buttonLimpiarFormulario = document.getElementById("idBtnLimpiarFormulario");
const buttonValidarTodo = document.getElementById("idBtnValidarTodo");

//Notificaciones
const notificacionEstudiante = document.getElementById("idNotificacionEstudiante");
const toast = new bootstrap.Toast(notificacionEstudiante);
const mensajeEstudiante = document.getElementById("idMensajeEstudiante");

//Elementos de error
const errorCarnet = document.getElementById("errorCarnet");
const errorNombre = document.getElementById("errorNombre");
const errorDUI = document.getElementById("errorDUI");
const errorNIT = document.getElementById("errorNIT");
const errorFecha = document.getElementById("errorFecha");
const errorEmail = document.getElementById("errorEmail");
const errorEdad = document.getElementById("errorEdad");

//Arreglo global de estudiantes
let arrayEstudiantes = [];

/*
expresiones regulares
*/

// carnet: dos letras y tres números 
const regexCarnet = /^[A-Za-z]{2}[0-9]{3}$/;

// nombre completo: solo letras, espacios, acentos (sin números ni caracteres especiales)
const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

// DUI: 8 números, guión, 1 número 
const regexDUI = /^[0-9]{8}-[0-9]{1}$/;

// NIT: ####-######-###-# 
const regexNIT = /^[0-9]{4}-[0-9]{6}-[0-9]{3}-[0-9]{1}$/;

// email: validación básica de correo electrónico
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// edad: solo números del 1 al 100
const regexEdad = /^[1-9][0-9]?$|^100$/;

/*
funciones de validación
*/

const validarCarnet = () => {
    const valor = inputCarnet.value.trim();
    if (!regexCarnet.test(valor)) {
        mostrarError(inputCarnet, errorCarnet, "El carnet debe tener formato: AB001 (2 letras y 3 números)");
        return false;
    }
    limpiarError(inputCarnet, errorCarnet);
    return true;
};

const validarNombre = () => {
    const valor = inputNombreCompleto.value.trim();
    if (!regexNombre.test(valor) || valor.length < 2) {
        mostrarError(inputNombreCompleto, errorNombre, "El nombre solo debe contener letras y espacios");
        return false;
    }
    limpiarError(inputNombreCompleto, errorNombre);
    return true;
};

const validarDUI = () => {
    const valor = inputDUI.value.trim();
    if (!regexDUI.test(valor)) {
        mostrarError(inputDUI, errorDUI, "El DUI debe tener formato: ########-# (8 números-1 número)");
        return false;
    }
    limpiarError(inputDUI, errorDUI);
    return true;
};

const validarNIT = () => {
    const valor = inputNIT.value.trim();
    if (!regexNIT.test(valor)) {
        mostrarError(inputNIT, errorNIT, "El NIT debe tener formato: ####-######-###-#");
        return false;
    }
    limpiarError(inputNIT, errorNIT);
    return true;
};

const validarFechaNacimiento = () => {
    const valor = inputFechaNacimiento.value;
    if (!valor) {
        mostrarError(inputFechaNacimiento, errorFecha, "La fecha de nacimiento es requerida");
        return false;
    }
    const fechaNacimiento = new Date(valor);
    const fechaActual = new Date();
    const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    if (fechaNacimiento >= fechaActual) {
        mostrarError(inputFechaNacimiento, errorFecha, "La fecha de nacimiento no puede ser futura");
        return false;
    }
    if (edad > 100) {
        mostrarError(inputFechaNacimiento, errorFecha, "La edad no puede ser mayor a 100 años");
        return false;
    }
    limpiarError(inputFechaNacimiento, errorFecha);
    return true;
};

const validarEmail = () => {
    const valor = inputEmail.value.trim();
    if (!regexEmail.test(valor)) {
        mostrarError(inputEmail, errorEmail, "Ingrese un correo electrónico válido");
        return false;
    }
    limpiarError(inputEmail, errorEmail);
    return true;
};

const validarEdad = () => {
    const valor = inputEdad.value.trim();
    if (!regexEdad.test(valor)) {
        mostrarError(inputEdad, errorEdad, "La edad debe ser un número entre 1 y 100");
        return false;
    }
    limpiarError(inputEdad, errorEdad);
    return true;
};

/*
funciones auxiliares para errores
*/

const mostrarError = (input, errorElement, mensaje) => {
    input.classList.remove('is-invalid', 'is-valid');
    errorElement.textContent = mensaje;
    errorElement.style.display = 'block';
};

const limpiarError = (input, errorElement) => {
    input.classList.remove('is-invalid');
    input.classList.remove('is-valid');
    errorElement.textContent = '';
    errorElement.style.display = 'none';
};

const limpiarTodosLosErrores = () => {
    const inputs = [inputCarnet, inputNombreCompleto, inputDUI, inputNIT, inputFechaNacimiento, inputEmail, inputEdad];
    const errors = [errorCarnet, errorNombre, errorDUI, errorNIT, errorFecha, errorEmail, errorEdad];
    inputs.forEach(input => {
        input.classList.remove('is-invalid', 'is-valid');
    });
    errors.forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });
};

/*
funciones principales del formulario
*/

const limpiarFormulario = () => {
    inputCarnet.value = "";
    inputNombreCompleto.value = "";
    inputDUI.value = "";
    inputNIT.value = "";
    inputFechaNacimiento.value = "";
    inputEmail.value = "";
    inputEdad.value = "";
    limpiarTodosLosErrores();
    
    // resetear modo edición
    estudianteEditandoIndex = -1;
    buttonAgregarEstudiante.innerHTML = '<i class="bi bi-person-plus"></i> Guardar estudiante';
    buttonAgregarEstudiante.classList.remove('btn-warning');
    buttonAgregarEstudiante.classList.add('btn-success');
    inputCarnet.focus();
};

const validarFormularioCompleto = () => {
    const validaciones = [
        validarCarnet(),
        validarNombre(),
        validarDUI(),
        validarNIT(),
        validarFechaNacimiento(),
        validarEmail(),
        validarEdad()
    ];
    const esValido = validaciones.every(validacion => validacion === true);
    if (esValido) {
        mostrarNotificacion("¡Todos los campos son válidos!", "success");
    } else {
        mostrarNotificacion("Por favor corrija los errores en el formulario", "danger");
    }
    return esValido;
};

const agregarEstudiante = () => {
    if (validarFormularioCompleto()) {
        const datosEstudiante = [
            inputCarnet.value.trim(),
            inputNombreCompleto.value.trim(),
            inputDUI.value.trim(),
            inputNIT.value.trim(),
            inputFechaNacimiento.value,
            inputEmail.value.trim(),
            inputEdad.value.trim()
        ];
        
        if (estudianteEditandoIndex >= 0) {
            // Modo edición: actualizar estudiante existente
            // Verificar si el carnet cambió y ya existe en otro estudiante
            const carnetExistente = arrayEstudiantes.find((estudiante, index) => 
                index !== estudianteEditandoIndex && estudiante[0] === inputCarnet.value.trim());
            
            if (carnetExistente) {
                mostrarNotificacion("Ya existe otro estudiante con ese carnet", "warning");
                return;
            }
            arrayEstudiantes[estudianteEditandoIndex] = datosEstudiante;
            mostrarNotificacion("Estudiante actualizado exitosamente", "success");
            
            // resetear modo edición
            estudianteEditandoIndex = -1;
            buttonAgregarEstudiante.innerHTML = '<i class="bi bi-person-plus"></i> Guardar estudiante';
            buttonAgregarEstudiante.classList.remove('btn-warning');
            buttonAgregarEstudiante.classList.add('btn-success');
        } else {
            // verificar si el carnet ya existe
            const carnetExistente = arrayEstudiantes.find(estudiante => estudiante[0] === inputCarnet.value.trim());
            if (carnetExistente) {
                mostrarNotificacion("Ya existe un estudiante con ese carnet", "warning");
                return;
            }
            arrayEstudiantes.push(datosEstudiante);
            mostrarNotificacion("Estudiante registrado exitosamente", "success");
        }
        limpiarFormulario();
        mostrarEstudiantes();
    }
};

const eliminarEstudiante = (index) => {
    if (confirm('¿Está seguro de que desea eliminar este estudiante?')) {
        arrayEstudiantes.splice(index, 1);
        mostrarNotificacion("Estudiante eliminado correctamente", "success");
        mostrarEstudiantes();
    }
};

// variable global para controlar el modo edición
let estudianteEditandoIndex = -1;
const editarEstudiante = (index) => {
    const estudiante = arrayEstudiantes[index];
    
    // guardar el índice del estudiante que se está editando
    estudianteEditandoIndex = index;
    
    // cargar datos en el formulario
    inputCarnet.value = estudiante[0];
    inputNombreCompleto.value = estudiante[1];
    inputDUI.value = estudiante[2];
    inputNIT.value = estudiante[3];
    inputFechaNacimiento.value = estudiante[4];
    inputEmail.value = estudiante[5];
    inputEdad.value = estudiante[6];
    
    // limpiar errores
    limpiarTodosLosErrores();
    
    // cambiar el texto del botón edición
    buttonAgregarEstudiante.innerHTML = '<i class="bi bi-pencil-square"></i> Actualizar estudiante';
    buttonAgregarEstudiante.classList.remove('btn-success');
    buttonAgregarEstudiante.classList.add('btn-warning');
    mostrarNotificacion("Modo edición activado. Los datos están cargados para modificación.", "info");
    
    // hacer scroll hacia el formulario
    document.getElementById("idFormEstudiante").scrollIntoView({ behavior: 'smooth' });
};

const mostrarNotificacion = (mensaje, tipo = "success") => {
    mensajeEstudiante.innerHTML = mensaje;
    notificacionEstudiante.classList.remove('text-bg-success', 'text-bg-danger', 'text-bg-warning', 'text-bg-info');
    notificacionEstudiante.classList.add(`text-bg-${tipo}`);
    toast.show();
};

const imprimirFilasEstudiantes = () => {
    let filas = "";
    arrayEstudiantes.forEach((estudiante, index) => {
        filas += `<tr>
            <td class="text-center fw-bold">${index + 1}</td>
            <td>${estudiante[0]}</td>
            <td>${estudiante[1]}</td>
            <td>${estudiante[2]}</td>
            <td>${estudiante[3]}</td>
            <td>${estudiante[4]}</td>
            <td>${estudiante[5]}</td>
            <td class="text-center">${estudiante[6]}</td>
            <td class="text-center">
                <button type="button" class="btn btn-primary btn-sm me-1" onclick="editarEstudiante(${index})" title="Editar">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button type="button" class="btn btn-danger btn-sm" onclick="eliminarEstudiante(${index})" title="Eliminar">
                    <i class="bi bi-trash3-fill"></i>
                </button>
            </td>
        </tr>`;
    });
    return filas;
};

const mostrarEstudiantes = () => {
    const tablaContainer = document.getElementById("idTablaEstudiantes");
    if (arrayEstudiantes.length === 0) {
        tablaContainer.innerHTML = `
            <div class="alert alert-info">
                <i class="bi bi-info-circle"></i> No hay estudiantes registrados
            </div>`;
        return;
    }
    
    const tabla = `
        <div class="table-responsive">
            <table class="table table-striped table-hover table-bordered">
                <thead class="table-dark">
                    <tr>
                        <th scope="col" class="text-center" style="width:5%">#</th>
                        <th scope="col" class="text-center" style="width:10%">Carnet</th>
                        <th scope="col" class="text-center" style="width:20%">Nombre completo</th>
                        <th scope="col" class="text-center" style="width:12%">DUI</th>
                        <th scope="col" class="text-center" style="width:15%">NIT</th>
                        <th scope="col" class="text-center" style="width:12%">Fecha Nac.</th>
                        <th scope="col" class="text-center" style="width:16%">Email</th>
                        <th scope="col" class="text-center" style="width:5%">Edad</th>
                        <th scope="col" class="text-center" style="width:10%">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${imprimirFilasEstudiantes()}
                </tbody>
            </table>
        </div>`;
    tablaContainer.innerHTML = tabla;
};

/*
eventos de validación en tiempo real
*/

inputCarnet.addEventListener('blur', validarCarnet);
inputNombreCompleto.addEventListener('blur', validarNombre);
inputDUI.addEventListener('blur', validarDUI);
inputNIT.addEventListener('blur', validarNIT);
inputFechaNacimiento.addEventListener('blur', validarFechaNacimiento);
inputEmail.addEventListener('blur', validarEmail);
inputEdad.addEventListener('blur', validarEdad);

/*
eventos de los botones
*/

buttonAgregarEstudiante.onclick = () => agregarEstudiante();
buttonMostrarEstudiantes.onclick = () => mostrarEstudiantes();
buttonLimpiarFormulario.onclick = () => limpiarFormulario();
buttonValidarTodo.onclick = () => validarFormularioCompleto();

/*
inicialización
*/

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    limpiarFormulario();
    mostrarEstudiantes();
});