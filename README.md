# Trabajo de Graduación - EcoHuella: Aplicación de gestión de huella de carbono

## 📝 Descripción
EcoHuella es una aplicación web en la cual puedes realizar un cuestionario para calcular tu huella de carbono personal en el ambito guatemalteco. Ademas de ver la cantidad total de huella de carbono en el pais. 

## 💻 Interfaces
- Iniciar Sesión.
- Registrarse.
- Menu principal.
- Realizar cuestionario.
- Ver cuestionarios realizados.
- Ver cuestionarios en gráficas.
- Insignias alcanzadas.
- Recomendaciones generales.
- Equivalencias de tu huella de carbono.
- Compartir la app.

## 📋 Pre-requisitos
- Node.js
- Editor de texto.

## 🔧 Instalación
- Crear una carpeta para el proyecto
- Copiar y pegar la carpeta src en la carpeta del proyecto.
- Copiar y pegar la carpeta dentro de src llamado "more" afuera de src.

## 🔧 Bases de datos
- Ir a la página de Firebase.
- Iniciar sesión en la Consola de Firebase (console.firebase.google.com) con una cuenta de Google.
- Crear un nuevo proyecto haciendo clic en "Agregar proyecto", dar un nombre y seguir cada paso que se indica en la página.
- Una vez dentro del proyecto, ir al menú lateral y seleccionar "Firestore Database".
- Click en "Crear base de datos", seleccionar el modo de prueba.
- Crear 3 colecciones, las cuales son "users", "totales" y "respuestas".
- En users iran los campos de: email, department, municipality y zone.
- En totales iran los campos de: email, fechaHora y huella.
- En respuestas iran los campos de: email, fechaHora, huella, respuesta1 hasta respuesta33 y totalDocId.
- Conectar la aplicación usando el SDK de Firebase.

## 🔧 Ejecutar el programa
```bash
cd "nombre-de-la-carpeta"
npm run dev
```

## 🧑🏼‍💻 Stack de Tecnologías
- [Node.js]
- [React]
- [Vite]
- [Firebase]
  
## 📂 Estructura del Proyecto
```
src/
├── assets
├── components
├── dist
├── more
├── services
├── .gitignore
├── activeManagement.js
├── ActivoTotalSuma.js  
├── ActivoTotalSumaCombinado.js
├── ActivoTotalSumaFiltro.js
├── App.css
├── App.jsx
├── AppRouter.jsx
├── dataFetch.js
├── departmentManagement.js
├── Dockerfile
├── fetchUserResponses.js
├── firebase.js
├── firebaseActions.js
├── firebaseService.js
├── Footer2.jsx
├── huellafiltroactivo.js
├── huellatotalManagement.js
├── index.css
├── index.js
├── main.jsx
├── NewApp.jsx
├── package-lock.json
├── package.json
├── README.md
├── routes.js
├── Share.css
├── Share.html
├── tailwind.config.js
├── Tareas.txt
├── totalManagement.js
├── userManagement.js
├── vercel.json
└── .eslintrc.js
```

## 📧 Contacto
Correo institucional: gar18071@uvg.edu.gt
Correo personal: joseovando042000@gmail.com
