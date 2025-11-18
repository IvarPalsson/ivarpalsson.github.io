# 📚 Rastreador de Libros

Este proyecto es un **rastreador de libros** diseñado para que los usuarios puedan organizar sus lecturas, descubrir nuevos títulos y llevar un control de su progreso.

---

##  📝Planificación

### 🎯Temática
Decidimos trabajar con la temática de un rastreador de libros, ya que permite integrar diseño web (HTML, CSS) y funcionalidad dinámica mediante JavaScript, además de aprovechar una API externa para obtener información real de libros. El objetivo es ofrecer un espacio sencillo y visual para que los usuarios gestionen su registro literario de manera rápida y accesible.

### 👥Usuarios
Definimos dos tipos de usuarios principales:

- **Usuario lector básico**: Quiere buscar libros, consultar información y añadirlos a su lista de lectura sin opciones avanzadas.  
- **Usuario lector organizado**: Además de las funciones básicas, desea clasificar sus libros, añadir notas personales y hacer seguimiento del estado de lectura (pendiente, leyendo o terminado).

### ✅Requisitos de la aplicación
1. Permitir buscar libros usando una API externa, mostrando título, autor, portada y descripción.  
2. Guardar libros en una lista personalizada para gestionar la biblioteca digital.  
3. Marcar y actualizar el estado de lectura de cada libro.

---

## 🏗️Diseño

### Arquitectura cliente-servidor
El proyecto utiliza una arquitectura cliente-servidor típica de aplicaciones web:

- **Cliente**: Navegador del usuario, que carga la página del rastreador (HTML, CSS y JS), permite búsquedas, clics en libros, gestión de la mini librería y visualización de resultados.  
- **Servidor de la página**: GitHub Pages actúa como servidor estático, enviando los archivos al navegador cuando se accede al proyecto.  
- **Servidor de datos (API)**: Google Books API recibe las consultas del usuario, busca en su base de datos y devuelve los datos en formato JSON.  

**Resumen:** El navegador (cliente) interactúa con dos servidores:  
1. GitHub Pages (interfaz web)  
2. Google Books API (datos de libros)

---

## 🚀 Despliegue

Nuestra experiencia usando **GitHub Pages** fue positiva pero con curva de aprendizaje:  

- Al principio, los conceptos y pasos eran densos, pero tras clases de repaso logramos crear y estructurar el proyecto correctamente.  
- El despliegue fue sencillo, ya que HTML, CSS y JavaScript fueron reconocidos sin configuraciones adicionales.  
- La organización de archivos y rutas fue clave para que todo funcionara correctamente en línea.  
- La comunicación con la API externa funcionó sin problemas, permitiendo ver resultados en tiempo real y validar la funcionalidad del proyecto de inmediato.  

---

## 🛠️ Mantenimiento

###  🐞 Errores encontrados
- **Conflictos al trabajar en la misma rama dev**  
  - Errores al hacer pull debido a cambios simultáneos.  
  - Imposibilidad de pushear.  
  - Riesgo de sobrescribir trabajo.  
  **Solución:** Crear ramas individuales `dev-nombre` para cada colaborador.

- **Eliminación accidental de ramas**  
  **Solución:** Usar historial de commits y `reflog` para restaurar la rama.

- **Fallas menores en formularios**  
  - Campos vacíos o incorrectos.  

- **Desalineación visual en dispositivos pequeños**  
  - Títulos largos afectaban el formato de listas o tarjetas.  

### 💡Mejoras futuras
- Implementar **GitFlow** o flujo de trabajo más organizado.  
- Proteger ramas importantes (`main` y `dev`).  
- Revisiones de código obligatorias (pull requests).  
- Automatizaciones CI/CD para validar código.  
- Panel de estadísticas de lectura (libros por mes, géneros, progreso anual).  
- Notificaciones inteligentes y soporte multilenguaje.  
- Interfaz oscura (Dark Mode).  
- Tests automatizados para asegurar calidad.  

### 🤝 Análisis de la experiencia colaborativa
- Buena modularización del código.  
- Coordinación efectiva para evitar conflictos.  
- Estrategia de branching adaptativa con ramas individuales.

---

## 🎉Conclusiones

El rastreador de libros nos permitió:  
- Integrar tecnologías web (HTML, CSS, JS) con API externa.  
- Trabajar con peticiones asíncronas y datos en tiempo real.  
- Aprender la planificación y definición de requisitos según distintos tipos de usuarios.  
- Mejorar la colaboración en equipo usando GitHub y GitHub Pages.  
- Entender la importancia de la comunicación, organización y revisión constante en el desarrollo de aplicaciones web.  

El proyecto resultó en una **herramienta funcional y visualmente dinámica**, con posibilidades de futuras mejoras y ampliaciones.
