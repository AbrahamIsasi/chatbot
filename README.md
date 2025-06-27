# 🧠 Carmencita - Asistente Virtual con PHP y OpenRouter

Este proyecto implementa una interfaz web de chatbot diseñada para brindar orientación personal y familiar a usuarias en situación vulnerable. Utiliza **HTML, CSS, JavaScript** y un backend en **PHP** alojado en **Vercel**, que actúa como proxy seguro hacia la API de OpenRouter.

---

## 🔧 Estructura del proyecto

```
chatbot/
├── index.html
├── inicio_script.js
├── inicio_styles.css
├── /img
└── /api
    └── proxy.php
vercel.json
```

---

## 🛠️ ¿Qué se hizo para que funcione PHP en Vercel?

1. **Activar soporte PHP en Vercel**:  
   Aunque Vercel está orientado a JavaScript, permite ejecutar funciones en PHP utilizando la carpeta `/api/` con archivos `.php`. Vercel los trata como funciones serverless.

2. **Crear proxy en `/api/proxy.php`**:  
   Se creó un archivo PHP que recibe el `POST` desde JavaScript y reenvía la solicitud a la API de OpenRouter usando `cURL`, protegiendo la clave secreta.

3. **Habilitar `cURL` en entorno de Vercel**:  
   Vercel ya lo tiene habilitado por defecto, pero es crucial evitar errores de entorno local donde `curl_init()` no esté disponible.

4. **Uso de variables de entorno**:  
   La clave secreta se almacena en el panel de Vercel como variable (por ejemplo: `OPENROUTER_API_KEY`). En PHP se accede mediante `getenv("OPENROUTER_API_KEY")`.

---

## 🌐 ¿Dónde se colocan las variables de entorno en Vercel?

Para proteger tu clave API (`OPENROUTER_API_KEY`) y otras variables sensibles:

1. Entra a [vercel.com](https://vercel.com) y selecciona tu proyecto.
2. Ve a la pestaña **Settings → Environment Variables**.
3. Añade una nueva variable:
   - **Name**: `OPENROUTER_API_KEY`
   - **Value**: tu clave secreta (por ejemplo, `sk-...`)
   - **Environment**: selecciona `Production` (y `Preview` si quieres que funcione también en entornos de prueba).
4. Haz clic en **Save**.
5. Si ya desplegaste el proyecto, vuelve a hacer **redeploy** para que los cambios surtan efecto.

En el código PHP, la variable se recupera con:

```php
$api_key = getenv("OPENROUTER_API_KEY");
````

⚠️ **Nunca pongas la clave directamente en el frontend o en archivos `.js`.**
