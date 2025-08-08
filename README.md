# Binomics Prototype — HTML/CSS/JS

Prototipo navegable, responsivo y optimizado con modo claro/oscuro y hero animado.

## Carpetas y archivos
- `index.html` — página principal
- `styles.css` — estilos y variables (incluye dark mode)
- `script.js` — animaciones, interacciones y envío del formulario
- `assets/` — logos y recursos

## Cómo ver en local
1. Descarga y descomprime el .zip
2. Abre `index.html` en tu navegador

## Habilitar el formulario (2 minutos con Formspree)
1. Ve a https://formspree.io/ y crea una cuenta gratis.
2. Crea un formulario nuevo y copia tu endpoint, por ej.: `https://formspree.io/f/abcdwxyz`
3. Abre `script.js` y pega el endpoint en `FORMSPREE_ENDPOINT`
4. (Opcional) Configura la redirección o notificaciones a `contacto@binomics.co` desde Formspree

## Deploy rápido (Netlify)
1. Crea una cuenta en https://app.netlify.com/
2. Arrastra la carpeta del proyecto (o el .zip) a **Netlify Drop**: https://app.netlify.com/drop
3. Obtendrás un dominio temporal inmediato (ej.: `https://binomics-landing.netlify.app`)

## Deploy rápido (Vercel)
1. Sube esta carpeta a un repositorio en GitHub
2. Entra a https://vercel.com/ y **Import Project**
3. Selecciona el repo y despliega
4. Obtendrás un dominio temporal (ej.: `https://binomics-landing.vercel.app`)

## Importar a Figma
- Usa un plugin como **HTML to Figma** para importar `index.html`
- Alternativamente, pega el prompt preparado previamente en Figma AI para recrear el layout

## Personalización
- Colores y tokens están en `:root` (modo claro) y `html[data-theme="dark"]` (modo oscuro)
- La animación del hero está en `script.js` (canvas). Puedes cambiar densidad, colores y velocidad.
