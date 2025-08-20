// Crear tareas y almacenarlas en un array
let tareas = [];

// Función para agregar tarea
function agregarTarea(tarea) {
    tareas.push(tarea); // Agregar la tarea al array
    guardarTareas(); // Guardar las tareas en localStorage
    mostrarTareas(); // Mostrar las tareas en la lista
}

// Función para eliminar tarea
function eliminarTarea(indice) {
    tareas.splice(indice, 1); // Eliminar la tarea del array
    guardarTareas(); // Guardar los cambios en localStorage
    mostrarTareas(); // Volver a mostrar la lista de tareas
}

// Función para marcar tarea como completada
function completarTarea(indice) {
    tareas[indice].completada = !tareas[indice].completada; // Cambiar el estado de la tarea
    guardarTareas(); // Guardar los cambios en localStorage
    mostrarTareas(); // Volver a mostrar la lista con las tareas actualizadas
}

// Guardar las tareas en localStorage para persistencia
function guardarTareas() {
    localStorage.setItem('tareas', JSON.stringify(tareas)); // Guardar las tareas en localStorage
}

// Mostrar las tareas en la interfaz
function mostrarTareas() {
    const listaTareas = document.getElementById('task-list'); // Obtener la lista de tareas del HTML
    listaTareas.innerHTML = ''; // Limpiar la lista antes de agregar nuevas tareas
    
    // Recorrer el array de tareas y mostrarlas en la lista
    tareas.forEach((tarea, indice) => {
        const li = document.createElement('li');
        
        // Si la tarea está completada, agregar la clase 'completed'
        li.classList.add(tarea.completada ? 'completed' : '');

        li.textContent = tarea.nombre;

        // Botón para completar tarea
        const btnCompletar = document.createElement('button');
        btnCompletar.textContent = tarea.completada ? 'Desmarcar' : 'Completar';
        btnCompletar.onclick = () => completarTarea(indice); // Llamar a la función para completar/desmarcar la tarea
        li.appendChild(btnCompletar);

        // Botón para eliminar tarea
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.onclick = () => eliminarTarea(indice); // Llamar a la función para eliminar la tarea
        li.appendChild(btnEliminar);

        // Añadir la tarea a la lista
        listaTareas.appendChild(li);
    });
}

// Cargar las tareas desde localStorage al iniciar la página
function cargarTareas() {
    const tareasGuardadas = JSON.parse(localStorage.getItem('tareas')); // Obtener las tareas guardadas en localStorage
    if (tareasGuardadas) {
        tareas = tareasGuardadas; // Asignar las tareas guardadas al array 'tareas'
        mostrarTareas(); // Mostrar las tareas en la interfaz
    }
}

// Ejecutar la carga de tareas al cargar la página
cargarTareas();

// Capturar el botón y el input de tarea
const botonAgregar = document.getElementById('add-task-btn'); // Obtener el botón de agregar tarea
const inputTarea = document.getElementById('task-input'); // Obtener el campo de entrada de tarea

// Agregar una nueva tarea cuando se hace clic en el botón
botonAgregar.addEventListener('click', () => {
    const nombreTarea = inputTarea.value.trim(); // Obtener el texto de la tarea
    if (nombreTarea) {
        agregarTarea({ nombre: nombreTarea, completada: false }); // Agregar la tarea al array
        inputTarea.value = ''; // Limpiar el campo de entrada
    }
});
