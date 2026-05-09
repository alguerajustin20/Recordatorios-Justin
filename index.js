function handleFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const task = Object.fromEntries(formData);

    // VALIDACIONES (Manteniendo tus reglas)
    if (task.title.trim() === "") {
        alert("El título es obligatorio");
        return;
    }

    if (task.title.length < 3) {
        alert("El título debe tener mínimo 3 caracteres");
        return;
    }

    // Validación de duplicados (Requisito de la tarea)
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

    if (!ulContainer) return;

    ulContainer.appendChild(taskElement);
    event.target.reset(); // Limpiar formulario
}

function createTaskElement(task) {
    const li = document.createElement("li");
    li.classList.add("task-item");
    li.id = task.id;

    const divTaskContent = document.createElement("div");
    divTaskContent.classList.add("task-content");

    const h3Title = document.createElement("h3");
    h3Title.textContent = task.title;

    const pDescription = document.createElement("p");
    pDescription.textContent = task.description;

    divTaskContent.appendChild(h3Title);
    divTaskContent.appendChild(pDescription);

    // ACCIONES
    const divTaskAction = document.createElement("div");
    divTaskAction.classList.add("task-actions");

    // BOTÓN ELIMINAR (Arreglado para que borre de verdad)
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.classList.add("delete-btn"); // Clase para tu CSS
    deleteButton.onclick = () => li.remove();

    // BOTÓN EDITAR (Arreglado tus errores de escritura)
    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.classList.add("edit-btn");

    editButton.addEventListener("click", () => {
        const newTitle = prompt("Editar título", h3Title.textContent);
        if (newTitle === null) return; // Si cancela, no hace nada

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
function filterTasks() {
    const searchText = document.getElementById("search-input").value.toLowerCase();
    const tasks = document.querySelectorAll(".task-item");

    tasks.forEach(task => {
        const title = task.querySelector("h3").textContent.toLowerCase();
        const description = task.querySelector("p").textContent.toLowerCase();

        // Si el texto está en el título o en la descripción, se muestra
        if (title.includes(searchText) || description.includes(searchText)) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    });
}