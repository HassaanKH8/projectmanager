import '../App.css';
import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Column from './Column';
import AddTaskScreen from './AddTaskScreen';

const Board = ({ projectname }) => {

  const [boardData, setBoardData] = useState('');
  const [showModal, setShowModal] = useState(false)
  const [columntosend, setColumnToSend] = useState('')
  const [toedit, setToEdit] = useState(false)
  const [contentToEdit, setContentToEdit] = useState('')
  const [IdToEdit, setIdToEdit] = useState('')

  const handleBoardData = () => {
    const savedData = localStorage.getItem(`kanbanBoard${projectname}`);
    savedData
      ? setBoardData(JSON.parse(savedData))
      : setBoardData({
        todo: [{ id: 'task-1', content: 'Task 1' }],
        inProgress: [{ id: 'task-2', content: 'Task 2' }],
        done: [{ id: 'task-3', content: 'Task 3' }],
      })
  }

  useEffect(() => {
    handleBoardData()
    // eslint-disable-next-line
  }, [projectname])


  const onDragEnd = (taskId, sourceColumn, destinationColumn, sourceIndex, destinationIndex) => {
    const newBoardData = { ...boardData };
  
    if (sourceColumn === destinationColumn) {
      const columnTasks = [...newBoardData[sourceColumn]];
      const [movedTask] = columnTasks.splice(sourceIndex, 1);
      columnTasks.splice(destinationIndex, 0, movedTask);
      newBoardData[sourceColumn] = columnTasks;
    } else {
      const sourceTasks = [...newBoardData[sourceColumn]];
      const destinationTasks = [...newBoardData[destinationColumn]];
      const [movedTask] = sourceTasks.splice(sourceIndex, 1);
      destinationTasks.splice(destinationIndex, 0, movedTask);
      newBoardData[sourceColumn] = sourceTasks;
      newBoardData[destinationColumn] = destinationTasks;
    }
  
    setBoardData(newBoardData);
    localStorage.setItem(`kanbanBoard${projectname}`, JSON.stringify(newBoardData));
  };

  const showaddscreen = (destinationColumn) => {
    setColumnToSend(destinationColumn)
    setShowModal(true);
  }

  const showaddscreen2 = (destinationColumn, toedit, taskInput, taskId) => {
    setColumnToSend(destinationColumn)
    setToEdit(toedit);
    setContentToEdit(taskInput)
    setShowModal(true);
    setIdToEdit(taskId)
  }

  const handleTaskEdit = (taskId, taskContent) => {

    const newBoardData = { ...boardData };

    const task1 = newBoardData['todo'].find((task) => task.id === taskId);
    const task2 = newBoardData['inProgress'].find((task) => task.id === taskId);
    const task3 = newBoardData['done'].find((task) => task.id === taskId);

    if (task1) {
      task1.content = taskContent

      setBoardData(newBoardData);
      localStorage.setItem(`kanbanBoard${projectname}`, JSON.stringify(newBoardData));
    }
    if (task2) {
      task2.content = taskContent

      setBoardData(newBoardData);
      localStorage.setItem(`kanbanBoard${projectname}`, JSON.stringify(newBoardData));
    }
    if (task3) {
      task3.content = taskContent

      setBoardData(newBoardData);
      localStorage.setItem(`kanbanBoard${projectname}`, JSON.stringify(newBoardData));
    }
  }

  const addNewTask = (destinationColumn, taskcontent) => {
    const min = 100000;
    const max = 999999;
    const random_number = Math.floor(Math.random() * (max - min + 1)) + min;

    const newBoardData = { ...boardData };
    const task1 = newBoardData['todo'].find((task) => task.id === `task-${random_number}`);
    const task2 = newBoardData['inProgress'].find((task) => task.id === `task-${random_number}`);
    const task3 = newBoardData['done'].find((task) => task.id === `task-${random_number}`);

    if (task1 || task2 || task3) {
      addNewTask(destinationColumn)
    }
    else {
      newBoardData[destinationColumn].push({ id: `task-${random_number}`, content: taskcontent });

      setBoardData(newBoardData);
      localStorage.setItem(`kanbanBoard${projectname}`, JSON.stringify(newBoardData));
    }
  }

  const deleteTask = (taskId) => {
    const newBoardData = { ...boardData };
    const task1 = newBoardData['todo'].find((task) => task.id === taskId);
    const task2 = newBoardData['inProgress'].find((task) => task.id === taskId);
    const task3 = newBoardData['done'].find((task) => task.id === taskId);

    if (task1) {
      newBoardData['todo'] = newBoardData['todo'].filter(
        (task) => task.id !== taskId
      );
      setBoardData(newBoardData);
      localStorage.setItem(`kanbanBoard${projectname}`, JSON.stringify(newBoardData));
    }
    if (task2) {
      newBoardData['inProgress'] = newBoardData['inProgress'].filter(
        (task) => task.id !== taskId
      );
      setBoardData(newBoardData);
      localStorage.setItem(`kanbanBoard${projectname}`, JSON.stringify(newBoardData));
    }
    if (task3) {
      newBoardData['done'] = newBoardData['done'].filter(
        (task) => task.id !== taskId
      );
      setBoardData(newBoardData);
      localStorage.setItem(`kanbanBoard${projectname}`, JSON.stringify(newBoardData));
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="page">
        <div className="board">
          {['todo', 'inProgress', 'done'].map((columnId) => (
            <Column
              key={columnId}
              columnId={columnId}
              heading={columnId === 'todo' ? 'To-Do' : columnId === 'inProgress' ? 'In Progress' : 'Done'}
              tasks={boardData[columnId] || []}
              onDragEnd={onDragEnd}
              showaddscreen={showaddscreen}
              showaddscreen2={showaddscreen2}
              deleteTask={deleteTask}
            />
          ))}
        </div>
        {showModal && (
          <AddTaskScreen setShowModal={setShowModal} addNewTask={addNewTask} columntosend={columntosend} setToEdit={setToEdit} toedit={toedit} taskInput={contentToEdit} setTaskInput={setContentToEdit} taskId={IdToEdit} editTask={handleTaskEdit} />
        )}
      </div>
    </DndProvider>
  );
};

export default Board;
