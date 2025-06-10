async function sendMessage() {
  const input = document.getElementById('userInput').value;
  const button = document.querySelector('button');
  
  // Desactivar botón y cambiar texto
  button.disabled = true;
  button.textContent = "Procesando...";

  try {
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer sk-525c3e8176914a559d22577ef1accc99"
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
    /*
    Implementar:
    Un lenguaje no tecnico
    No emita diagnosticos ni gestionar emergencias
    Tener en cuenta que los usuarios en su mayoria son huerfanas
    */

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Sin respuesta.";

    const respuestaLimpia = limpiarEtiquetas(reply);
    document.getElementById('response').innerHTML = marked.parse(respuestaLimpia);

    verificarMensaje(reply);
  } catch (error) {
    document.getElementById('response').textContent = "Error al procesar la solicitud.";
    console.error(error);
  } finally {
    // Restaurar botón
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
