import { useState } from "react";
import "./App.css";
import Cards from "./Cards";

function App() {
  // Estado que mantiene las listas de tareas
  const [lists, setLists] = useState([
    { id: 1, title: "Lista de Tareas", tasks: [] },
    { id: 2, title: "Cosas que hacer", tasks: [] },
    { id: 3, title: "Hecho", tasks: [] },
  ]);

  // Estado que mantiene la tarea arrastrada y su lista original
  const [draggedTask, setDraggedTask] = useState(null);

  // Maneja el cambio del título de una lista
  const handleTitleChange = (id, newTitle) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === id ? { ...list, title: newTitle } : list
      )
    );
  };

  // Maneja la adición de una nueva tarea a una lista
  const handleAddTask = (listId, task) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId ? { ...list, tasks: [...list.tasks, task] } : list
      )
    );
  };

  // Maneja el inicio del arrastre de una tarea
  const handleDragStart = (e, taskId, listId) => {
    setDraggedTask({ taskId, listId }); // Guarda la tarea arrastrada y la lista original
    e.dataTransfer.setData("taskId", taskId); // Establece el id de la tarea en el dataTransfer
    e.dataTransfer.setData("listId", listId); // Establece el id de la lista en el dataTransfer
  };

  // Maneja el final del arrastre
  const handleDragEnd = () => {
    setDraggedTask(null); // Limpia el estado de la tarea arrastrada
  };

  // Maneja el evento de soltar una tarea en una lista
  const handleDrop = (e, targetListId) => {
    e.preventDefault(); // Previene el comportamiento por defecto del navegador
    const taskId = e.dataTransfer.getData("taskId"); // Obtiene el id de la tarea arrastrada
    const sourceListId = e.dataTransfer.getData("listId"); // Obtiene el id de la lista original

    // Evita mover la tarea si se suelta en la misma lista
    if (sourceListId === targetListId) return;

    // Encuentra la lista original y la tarea que se está moviendo
    const sourceList = lists.find((list) => list.id === parseInt(sourceListId));
    const task = sourceList.tasks[parseInt(taskId)];

    // Actualiza las listas con la tarea movida
    setLists((prevLists) =>
      prevLists.map((list) => {
        if (list.id === parseInt(sourceListId)) {
          return {
            ...list,
            tasks: list.tasks.filter((_, index) => index !== parseInt(taskId)),
          };
        } else if (list.id === parseInt(targetListId)) {
          return {
            ...list,
            tasks: [...list.tasks, task],
          };
        }
        return list;
      })
    );

    setDraggedTask(null); // Limpia el estado de la tarea arrastrada
  };

  // Maneja la eliminación de una tarea de una lista
  const handleDelete = (listId, taskId) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              tasks: list.tasks.filter((_, index) => index !== taskId),
            }
          : list
      )
    );
  };

  return (
    <>
      <div className="board">
        {lists.map((list) => (
          <Cards
            key={list.id}
            list={list}
            onTitleChange={handleTitleChange}
            onAddTask={handleAddTask}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            onDragEnd={handleDragEnd}
            handleDelete={handleDelete}
            draggedTask={draggedTask}
          />
        ))}
      </div>
    </>
  );
}

export default App;
