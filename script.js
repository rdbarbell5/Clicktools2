// -------------------
// CALCULADORA
// -------------------
function calcularSueldo() {
  let bruto = document.getElementById("bruto").value;

  if (bruto === "") {
    alert("Ingresá un sueldo");
    return;
  }

  let descuento = bruto * 0.17;
  let neto = bruto - descuento;

  document.getElementById("resultado").innerHTML = `
    💸 Descuentos: $${descuento.toFixed(2)} <br>
    💰 Sueldo Neto: $${neto.toFixed(2)}
  `;
}

// -------------------
// JUEGO + GUARDADO
// -------------------
let puntos = localStorage.getItem("puntos") ? parseInt(localStorage.getItem("puntos")) : 0;
let incremento = localStorage.getItem("incremento") ? parseInt(localStorage.getItem("incremento")) : 1;
let autoClick = localStorage.getItem("autoClick") ? parseInt(localStorage.getItem("autoClick")) : 0;

function guardar() {
  localStorage.setItem("puntos", puntos);
  localStorage.setItem("incremento", incremento);
  localStorage.setItem("autoClick", autoClick);
}

function actualizar() {
  document.getElementById("puntos").innerText = "Puntos: " + puntos;
}

// CLICK
function clickJuego() {
  puntos += incremento;
  guardar();
  actualizar();
}

// MEJORA
function mejora() {
  if (puntos >= 10) {
    puntos -= 10;
    incremento++;
    guardar();
    actualizar();
    mostrarMensaje("Mejora comprada 🚀");
  } else {
    mostrarMensaje("Te faltan puntos 😅");
  }
}

// AUTO
function auto() {
  if (puntos >= 50) {
    puntos -= 50;
    autoClick++;
    guardar();
    actualizar();
    mostrarMensaje("Auto activado ⚡");
  } else {
    mostrarMensaje("No alcanza 😅");
  }
}

// AUTO POR SEGUNDO
setInterval(() => {
  puntos += autoClick;
  guardar();
  actualizar();
}, 1000);

// RESET
function resetear() {
  puntos = 0;
  incremento = 1;
  autoClick = 0;
  localStorage.clear();
  actualizar();
  mostrarMensaje("Progreso reiniciado 🔄");
}

// MENSAJES
function mostrarMensaje(texto) {
  let msg = document.getElementById("mensaje");
  msg.innerText = texto;

  setTimeout(() => {
    msg.innerText = "";
  }, 2000);
}

// MENU MOBILE
document.getElementById("menuBtn").onclick = function () {
  let menu = document.getElementById("menu");

  if (menu.style.display === "flex") {
    menu.style.display = "none";
  } else {
    menu.style.display = "flex";
  }
};

// VISITAS (LOCAL)
let visitas = localStorage.getItem("visitas")
  ? parseInt(localStorage.getItem("visitas"))
  : 0;

visitas++;
localStorage.setItem("visitas", visitas);

document.getElementById("contadorVisitas").innerText = visitas;

// INICIO
actualizar();
// -------------------
// DOLAR API
// -------------------
let dolar = 0;

fetch("https://api.bluelytics.com.ar/v2/latest")
  .then(res => res.json())
  .then(data => {
    dolar = data.blue.value_sell;
    document.getElementById("valorDolar").innerText = "$" + dolar;
  });

function convertir() {
  let pesos = document.getElementById("pesos").value;

  if (pesos === "" || dolar === 0) return;

  let resultado = pesos / dolar;

  document.getElementById("resultadoDolar").innerText =
    "USD: " + resultado.toFixed(2);
}