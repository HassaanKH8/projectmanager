import React, { useState } from 'react';
import '../App.css';

const AddTaskScreen = ({ setShowModal, addNewTask, columntosend, setToEdit, toedit, taskInput, setTaskInput, editTask, taskId }) => {

    const [taskContent, setTaskContent] = useState(taskInput || '')

    const handleSave = () => {
        if (taskContent) {
            addNewTask(columntosend, taskContent);
            setTaskContent("");
            setShowModal(false);
            setToEdit(false);
            setTaskInput('');
        }
    }
    const handleEditSave = () => {
        if (taskContent) {
            editTask(taskId, taskContent);
            setTaskContent("");
            setShowModal(false)
            setToEdit(false);
            setTaskInput('')
        }
    }

    return (
        <div className="modal-overlay">
            <div style={{ padding: 20, backgroundColor: "#efeee9", borderRadius: 10, position: 'relative' }}>
                <h1 style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer', fontFamily: "Inter", fontWeight: 600, fontSize: 18, backgroundColor: '#36454f', padding: "4px 8px", borderRadius: 10, color: "#efeee9" }} onClick={() => { setShowModal(false); setToEdit(false); setTaskInput('') }}>X</h1>
                <h1 style={{ fontFamily: "Inter", color: "#36454f", fontWeight: 500, marginBottom: 10 }}>Task</h1>
                <input type='text' placeholder='Add Task...' value={taskContent} onChange={(e) => { setTaskContent(e.target.value) }} style={{ fontFamily: "Inter", padding: 10, backgroundColor: "#36454f", borderRadius: 10, border: 'none', color: '#efeee9' }} />
                <button style={{ padding: 10, fontFamily: "Inter", borderRadius: 10, border: 'none', backgroundColor: "#36454f", marginLeft: 10, color: '#efeee9', cursor: "pointer" }} onClick={()=>{toedit?(handleEditSave()):(handleSave())}}>{toedit ? ("Edit") : ("Add")} Task</button>
            </div>
        </div>
    )
};

export default AddTaskScreen;
