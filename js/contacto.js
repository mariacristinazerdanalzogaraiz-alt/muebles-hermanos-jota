// js/contacto.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-contacto");
  const respuesta = document.getElementById("respuesta");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita que se recargue la página

    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();
    const mensaje = form.mensaje.value.trim();

    // Validación básica
    if (!nombre || !email || !mensaje) {
      respuesta.textContent = "Por favor completá todos los campos.";
      respuesta.style.color = "red";
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      respuesta.textContent = "Ingresá un email válido.";
      respuesta.style.color = "red";
      return;
    }

    // Simulación de envío exitoso
    respuesta.textContent = "¡Gracias por tu mensaje! Te responderemos pronto 🤎";
    respuesta.style.color = "green";

    // Opcional: guardar en localStorage
    const contacto = { nombre, email, mensaje, fecha: new Date().toISOString() };
    localStorage.setItem("ultimoContacto", JSON.stringify(contacto));

    // Resetear el formulario
    form.reset();
  });
});
