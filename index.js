// 1. FUNCIÓN PRINCIPAL: GESTIONAR EL FORMULARIO
function handleFormSubmit(event) {
    event.preventDefault(); // Evita que la página se recargue

    const formData = new FormData(event.target);
    const task = Object.fromEntries(formData);

    // VALIDACIONES
    if (task.title.trim() === "" || task.title.length < 3) {
        alert("El título debe tener mínimo 3 caracteres");
        return;
    }

    // VALIDACIÓN DE DUPLICADOS
    const existingTasks = document.querySelectorAll(".task-content h3");
    for (let t of existingTasks) {
        if (t.textContent.toLowerCase() === task.title.trim().toLowerCase()) {
            alert("Esa tarea ya existe, ¡ponle otro nombre!");
            return;
        }
    }

    task.id = Date.now();
    const taskElement = createTaskElement(task);
    const ulContainer = document.getElementById("task-list-container");

    if (ulContainer) {
        ulContainer.appendChild(taskElement); 
        event.target.reset(); // Limpiar formulario
        updateCounter();      // Actualizar contador después de agregar
    }
}

// 2. FUNCIÓN PARA CREAR EL ELEMENTO EN LA LISTA
function createTaskElement(task) {
    const li = document.createElement("li");
    li.classList.add("task-item");
    li.id = task.id;

    const divTaskContent = document.createElement("div");
    divTaskContent.classList.add("task-content");
    divTaskContent.onclick = () => {
    divTaskContent.parentElement.classList.toggle("completed");
};

    const h3Title = document.createElement("h3");
    h3Title.textContent = task.title;

    const pDescription = document.createElement("p");
    pDescription.textContent = task.description;

    divTaskContent.appendChild(h3Title);
    divTaskContent.appendChild(pDescription);

    const divTaskAction = document.createElement("div");
    divTaskAction.classList.add("task-actions");

    // BOTÓN ELIMINAR
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.classList.add("delete-btn");
    
    deleteButton.onclick = () => {
        const confirmar = confirm("¿Estás seguro de que quieres eliminar este recordatorio?");
        if (confirmar) {
            li.remove();
            updateCounter(); // Actualizar contador después de borrar
        }
    };

    // BOTÓN EDITAR
    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.classList.add("edit-btn");

    editButton.addEventListener("click", () => {
        const newTitle = prompt("Editar título", h3Title.textContent);
        if (newTitle === null) return; 

        if (newTitle.trim() === "" || newTitle.length < 3) {
            alert("Título no válido");
            return;
        }

        const newDesc = prompt("Editar descripción", pDescription.textContent);
        
        h3Title.textContent = newTitle;
        pDescription.textContent = newDesc;
    });

    divTaskAction.appendChild(editButton);
    divTaskAction.appendChild(deleteButton);

    li.appendChild(divTaskContent);
    li.appendChild(divTaskAction);

    return li;
}

// 3. FUNCIÓN DEL BUSCADOR
function filterTasks() {
    const searchText = document.getElementById("search-input").value.toLowerCase();
    const tasks = document.querySelectorAll(".task-item");

    tasks.forEach(task => {
        const title = task.querySelector("h3").textContent.toLowerCase();
        const description = task.querySelector("p").textContent.toLowerCase();

        if (title.includes(searchText) || description.includes(searchText)) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    });
}

// 4. FUNCIÓN DEL CONTADOR
function updateCounter() {
    const total = document.querySelectorAll(".task-item").length;
    const counter = document.getElementById("task-counter");
    if (counter) {
        counter.textContent = `Tienes ${total} recordatorio${total === 1 ? '' : 's'}`;
    }
}

// Inicializar el contador al cargar la página
updateCounter();