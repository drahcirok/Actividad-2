# 🏥 Rediseño del Formulario de Admisiones

## Diseño de Entradas Efectivas

**Asignatura:** Desarrollo de Sistemas de Información  
**Autor:** Richard Burgos

---

## Tabla de Contenidos

- [Introducción](#introducción)
- [Objetivos](#objetivos)
- [Contexto del Caso](#contexto-del-caso)
- [Análisis del Formulario Actual](#análisis-del-formulario-actual)
- [Selección de Controles](#selección-de-controles)
- [Tabla de Respuesta a Eventos](#tabla-de-respuesta-a-eventos)
- [Fundamentación Teórica](#fundamentación-teórica)
- [Diseño Propuesto](#diseño-propuesto)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Ejecución del Proyecto](#ejecución-del-proyecto)
- [Conclusiones](#conclusiones)

---

# Introducción

El diseño de las entradas de un sistema de información influye directamente en la calidad de los datos almacenados y en la eficiencia con la que los usuarios interactúan con una aplicación. Un formulario mal diseñado incrementa la probabilidad de errores, ralentiza el proceso de captura y afecta la experiencia del usuario.

El presente proyecto propone el rediseño del formulario de admisiones de la **Clínica San José**, reemplazando un sistema heredado por una interfaz moderna, organizada y dinámica que incorpora validaciones en tiempo real, lógica condicional y principios de usabilidad para optimizar el registro de pacientes.

---

# Objetivos

## Objetivo General

Diseñar un formulario digital moderno que mejore el proceso de admisión de pacientes mediante la aplicación de principios de Diseño de Entradas Efectivas y buenas prácticas de experiencia de usuario.

## Objetivos Específicos

- Identificar las principales deficiencias del formulario heredado.
- Seleccionar controles adecuados para cada tipo de dato.
- Diseñar una interfaz organizada y fácil de utilizar.
- Reducir errores mediante validaciones en tiempo real.
- Aplicar principios de simplicidad, consistencia y accesibilidad.

---

# Contexto del Caso

La Clínica San José busca optimizar el proceso de registro de nuevos pacientes. El formulario utilizado actualmente presenta múltiples problemas relacionados con la captura de información, generando retrasos durante la atención y errores que afectan procesos posteriores como la facturación y el contacto con los pacientes.

Como solución, se desarrolló un nuevo formulario digital que organiza la información en pasos, utiliza controles especializados para cada tipo de dato e incorpora validaciones automáticas para mejorar la calidad de la información registrada.

---

# Análisis del Formulario Actual

## Deficiencias Identificadas

| Problema | Impacto | Solución Propuesta |
|----------|---------|-------------------|
| Opciones ingresadas manualmente | Errores de escritura | Radio Buttons y Selects |
| Edad escrita manualmente | Información inconsistente | Cálculo automático desde la fecha de nacimiento |
| Campos innecesarios visibles | Sobrecarga visual | Lógica condicional |
| Sin validaciones | Captura de datos inválidos | Validación en tiempo real |
| Reinicio del formulario al fallar | Pérdida de información | Conservación de datos ingresados |
| Formulario extenso | Baja usabilidad | División por pasos (Wizard) |

### Captura manual de información

El formulario obligaba al usuario a escribir información que podía seleccionarse mediante controles especializados, aumentando el tiempo de registro y la probabilidad de errores.

### Organización deficiente

Todos los campos aparecían en una única pantalla sin separación lógica, dificultando la lectura y aumentando la carga cognitiva del usuario.

### Ausencia de validaciones

El sistema permitía registrar correos inválidos, teléfonos con letras y fechas incorrectas, afectando la calidad de la información almacenada.

---

# Selección de Controles

## Deficiencia 1: Captura de opciones cerradas

Campos como género, tipo de sangre o seguro médico fueron reemplazados por **Radio Buttons** y **Selects**, evitando errores de escritura y facilitando la selección de opciones válidas.

## Deficiencia 2: Campos condicionales

La información del representante legal únicamente se muestra cuando el paciente es menor de edad. De igual forma, los datos de la aseguradora aparecen únicamente cuando el usuario indica que posee seguro médico.

## Deficiencia 3: Validaciones y automatización

La edad se calcula automáticamente a partir de la fecha de nacimiento. Además, el sistema valida en tiempo real el formato del correo electrónico, el número telefónico, las fechas permitidas y los campos obligatorios.

---

# Tabla de Respuesta a Eventos

| Evento del Usuario | Acción del Sistema | Feedback Visual | Feedback Textual |
|--------------------|-------------------|-----------------|------------------|
| Selecciona "Sí" en Seguro Médico | Muestra los campos de aseguradora y póliza | Aparición gradual de la sección | "Complete la información del seguro." |
| Selecciona "No" | Oculta la sección de seguro | Desaparición suave | — |
| Edad menor de 18 años | Activa la sección del representante legal | Nueva sección visible | "Debe registrar un representante legal." |
| Edad mayor de 18 años | Oculta dicha sección | Eliminación automática | — |
| Correo inválido | Impide continuar | Campo resaltado en rojo | "Ingrese un correo electrónico válido." |
| Teléfono con caracteres | Rechaza la entrada | Campo resaltado | "Solo se permiten números." |
| Fecha futura | Bloquea el registro | Campo en rojo | "La fecha no puede ser futura." |
| Campos obligatorios vacíos | Deshabilita el botón de registro | Resalta los campos faltantes | "Complete todos los campos obligatorios." |
| Registro exitoso | Guarda la información | Notificación de éxito | "Paciente registrado correctamente." |

---

# Fundamentación Teórica

## Modelo Conceptual de la Entrada

### Información

Se eliminaron datos redundantes como la edad manual y se automatizaron la fecha y hora de ingreso. Asimismo, únicamente se solicitan datos adicionales cuando son realmente necesarios.

### Presentación

El formulario fue organizado mediante un asistente por pasos (Wizard), agrupando la información en secciones para reducir la carga cognitiva y facilitar la navegación.

Las secciones principales son:

- Datos personales
- Información de contacto
- Información médica
- Seguro médico
- Representante legal
- Resumen final

### Contexto

El sistema fue diseñado considerando que será utilizado tanto por recepcionistas como por pacientes desde dispositivos móviles, priorizando rapidez, simplicidad y facilidad de uso.

## Principios de Diseño Aplicados

### KISS (Keep It Simple, Stupid)

Se eliminaron elementos innecesarios y únicamente se muestran los campos relevantes para cada caso, reduciendo la complejidad del proceso de registro.

### Consistencia

Todos los componentes mantienen la misma estructura visual, colores, espaciados y comportamiento, ofreciendo una experiencia uniforme durante todo el formulario.

### Accesibilidad

Se emplearon colores con suficiente contraste, mensajes descriptivos para los errores, indicadores visuales adicionales al color y controles adaptados para dispositivos táctiles, siguiendo recomendaciones de accesibilidad web.

---

# Diseño Propuesto

El nuevo formulario organiza el registro de pacientes mediante un flujo guiado compuesto por varios pasos, permitiendo completar la información de forma progresiva.

Las principales mejoras implementadas son:

- Formulario dividido por pasos.
- Barra de progreso.
- Validaciones en tiempo real.
- Cálculo automático de edad.
- Fecha y hora de ingreso automáticas.
- Campos condicionales.
- Resumen previo al registro.
- Diseño responsive para escritorio, tablet y dispositivos móviles.

## Evidencias

> Reemplazar las siguientes imágenes por las capturas del proyecto.

### Formulario principal

<img width="1897" height="966" alt="image" src="https://github.com/user-attachments/assets/bfc56058-2a54-46e0-8c7b-c3abec1d2c39" />

### Validaciones

<img width="1897" height="971" alt="image" src="https://github.com/user-attachments/assets/17795580-97ac-43f9-b590-bd1ea05ce4c0" />

<img width="1900" height="977" alt="image" src="https://github.com/user-attachments/assets/20243943-d8c0-4e78-9195-04b9a20e0074" />


### Campos condicionales

<img width="1881" height="975" alt="image" src="https://github.com/user-attachments/assets/a26925b2-9e02-4c74-8429-4b6fa98de15f" />


---

# Tecnologías Utilizadas

| Tecnología | Descripción |
|------------|-------------|
| HTML5 | Estructura del formulario |
| Tailwind CSS | Diseño de la interfaz |
| JavaScript ES6 | Validaciones e interacción |
| Git | Control de versiones |
| GitHub | Publicación del proyecto |

---

# Estructura del Proyecto

```text
formulario-admisiones/
│
├── index.html
├── script.js
├── README.md
├── img/
└── assets/
```

---

# Ejecución del Proyecto

1. Clonar el repositorio.

```bash
git clone https://github.com/usuario/formulario-admisiones.git
```

2. Acceder al directorio del proyecto.

```bash
cd formulario-admisiones
```

3. Abrir el archivo **index.html** en cualquier navegador moderno.

No es necesario instalar dependencias adicionales.

---

# Conclusiones

El rediseño del formulario demuestra la importancia de un adecuado diseño de entradas dentro de un sistema de información. Mediante la incorporación de controles especializados, validaciones automáticas y una organización lógica de la información, fue posible reducir la probabilidad de errores durante la captura de datos y mejorar significativamente la experiencia del usuario.

La implementación de un formulario dividido por pasos, junto con la utilización de lógica condicional y retroalimentación inmediata, facilita el proceso de admisión tanto para el personal administrativo como para los pacientes. Estas mejoras permiten optimizar el tiempo de registro, incrementar la calidad de la información almacenada y ofrecer una interfaz moderna, accesible y alineada con los principios de Diseño de Entradas Efectivas.
