// Récupérer les tâches depuis le local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const form = document.querySelector("form");
const input = document.querySelector("#new-task");
const taskList = document.querySelector("#task-list");
const clearBtn = document.querySelector("#clear-btn");

// Fonction pour afficher les tâches sur la page
function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.completed) {
      li.classList.add("completed");
    }
    // Ajouter une case à cocher pour marquer la tâche comme complétée
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      toggleCompleted(index);
    });
    li.prepend(checkbox);
    // Ajouter un bouton pour supprimer la tâche
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Supprimer";
    deleteBtn.addEventListener("click", () => {
      deleteTask(index);
    });
    li.append(deleteBtn);
    taskList.append(li);
  });
}
// Fonction pour ajouter une tâche
function addTask(event) {
    event.preventDefault();
    const text = input.value.trim();
    if (text !== "") {
      tasks.push({ text, completed: false });
      input.value = "";
      saveTasks();
      renderTasks();
    }
  }
  
  // Fonction pour supprimer une tâche
  function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
  // Fonction pour marquer ou démarquer une tâche comme complétée
function toggleCompleted(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
  }
  
  // Fonction pour effacer toutes les tâches
  function clearTasks() {
    tasks = [];
    saveTasks();
    renderTasks();
  }
  
  // Fonction pour enregistrer les tâches dans le local storage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  // Écouter l'événement "submit" du formulaire pour ajouter une tâche
form.addEventListener("submit", addTask);

// Afficher les tâches au chargement de la page
renderTasks();

// Ajouter un écouteur d'événement pour effacer toutes les tâches
clearBtn.addEventListener("click", clearTasks);

// Afficher les tâches dans la console pour déboguer
console.log(tasks);