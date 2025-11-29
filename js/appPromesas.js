
// ==============================
// Evento DOMContentLoaded
// ==============================
window.addEventListener('DOMContentLoaded', () => {
    alert('Bienvenido a la página de promesas  en JavaScript');
});



/* ============================================================
                        LOADER DE PUNTOS SALTANDO
============================================================ */

const mostrarLoader = (contenedor) => {
    const loader = document.createElement("div");
    loader.classList.add("loader-dots");
    loader.id = "loaderTemp";

    loader.innerHTML = `
        <div></div>
        <div></div>
        <div></div>
    `;

    contenedor.appendChild(loader);
};

const ocultarLoader = () => {
    const loader = document.getElementById("loaderTemp");
    if (loader) loader.remove();
};

/* ============================================================
    EJERCICIO 1 - Mostrar texto usando una PROMESA
============================================================ */

const mostrarTextoConPromesa = () => {
    const input = document.getElementById("inputTexto");
    const texto = input.value.trim();

    mostrarLoader(document.body);

    new Promise((resolve, reject) => {
        if (texto === "") {
            reject("Debe ingresar un texto");
        } else {
            setTimeout(() => resolve(texto), 1500);
        }
    })
    .then(msg => alert(`Mensaje recibido: ${msg}`))
    .catch(err => alert(err))
    .finally(() => {
        ocultarLoader();
        input.value = "";
    });
};


/* ============================================================
    EJERCICIO 2 - Agregar texto a lista con PROMESA
============================================================ */

const formLista = document.getElementById("form");
const lista = document.getElementById("lista");

formLista.addEventListener("submit", e => {
    e.preventDefault();

    const texto = document.getElementById("texto").value.trim();

    mostrarLoader(lista);

    const agregarItem = new Promise((resolve, reject) => {
        if (texto === "") {
            reject("El texto no puede estar vacío");
        } else {
            setTimeout(() => resolve(texto), 1200);
        }
    });

    agregarItem
        .then(txt => {
            const li = document.createElement("li");
            li.textContent = txt;
            lista.appendChild(li);
        })
        .catch(err => alert(err))
        .finally(() => {
            ocultarLoader();
            formLista.reset();
        });
});

/* ============================================================
    EJERCICIO 3 - Suma con PROMESA
============================================================ */

const form2 = document.getElementById("form2");

form2.addEventListener("submit", e => {
    e.preventDefault();

    mostrarLoader(form2);

    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const resultado = document.getElementById("resultado");

    const sumarPromesa = new Promise((resolve, reject) => {
        if (isNaN(num1) || isNaN(num2)) {
            reject("Debe ingresar números válidos");
        } else {
            setTimeout(() => resolve(num1 + num2), 1500);
        }
    });

    sumarPromesa
        .then(suma => resultado.textContent = `Resultado: ${suma}`)
        .catch(err => alert(err))
        .finally(() => {
            ocultarLoader();
            form2.reset();
        });
});


/* ============================================================
    EJERCICIO 4 | - Formulario de registro con PROMESAS
============================================================ */

const formRegistro = document.getElementById("formRegistro");
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const password = document.getElementById("password");

const errorNombre = document.getElementById("errorNombre");
const errorEmail = document.getElementById("errorEmail");
const errorPassword = document.getElementById("errorPassword");

const contenedorUsuarios = document.getElementById("usuarios");

// ---- PROMESAS DE VALIDACIÓN ----
const validarNombreP = () => {
    return new Promise((resolve, reject) => {
        if (nombre.value.trim().length < 3) {
            reject("El nombre debe tener al menos 3 caracteres");
        } else {
            resolve();
        }
    });
};

const validarEmailP = () => {
    return new Promise((resolve, reject) => {
        const regex = /\S+@\S+\.\S+/;
        if (!regex.test(email.value.trim())) {
            reject("El email no es válido");
        } else {
            resolve();
        }
    });
};


const validarPasswordP = () => {
    return new Promise((resolve, reject) => {
        if (password.value.length < 6) {
            reject("La contraseña debe tener mínimo 6 caracteres");
        } else {
            resolve();
        }
    });
};


// ---- PROCESO DEL FORMULARIO ----
formRegistro.addEventListener("submit", e => {
    e.preventDefault();

    // limpiar errores
    errorNombre.textContent = "";
    errorEmail.textContent = "";
    errorPassword.textContent = "";

    mostrarLoader(formRegistro); // 👈 loader aparece inmediatamente

    Promise.allSettled([validarNombreP(), validarEmailP(), validarPasswordP()])
        .then(results => {
            let valido = true;

            if (results[0].status === "rejected") {
                errorNombre.textContent = results[0].reason;
                valido = false;
            }

            if (results[1].status === "rejected") {
                errorEmail.textContent = results[1].reason;
                valido = false;
            }

            if (results[2].status === "rejected") {
                errorPassword.textContent = results[2].reason;
                valido = false;
            }

            if (!valido) {
                ocultarLoader(); 
                return;
            }

            const usuario = {
                nombre: nombre.value.trim(),
                email: email.value.trim()
            };

            
            setTimeout(() => {

                agregarUsuario(usuario);
                formRegistro.reset();

                ocultarLoader(); // 👈 loader se oculta JUSTO después de los 3s

            }, 3000);
        });
});



// ============================================================
// AGREGAR USUARIO A LA LISTA (TARJETA)
// ============================================================

const agregarUsuario = usuario => {
    const card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML = `
        <strong>${usuario.nombre}</strong><br>
        ${usuario.email}
    `;
    contenedorUsuarios.appendChild(card);
};


// funcion personalizada


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

    // Mostrar loader (puntos saltando)
    if (typeof mostrarLoader === "function" && cardEdad) {
        mostrarLoader(cardEdad);
    }

    // PROMESA + ANIMACIÓN (2 segundos igual que tus otros ejercicios)
    const validarAnio = new Promise((resolve, reject) => {

        setTimeout(() => {

            const anioNum = Number(anio);
            const anioActual = new Date().getFullYear(); // será 2025

            if (isNaN(anioNum)) {
                reject("Solo se permiten números.");
            } 
            else if (anioNum < 1900 || anioNum > anioActual) {
                reject("Ingrese un año de nacimiento válido.");
            } 
            else {
                const edad = anioActual - anioNum;
                resolve(edad);
            }

        }, 2000); // <<< DURACIÓN DE LA ANIMACIÓN
    });

    // Resultados
    validarAnio
        .then(edad => {
            edadCalculada.textContent = `Tu edad actual es: ${edad} años`;
        })
        .catch(err => {
            errorAnio.textContent = err;
            edadCalculada.textContent = "";
        })
        .finally(() => {
            if (typeof ocultarLoader === "function") {
                ocultarLoader();
            }
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
