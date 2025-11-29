// ==============================
// Evento DOMContentLoaded
// ==============================
window.addEventListener('DOMContentLoaded', () => {
    alert('Bienvenido a la página de Funciones Flecha en JavaScript');
});

// ==============================
// Ejercicio 1: Mostrar texto
// ==============================
const mostrarTexto = () => {
    const input = document.getElementById('inputTexto');
    const texto = input.value.trim();

    if (!texto) return alert('Por favor, ingrese un texto');

    alert(`Texto ingresado: ${texto}`);
    input.value = '';
};


// ==============================
// Ejercicio 2: Agregar texto a la lista
// ==============================
const formLista = document.getElementById('form');
const lista = document.getElementById('lista');

formLista.addEventListener('submit', (e) => {
    e.preventDefault();

    const texto = document.getElementById('texto').value.trim();
    if (!texto) return alert('Por favor, ingrese un texto');

    const li = document.createElement('li');
    li.textContent = texto;
    lista.appendChild(li);

    formLista.reset();
});


// ==============================
// Ejercicio 3: Sumar con función flecha
// ==============================
const form2 = document.getElementById('form2');

form2.addEventListener('submit', (e) => {
    e.preventDefault();

    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const resultado = document.getElementById('resultado');

    if (isNaN(num1) || isNaN(num2)) {
        return alert('Por favor, ingrese números válidos');
    }

    const sumar = (a, b) => a + b;

    resultado.textContent = `Resultado: ${sumar(num1, num2)}`;
    form2.reset();
});


// Ejercicio 4: ==============================================
const formRegistro = document.getElementById("formRegistro");

const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const password = document.getElementById("password");

const errorNombre = document.getElementById("errorNombre");
const errorEmail = document.getElementById("errorEmail");
const errorPassword = document.getElementById("errorPassword");

const contenedorUsuarios = document.getElementById("usuarios");

// Validaciones
const validarNombre = () => {
    if (nombre.value.trim().length < 3) {
        errorNombre.textContent = "El nombre debe tener al menos 3 caracteres";
        return false;
    }
    errorNombre.textContent = "";
    return true;
};

const validarEmail = () => {
    const regex = /\S+@\S+\.\S+/;
    if (!regex.test(email.value.trim())) {
        errorEmail.textContent = "Ingrese un email válido";
        return false;
    }
    errorEmail.textContent = "";
    return true;
};

const validarPassword = () => {
    if (password.value.length < 6) {
        errorPassword.textContent = "La contraseña debe tener mínimo 6 caracteres";
        return false;
    }
    errorPassword.textContent = "";
    return true;
};

// Eventos de validación
nombre.addEventListener("input", validarNombre);
email.addEventListener("input", validarEmail);
password.addEventListener("input", validarPassword);

// ================================
// Mostrar usuario registrado
// ================================
const agregarUsuario = (usuario) => {
    const card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML = `
        <strong>${usuario.nombre}</strong><br>
        ${usuario.email}
    `;
    contenedorUsuarios.appendChild(card);
};

// ================================
// Procesar el formulario de registro
// ================================
formRegistro.addEventListener("submit", (e) => {
    e.preventDefault();

    const valido =
        validarNombre() &
        validarEmail() &
        validarPassword();

    if (!valido) {
        alert("Por favor, corrija los errores antes de continuar.");
        return;
    }

    const usuario = {
        nombre: nombre.value.trim(),
        email: email.value.trim(),
        password: password.value.trim()
    };

    agregarUsuario(usuario);

    formRegistro.reset();
});


// =====================
// EJERCICIO: CALCULAR EDAD
// =====================

// Elementos del DOM
const formEdad = document.getElementById("formEdad");
const inputAnio = document.getElementById("anioNacimiento");
const errorAnio = document.getElementById("errorAnio");
const edadCalculada = document.getElementById("edadCalculada");

// Contenedor (la tarjeta completa)
const cardEdad = formEdad.closest(".card");

// Función flecha para calcular edad
const calcularEdad = () => {
    // Limpiar mensajes previos
    errorAnio.textContent = "";
    edadCalculada.textContent = "";

    const anio = inputAnio.value.trim();

    // Mensaje mientras “piensa”
    edadCalculada.textContent = "Calculando mi edad...";

    // Mostrar loader SI existe la función
    if (typeof mostrarLoader === "function" && cardEdad) {
        mostrarLoader(cardEdad);
    }

    // Promesa de validación y cálculo
    const validarAnio = new Promise((resolve, reject) => {
        const anioNum = Number(anio);
        const anioActual = new Date().getFullYear(); // será 2025

        if (isNaN(anioNum)) {
            reject("Solo se permiten números.");
        } else if (anioNum < 1900 || anioNum > anioActual) {
            reject("Ingrese un año de nacimiento válido.");
        } else {
            const edad = anioActual - anioNum; // ⇐ aquí se calcula la edad real
            resolve(edad);
        }
    });

    validarAnio
        .then(edad => {
            edadCalculada.textContent = `Tu edad actual es: ${edad} años`;
        })
        .catch(err => {
            errorAnio.textContent = err;
            edadCalculada.textContent = "";
        })
        .finally(() => {
            // Ocultar loader si existe la función
            if (typeof ocultarLoader === "function") {
                ocultarLoader();
            }
            // Limpiar solo el input, no el resultado
            inputAnio.value = "";
        });
};

// Listener del formulario
if (formEdad) {
    formEdad.addEventListener("submit", (e) => {
        e.preventDefault();
        calcularEdad();
    });
}
