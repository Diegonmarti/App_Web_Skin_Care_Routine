/* ========================================================================================================================
                                                CONFIGURACIÓN CURSOR
   ======================================================================================================================== */
document.getElementsByTagName("body")[0].addEventListener("mousemove", function (n) {
    t.style.left = n.clientX + "px",
        t.style.top = n.clientY + "px",
        e.style.left = n.clientX + "px",
        e.style.top = n.clientY + "px",
        i.style.left = n.clientX + "px",
        i.style.top = n.clientY + "px"
});
var t = document.getElementById("cursor"),
    e = document.getElementById("cursor2"),
    i = document.getElementById("cursor3");
function n(t) {
    e.classList.add("hover"), i.classList.add("hover")
}
function s(t) {
    e.classList.remove("hover"), i.classList.remove("hover")
}
s();
for (var r = document.querySelectorAll(".hover-target"), a = r.length - 1; a >= 0; a--) {
    o(r[a])
}
function o(t) {
    t.addEventListener("mouseover", n), t.addEventListener("mouseout", s)
}




/* ========================================================================================================================
                                                        CAMBIO DE SECCIÓN
   ======================================================================================================================== */
var numeroDeSecciones = 5; //Número de secciones de la página
var seccionActual = 0; //Número de la sección que es está mostrando por pantalla

var secciones = [
    document.getElementById("ventana-inicio"),
    document.getElementById("ventana-cuidado"),
    document.getElementById("ventana-generador"),
    document.getElementById("ventana-revista"),
    document.getElementById("ventana-final")
];


//Cambia con una transición la sección que se está mostrando
function cambioDeSeccion(seccionesADesplazarse, irDirectamente = false) {
    var seccionAMostrar = (irDirectamente) ? seccionesADesplazarse : seccionActual + seccionesADesplazarse;

    if (seccionAMostrar != seccionActual) { //Solo cambio de sección si la sección a mostrar es diferente de en la que estoy

        if (seccionAMostrar == 0) { ocultarFlecha(0); }
        else if (seccionActual == 0) { mostrarFlecha(0); }

        if (seccionAMostrar == (numeroDeSecciones - 1)) { ocultarFlecha(1); ocultarNewsletter(); }
        else if (seccionActual == (numeroDeSecciones - 1)) { mostrarFlecha(1); mostrarNewsletter(); }

        secciones[seccionActual].style.display = "none";
        secciones[seccionActual].animate(
            { opacity: "0" },
            { duration: 300, fill: "forwards" } // (fill: "forwards") hace que se mantengan los cambios después de la animación
        );


        secciones[seccionAMostrar].style.display = "flex";
        setTimeout(() => {
            secciones[seccionAMostrar].animate({ opacity: "1" }, { duration: 300, fill: "forwards" });
        }, 300);

        seccionActual = seccionAMostrar;
    }

    ocultarDesplegable();
}

var newsletter = document.getElementById("enlace-newsletter");

function ocultarNewsletter() {
    newsletter.style.animation = "";
    setTimeout(() => { newsletter.style.display = "none"; }, 300);
    newsletter.animate({ opacity: "0" }, { duration: 300, fill: "forwards" });
}

function mostrarNewsletter() {
    newsletter.style.animation = "animacionElementosAlCargar 1s";
    newsletter.style.display = "flex";
    newsletter.animate({ opacity: "1" }, { duration: 300, fill: "forwards" });
}

/* ---------------------------------------------- FLECHAS ---------------------------------------------- */
function mostrarFlecha(cualMostrar) {
    var flechaArriba = document.getElementById("flecha-arriba");
    var flechaAbajo = document.getElementById("flecha-abajo");

    var flechaACambiar = cualMostrar === 0 ? flechaArriba : flechaAbajo;

    flechaACambiar.style.animation = "animacionElementosAlCargar 1s"; // Habilito la animación una vez haya cargado la web
    flechaACambiar.style.pointerEvents = "all";
    flechaACambiar.animate({ opacity: "1" }, { duration: 500, fill: "forwards" });
}

function ocultarFlecha(cualMostrar) {
    var flechaArriba = document.getElementById("flecha-arriba");
    var flechaAbajo = document.getElementById("flecha-abajo");

    var flechaACambiar = cualMostrar === 0 ? flechaArriba : flechaAbajo;

    flechaACambiar.style.animation = "";
    flechaACambiar.style.pointerEvents = "none";
    flechaACambiar.animate({ opacity: "0" }, { duration: 500, fill: "forwards" });
}



/* -------------------------------------------- ILUMINACIONES -------------------------------------------- */
var iluminacionInferior = document.getElementById("iluminacion-inferior");
var iluminacionSuperior = document.getElementById("iluminacion-superior");

function hoverBajarSeccion() {
    iluminacionInferior.animate({ opacity: "1" }, { duration: 300, fill: "forwards" });
}

function noHoverBajarSeccion() {
    iluminacionInferior.animate({ opacity: "0" }, { duration: 300, fill: "forwards" });
}

function hoverSubirSeccion() {
    iluminacionSuperior.animate({ opacity: "1" }, { duration: 300, fill: "forwards" });
}

function noHoverSubirSeccion() {
    iluminacionSuperior.animate({ opacity: "0" }, { duration: 300, fill: "forwards" });
}




/* ========================================================================================================================
                                                    DESPLEGABLE
   ======================================================================================================================== */

var desplegableMostrado = false;

var iconoDesplegable = document.querySelector(".icono-desplegable");
var barrasIconoDesplegable = document.querySelectorAll(".barra");
var desplegable = document.querySelector('.menu-desplegable');

var seccionesDesplegable = document.querySelectorAll(".subapartado-desplegable");

document.addEventListener("click", function (e) {

    if (iconoDesplegable.contains(e.target)) {
        if (desplegableMostrado) {
            ocultarDesplegable();

        } else {
            mostrarDesplegable();
        }

    }

    //Para cerrar el desplegable si se pulsa en cualquier otro lado
    else {
        var contador = 0;
        seccionesDesplegable.forEach(seccion => {
            if (!seccion.contains(e.target)) {
                contador++;
            }
        });

        if (contador == seccionesDesplegable.length) {
            ocultarDesplegable()
        }
    }

})

//Para hacer que se muestre el desplegable solo con hover
/* desplegable.addEventListener("mouseleave", function() {
    ocultarDesplegable();
}) */

function mostrarDesplegable() {
    barrasIconoDesplegable.forEach(barra => {
        barra.style.backgroundColor = "var(--color-rojo)";
    });
    barrasIconoDesplegable[0].style.transform = "rotate(-45deg) translate(-5px, 6px)";
    barrasIconoDesplegable[1].style.opacity = "0";
    barrasIconoDesplegable[2].style.transform = "rotate(45deg) translate(-5px, -6px)";

    desplegableMostrado = true;
    desplegable.style.display = "flex";
    desplegable.animate({
        opacity: "1",
        left: "2vw"
    },

        { duration: 200, fill: "forwards" }
    );

    desplegableMostrado = true;
};

function ocultarDesplegable() {
    barrasIconoDesplegable.forEach(barra => {
        barra.style.backgroundColor = "var(--color-blanco)";
    });
    barrasIconoDesplegable[0].style.transform = "rotate(0) translate(0, 0)";
    barrasIconoDesplegable[1].style.opacity = "1";
    barrasIconoDesplegable[2].style.transform = "rotate(0) translate(0, 0)";

    desplegable.animate({
        opacity: "0",
        left: "-16vw"
    },

        { duration: 200, fill: "forwards" }
    );

    setTimeout(() => {
        desplegable.style.display = "none";
    }, 200);

    desplegableMostrado = false;

}

/* ---------------------------------- ANIMACION ICONO DESPLEGABLE AL HACER HOVER -------------------------------- */

iconoDesplegable.addEventListener("mouseenter", function () {
    barrasIconoDesplegable.forEach(barra => {
        barra.style.backgroundColor = "var(--color-rojo)";
    });

    //Para la funcionalidad de mostrar el desplegable con hover
    /*
        mostrarDesplegable();
    */
})

iconoDesplegable.addEventListener("mouseleave", function () {
    if (!desplegableMostrado) {
        barrasIconoDesplegable.forEach(barra => {
            barra.style.backgroundColor = "var(--color-blanco)";
        });
    }
})

/* ========================================================================================================================
                                                    FORMULARIO
   ======================================================================================================================== */

var checkboxRGPD = document.querySelector("#hitbox-checkbox");
var checkPuesto = false;

function rgpdPulsado() {
    if (checkPuesto) {
        checkboxRGPD.animate({
            backgroundColor: "transparent",
            borderColor: "var(--color-pre-hover)"
        },

            { duration: 200, fill: "forwards" }
        );

        checkPuesto = false;

    } else {
        checkboxRGPD.animate({
            backgroundColor: "var(--color-rojo)",
            borderColor: "var(--color-rojo)"
        },

            { duration: 200, fill: "forwards" }
        );

        checkPuesto = true;
    }
}









/* CURSOR */

document.getElementsByTagName("body")[0].addEventListener("mousemove", function (n) {
    t.style.left = n.clientX + "px",
        t.style.top = n.clientY + "px",
        e.style.left = n.clientX + "px",
        e.style.top = n.clientY + "px",
        i.style.left = n.clientX + "px",
        i.style.top = n.clientY + "px"
});
var t = document.getElementById("cursor"),
    e = document.getElementById("cursor2"),
    i = document.getElementById("cursor3");
function n(t) {
    e.classList.add("hover"), i.classList.add("hover")
}
function s(t) {
    e.classList.remove("hover"), i.classList.remove("hover")
}
s();
for (var r = document.querySelectorAll(".hover-target"), a = r.length - 1; a >= 0; a--) {
    o(r[a])
}
function o(t) {
    t.addEventListener("mouseover", n), t.addEventListener("mouseout", s)
}



/* PAGINA PREGUNTAS QUIZ */
    function empezarFormulario() {
        // Oculta el botón "Empezar"
        document.getElementById("empezarBtn").style.display = "none";

        // Oculta la imagen
        document.getElementById("foto").style.display = "none";

        // Muestra el formulario y la primera pregunta
        document.getElementById("quizForm").style.display = "block";

        // Llama a la función nextQuestion para mostrar la siguiente pregunta automáticamente
        nextQuestion(0);
    }
function selectOption(label) {
    // Restablecer el fondo de color de todas las opciones
    var allLabels = document.querySelectorAll('.answer-options label');
    allLabels.forEach(function (item) {
        item.style.backgroundColor = '#62C2E4';
    });

    // Cambiar el fondo de color de la opción seleccionada
    label.style.backgroundColor = '#dea5ec';
}
function nextQuestion(currentQuestion, event) {
    // Previene la acción de envío del formulario
    event.preventDefault();

    // Obtén la respuesta del usuario
    var answerId = "answer" + currentQuestion;
    var userAnswer = document.querySelector('input[name="respuesta1"]:checked');

    // Valida la respuesta (puedes personalizar esta parte según tus necesidades)
    if (!userAnswer) {
        alert("Por favor, selecciona una respuesta.");
        return;
    }

    // Oculta la pregunta actual
    var currentQuestionId = "question" + currentQuestion;
    document.getElementById(currentQuestionId).classList.add("hidden");

    // Muestra la siguiente pregunta si existe
    var nextQuestion = currentQuestion + 1;
    var nextQuestionId = "question" + nextQuestion;

    if (nextQuestion <= 5) {
        document.getElementById(nextQuestionId).classList.remove("hidden");
    } else {
        document.getElementById('ventana-final').style.display = 'block';

        // Muestra la tabla
        mostrarTabla();

        // Detén el evento para evitar el comportamiento predeterminado del botón
        event.preventDefault();
    }
    
}


document.querySelector('.range-input').addEventListener('input', function() {
    console.log('Año seleccionado:', this.value);
  });



  function mostrarTabla() {
    // Oculta la ventana de preguntas
    document.getElementById('ventana-final').style.display = 'none';
    
    // Muestra la tabla
    document.getElementById('tabla').style.display = 'block';
}


console.clear();

const cardsContainer = document.querySelector(".cards");
const cardsContainerInner = document.querySelector(".cards__inner");
const cards = Array.from(document.querySelectorAll(".card"));
const overlay = document.querySelector(".overlay");

const applyOverlayMask = (e) => {
  const overlayEl = e.currentTarget;
  const x = e.pageX - cardsContainer.offsetLeft;
  const y = e.pageY - cardsContainer.offsetTop;

  overlayEl.style = `--opacity: 1; --x: ${x}px; --y:${y}px;`;
};

const createOverlayCta = (overlayCard, ctaEl) => {
  const overlayCta = document.createElement("div");
  overlayCta.classList.add("cta");
  overlayCta.textContent = ctaEl.textContent;
  overlayCta.setAttribute("aria-hidden", true);
  overlayCard.append(overlayCta);
};

const observer = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const cardIndex = cards.indexOf(entry.target);
    let width = entry.borderBoxSize[0].inlineSize;
    let height = entry.borderBoxSize[0].blockSize;

    if (cardIndex >= 0) {
      overlay.children[cardIndex].style.width = `${width}px`;
      overlay.children[cardIndex].style.height = `${height}px`;
    }
  });
});

const initOverlayCard = (cardEl) => {
  const overlayCard = document.createElement("div");
  overlayCard.classList.add("card");
  createOverlayCta(overlayCard, cardEl.lastElementChild);
  overlay.append(overlayCard);
  observer.observe(cardEl);
};

cards.forEach(initOverlayCard);
document.body.addEventListener("pointermove", applyOverlayMask);
