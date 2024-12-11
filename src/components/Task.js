import { useState } from 'react';
import '../App.css';
import { useDrag, useDrop } from 'react-dnd';

const Task = ({ task, columnId, index, moveTask, handleTaskDelete, showaddscreen2 }) => {
  const [mouseHover, setMouseHover] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id, columnId, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'TASK',
    hover: (draggedItem) => {
      if (draggedItem.index !== index && draggedItem.columnId === columnId) {
        moveTask(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className="task"
      style={{ opacity: isDragging ? 0.5 : 1, position: 'relative' }}
      onMouseEnter={() => setMouseHover(true)}
      onMouseLeave={() => setMouseHover(false)}
    >
      {mouseHover && (
        <div style={{ position: 'absolute', top: 0, right: 0, display: 'flex', gap: '2px' }}>
          <img
            alt="edit"
            src={require('../assets/pencil.png')}
            style={{ width: 20, height: 20, cursor: 'pointer' }}
            onClick={() => showaddscreen2(columnId, true, task.content, task.id)}
          />
          <img
            alt="delete"
            src={require('../assets/delete.png')}
            style={{ width: 20, height: 20, cursor: 'pointer' }}
            onClick={() => handleTaskDelete(task.id)}
          />
        </div>
      )}
      <h1 className="taskheading">{task.content}</h1>
    </div>
  );
};

export default Task;
