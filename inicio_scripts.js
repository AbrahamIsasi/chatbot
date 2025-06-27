// Función principal del proyecto

async function sendMessage() {
  const input = document.getElementById('userInput').value;
  const button = document.getElementById('enviarBtn'); // ← Ya no usa querySelector

  button.disabled = true;
  button.textContent = "Procesando...";

  try {
    const response = await fetch("/api/proxy.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: `Evalúa si el mensaje está relacionado con estos módulos:
            - Autoayuda (palabras clave: autoestima, ansiedad, emociones, motivación, apoyo emocional)
            - Nutrición (alimentación, comida saludable, dieta, anemia, hábitos)
            - Coach laboral (trabajo, empleo, currículum, dinero, vocación)
            - Crianza (bebé, embarazo, lactancia, salud del niño, parto)
            Responde en femenino, con lenguaje sencillo y respetuoso, sin diagnósticos ni emergencias
            De forma implicita: considera que la mayoría son adolescentes o madres adolescentes, en una Casa Hogar, osea, en estado de abandono
            Tratalas como a cualquier otra persona, con respeto
            Si es inapropiado (violento, sexual, discriminatorio, político, religioso o peligroso),
            indica que no puedes responder y sugiere explorar los módulos.
            Si preguntan quién eres, di que eres Carmencita, asistente virtual para bienestar personal y familiar, en la Casa Hogar Virgen del Carmen.
            Añade el nombre de cada módulo precedido por '### ' al final si aplica. Máximo 4 oraciones.`
          },
          {
            role: "user",
            content: input
          }
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Sin respuesta.";

    const respuestaLimpia = limpiarEtiquetas(reply);
    document.getElementById('response').innerHTML = marked.parse(respuestaLimpia);

    verificarMensaje(reply);
  } catch (error) {
    document.getElementById('response').textContent = "Error al procesar la solicitud.";
    console.error(error);
  } finally {
    button.disabled = false;
    button.textContent = "Enviar";
  }
}

// Borra las etiquetas de las palabras clave (### autoayuda o ### Coach laboral)
// Independientemente del uso de las mayúsculas y minúsculas
// Usa la constante: respuestaLimpia
function limpiarEtiquetas(texto) {
  return texto.replace(/###\s*(autoayuda|nutrición|nutricion|coach laboral|crianza)/gi, "").trim();
}

// Busca las etiquetas antes mencionadas
// Usa la constante: reply
function verificarMensaje(respuesta) {
  const modulos = ['autoayuda', 'nutricion', 'coach', 'crianza'];
  modulos.forEach(id => {
    document.getElementById(id).classList.add('hidden');
  });

  const mensaje = respuesta.toLowerCase();

  if (mensaje.includes('### autoayuda')) {
    document.getElementById('autoayuda').classList.remove('hidden');
  }

  if (mensaje.includes('### nutrición') || mensaje.includes('### nutricion')) {
    document.getElementById('nutricion').classList.remove('hidden');
  }

  if (mensaje.includes('### coach laboral')) {
    document.getElementById('coach').classList.remove('hidden');
  }

  if (mensaje.includes('### crianza')) {
    document.getElementById('crianza').classList.remove('hidden');
  }
}

// Limite de la pregunta
function actualizarContador() {
  const textarea = document.getElementById('userInput');
  const contador = document.getElementById('contadorCaracteres');
  contador.textContent = `${textarea.value.length} / 300`;
}

// Saludos de ingreso o recarga

const saludos = [
  "Bienvenida. Estoy para apoyarte.",
  "Hola. Puedes usar este espacio para consultar tus dudas.",
  "Gracias por ingresar. Estoy disponible si necesitas información o apoyo.",
  "Hola. Este es un lugar seguro para que consultes lo que necesites.",
  "Bienvenida. Aquí puedes encontrar información útil sobre varios temas.",
  "Hola. Estoy aquí para ayudarte de manera clara y respetuosa.",
  "Hola. Si hay algo que te interese saber, puedes escribirlo con confianza.",
  "Bienvenida. Puedes iniciar escribiendo el tema o la pregunta que deseas consultar.",
  "Hola. Puedes contar con este espacio para orientarte.",
  "Gracias por entrar. Estoy para ayudarte en lo que necesites saber.",
  "Hola. Puedes hacer tu consulta cuando lo desees.",
  "Bienvenida. Estoy preparada para responder tus preguntas.",
  "Hola. Estoy para brindarte apoyo de forma clara y segura.",
  "Bienvenida. Puedes comenzar escribiendo lo que necesitas saber.",
  "Hola. Estoy aquí para brindarte información cuando la necesites."
];

document.addEventListener('DOMContentLoaded', () => {
  const saludoAleatorio = saludos[Math.floor(Math.random() * saludos.length)];
  document.getElementById('response').innerHTML = `<p>${saludoAleatorio}</p>`;
});

// Menú desplegable

const sidePanel = document.getElementById('sidePanel');
const toggleBtn = document.getElementById('toggleBtn');
const overlay = document.getElementById('sideOverlay');

function togglePanel(forceClose = false) {
  const isOpen = document.body.classList.contains('panel-abierto');

  if (forceClose || isOpen) {
    document.body.classList.remove('panel-abierto');
    overlay.classList.add('hidden');
    toggleBtn.innerHTML = '→';
  } else {
    document.body.classList.add('panel-abierto');
    overlay.classList.remove('hidden');
    toggleBtn.innerHTML = '←';
  }
}

// Click al botón
toggleBtn.addEventListener('click', () => togglePanel());

// Click fuera del panel (overlay)
overlay.addEventListener('click', () => togglePanel(true));
