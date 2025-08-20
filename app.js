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
    const listaTareas = document.getElementById('task-list');
    listaTareas.innerHTML = '';  // Limpiar la lista antes de agregar nuevas tareas
    
    tareas.forEach((tarea, indice) => {
        const li = document.createElement('li');
        
        // Usamos toggle para agregar o eliminar la clase 'completed' de acuerdo al estado de la tarea
        li.classList.toggle('completed', tarea.completada);
        
        li.textContent = tarea.nombre;

        const btnCompletar = document.createElement('button');
        btnCompletar.textContent = tarea.completada ? 'Desmarcar' : 'Completar';
        btnCompletar.onclick = () => completarTarea(indice);
        li.appendChild(btnCompletar);

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.onclick = () => eliminarTarea(indice);
        li.appendChild(btnEliminar);

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

// Agregar tarea al presionar "Enter"
inputTarea.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        botonAgregar.click(); // Simula un clic en el botón de agregar tarea
    }
});

