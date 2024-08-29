import React, { useState } from "react";
import { MdDelete } from "react-icons/md";

const Cards = ({
  list,
  onTitleChange,
  onAddTask,
  onDragStart,
  onDrop,
  onDragEnd,
  handleDelete,
  draggedTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(list.title);
  const [newTask, setNewTask] = useState("");

  // Maneja el clic en el título para habilitar el modo de edición
  const handleTitleClick = () => {
    setIsEditing(true);
  };

  // Maneja el cambio en el input del título
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Maneja la pérdida del foco del input para guardar el nuevo título
  const handleBlur = () => {
    setIsEditing(false);
    onTitleChange(list.id, title);
  };

  // Maneja la tecla Enter para guardar el nuevo título
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      onTitleChange(list.id, title);
    }
  };

  // Maneja la adición de una nueva tarea
  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      onAddTask(list.id, newTask);
      setNewTask("");
    }
  };

  // Maneja el evento de arrastrar sobre el componente
  const handleDragOver = (e) => {
    e.preventDefault(); // Permite el evento de soltar
  };

  // Maneja el evento de soltar dentro del componente
  const handleDropInternal = (e) => {
    onDrop(e, list.id);
  };

  // Verifica si la tarea que se está arrastrando está en la lista actual
  const isDraggedTask = draggedTask?.listId === list.id;

  return (
    <div
      className="card"
      onDragOver={handleDragOver}
      onDrop={handleDropInternal}
      onDragEnd={onDragEnd}
    >
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          autoFocus
        />
      ) : (
        <h3 onClick={handleTitleClick}>{title}</h3>
      )}
      <div>
        {list.tasks.map((task, index) => (
          <div
            key={index}
            className="task"
            draggable
            onDragStart={(e) => onDragStart(e, index, list.id)}
          >
            {task}
            <button onClick={() => handleDelete(list.id, index)}>
              <MdDelete />
            </button>
          </div>
        ))}
      </div>
      <div className="task-input">
        <textarea
          placeholder="Introduce una tarea"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        ></textarea>
        <button onClick={handleAddTask}>Añadir tarjeta</button>
      </div>
    </div>
  );
};

export default Cards;
