import '../App.css';
import { useDrop } from 'react-dnd';
import Task from './Task';

const Column = ({ heading, columnId, tasks = [], onDragEnd, showaddscreen, deleteTask, showaddscreen2 }) => {
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item, monitor) => {
      if (!monitor.didDrop()) {
        onDragEnd(item.id, item.columnId, columnId, item.index, tasks.length);
      }
    },
  });

  const moveTask = (sourceIndex, destinationIndex) => {
    const reorderedTasks = [...tasks];
    const [movedTask] = reorderedTasks.splice(sourceIndex, 1);
    reorderedTasks.splice(destinationIndex, 0, movedTask);
    onDragEnd(movedTask.id, columnId, columnId, sourceIndex, destinationIndex);
  };

  return (
    <div ref={drop} className="column">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 className="columnheading">{heading}</h1>
        <h1 className="columnheading" style={{ cursor: 'pointer' }} onClick={() => showaddscreen(columnId)}>+</h1>
      </div>
      {tasks && tasks.length > 0 ? (
        tasks.map((task, index) => (
          <Task
            key={task.id}
            task={task}
            columnId={columnId}
            index={index}
            moveTask={moveTask}
            handleTaskDelete={deleteTask}
            showaddscreen2={showaddscreen2}
          />
        ))
      ) : (
        <p style={{ fontFamily: "EB Garamond" }}>No tasks here yet!</p>
      )}
    </div>
  );
};

export default Column;
