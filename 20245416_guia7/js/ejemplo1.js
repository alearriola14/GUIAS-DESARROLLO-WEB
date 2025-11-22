// Localice el archivo ejemplo1.js y comience a definir las siguientes referencias a elementos HTML:
// ACCEDIENDO A LA REFERENCIA DEL FORMULARIO QUE
// TENDRA LOS NUEVOS ELEMENTOS
const newForm = document.getElementById("idNewForm");
const buttonCrear = document.getElementById("idBtnCrear");
const buttonAddElemento = document.getElementById("idBtnAddElement");
const cmbElemento = document.getElementById("idCmbElemento");
const tituloElemento = document.getElementById("idTituloElemento");
const nombreElemento = document.getElementById("idNombreElemento");
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// Función para verificar si un ID ya existe
const verificarIdUnico = function(id) {
    return document.getElementById(id) === null;
};
const vericarTipoElemento = function () {
    let elemento = cmbElemento.value;
    if (elemento != "") {
        modal.show();
    } else {
        alert("Debe seleccionar el elemento que se creara");
    }
};

const newSelect = function () {
    // Creando elementos
    let addElemento = document.createElement("select");
    // Agregando atributos para el nuevo elemento
    addElemento.setAttribute("id", `${nombreElemento.value}`);
    addElemento.setAttribute("class", "form-select");
    // creando opcion para el select
    for (let i = 1; i <= 10; i++) {
        let addOption = document.createElement("option");
        addOption.value = i;
        addOption.innerHTML = `Opcion ${i}`;
        addElemento.appendChild(addOption);
    }
    // creando label para el nuevo control
    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", `${nombreElemento.value}`);
    // creando texto para label
    labelElemento.textContent = tituloElemento.value;
    // creando label de id
    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;
    // Creando plantilla de bootstrap para visualizar el nuevo elemento
    let divElemento = document.createElement("div");
    // Agregando atributos
    divElemento.setAttribute("class", "form-floating");
    // Creando el input que sera hijo del div
    divElemento.appendChild(addElemento);
    // Creando el label que sera hijo del div
    divElemento.appendChild(labelElemento);
    // Creando el SPAN que sera hijo del nuevo Formulario
    newForm.appendChild(labelId);
    // Creando el Div que sera hijo del nuevo Formulario
    newForm.appendChild(divElemento);
};

const newRadioCheckbox = function (newElemento) {
    // Creando elementos
    let addElemento = document.createElement("input");
    // Creando atributos para el nuevo elemento
    addElemento.setAttribute("id", `${nombreElemento.value}`);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-check-input");
    // creando label para el nuevo control
    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("class", "form-check-label");
    labelElemento.setAttribute("for", `${nombreElemento.value}`);
    // creando texto para label
    labelElemento.textContent = tituloElemento.value;
    // creando label de id
    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;
    // Creando plantilla de bootstrap para visualizar el nuevo elemento
    let divElemento = document.createElement("div");
    // Agregando atributos
    divElemento.setAttribute("class", "form-check");
    // Creando el input que sera hijo del div
    divElemento.appendChild(addElemento);
    // Creando el label que sera hijo del div
    divElemento.appendChild(labelElemento);
    // Creando el SPAN que sera hijo del nuevo Formulario
    newForm.appendChild(labelId);
    // Creando el Div que sera hijo del nuevo Formulario
    newForm.appendChild(divElemento);
};

const validarFormulario = function() {
    const elementos = newForm.querySelectorAll('input, select, textarea');
    let camposVacios = [];
    let camposValidos = [];
    elementos.forEach(elemento => {
        const nombreCampo = elemento.id || 'Campo sin ID';
        
        if (elemento.type === 'radio') {
            const grupoRadio = newForm.querySelectorAll(`input[name="${elemento.name}"]`);
            const seleccionado = Array.from(grupoRadio).some(radio => radio.checked);
            if (!seleccionado && !camposVacios.some(campo => campo.includes(elemento.name))) {
                camposVacios.push(`${nombreCampo} (radio)`);
            } else if (seleccionado && !camposValidos.some(campo => campo.includes(elemento.name))) {
                camposValidos.push(`${nombreCampo} (radio)`);
            }
        } else if (elemento.type === 'checkbox') {
            if (!elemento.checked) {
                camposVacios.push(`${nombreCampo} (checkbox)`);
            } else {
                camposValidos.push(`${nombreCampo} (checkbox)`);
            }
        } else if (elemento.tagName.toLowerCase() === 'select') {
            if (elemento.value === '' || elemento.selectedIndex === 0) {
                camposVacios.push(`${nombreCampo} (select)`);
            } else {
                camposValidos.push(`${nombreCampo} (select)`);
            }
        } else {
            if (elemento.value.trim() === '') {
                camposVacios.push(`${nombreCampo} (${elemento.type})`);
            } else {
                camposValidos.push(`${nombreCampo} (${elemento.type})`);
            }
        }
    });
    
    let mensaje = '';
    if (camposValidos.length > 0) {
        mensaje += `Campos válidos (${camposValidos.length}):\n${camposValidos.join('\n')}\n\n`;
    }
    if (camposVacios.length > 0) {
        mensaje += `Campos vacíos o no seleccionados (${camposVacios.length}):\n${camposVacios.join('\n')}`;
    }
    if (elementos.length === 0) {
        mensaje = 'No hay elementos en el formulario para validar.';
    }
    
    alert(mensaje || 'Todos los campos están correctamente completados.');
};

const newINput = function (newElemento) {
    // Creando elementos de tipo text, number, date, password, color y email
    let addElemento = newElemento == "textarea"
        ? document.createElement("textarea")
        : document.createElement("input");

    // Creando atributos para el nuevo elemento
    addElemento.setAttribute("id", `${nombreElemento.value}`);
    if (newElemento !== "textarea") {
        addElemento.setAttribute("type", newElemento);
    }
    addElemento.setAttribute("class", "form-control");
    addElemento.setAttribute("placeholder", tituloElemento.value);

    // creando label para el nuevo control
    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", `${nombreElemento.value}`);

    // creando icono para el label
    let iconLabel = document.createElement("i");
    iconLabel.setAttribute("class", "bi bi-tag");

    // creando texto para label
    labelElemento.textContent = tituloElemento.value;

    // Creando el elemento i como hijo del label, afterbegin le
    // Indicamos que se creara antes de su primer hijo
    labelElemento.insertAdjacentElement("afterbegin", iconLabel);

    // creando label de id
    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;

    // Creando plantilla de bootstrap para visualizar el nuevo elemento
    let divElemento = document.createElement("div");
    // Agregando atributos
    divElemento.setAttribute("class", "form-floating mb-3");

    // Creando el input que sera hijo del div
    divElemento.appendChild(addElemento);
    // Creando el label que sera hijo del div
    divElemento.appendChild(labelElemento);

    // Creando el SPAN que sera hijo del nuevo Formulario
    newForm.appendChild(labelId);

    // Creando el Div que sera hijo del nuevo Formulario
    newForm.appendChild(divElemento);
};
// AGREGANDO EVENTO CLIC A LOS BOTONES
buttonCrear.onclick = () => {
    vericarTipoElemento();
};

buttonAddElemento.onclick = () => {
    if (nombreElemento.value != "" && tituloElemento.value != "") {
        // Verificar que el ID sea único
        if (!verificarIdUnico(nombreElemento.value)) {
            alert(`Error: Ya existe un control con el ID "${nombreElemento.value}". Los IDs deben ser únicos.` );
            nombreElemento.focus();
            return;
        }
        let elemento = cmbElemento.value;
        if (elemento == "select") {
            newSelect();
        } else if (elemento == "radio" || elemento == "checkbox") {
            newRadioCheckbox(elemento);
        } else {
            newINput(elemento);
        }
    } else {
        alert("Faltan campos por completar");
    }
};

document.getElementById("idModal").addEventListener("shown.bs.modal", () => {
    tituloElemento.value = "";
    nombreElemento.value = "";
    tituloElemento.focus();
});

document.addEventListener('DOMContentLoaded', function() {
    const btnValidar = document.getElementById("idBtnValidar");
    if (btnValidar) {
        btnValidar.onclick = () => {
            validarFormulario();
        };
    }
});