import { useEffect, useState } from 'react';
import './App.css';
import Board from './components/Board';

const App = () => {

  const [showDropDown, setShowDropDown] = useState(false)
  const [newProject, setNewProject] = useState("")
  const [projects, setProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState('')

  useEffect(() => {
    const savedProjects = localStorage.getItem('projects')
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects))
    }
  }, [])

  const handleCreateNewProject = () => {
    if (newProject) {
      const isProjectExists = projects.some(project => project === newProject);
      if (isProjectExists) {
        alert('Project with this name already exists!');
        return;
      }
      const newList = [...projects, newProject]
  
      localStorage.setItem("projects", JSON.stringify(newList))
      setProjects(newList)
      setNewProject('')
    }
  }

  const deleteProject = (id) => {
    const newList = projects.filter((_, index) => index !== id);
    localStorage.setItem("projects", JSON.stringify(newList))
    setProjects(newList)
    setSelectedProject('')
  }

  const handleProjectClick = (pname) => {
    setSelectedProject(pname)
  }

  return (
    <div className="page">
      <div className='navbar'>
        <h1 className='navheading'>Project Manager</h1>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} onMouseEnter={() => { setShowDropDown(true) }} onMouseLeave={() => { setShowDropDown(false) }} >
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}  >
            <h1 className='navheading'>{selectedProject ? (selectedProject) : ("DemoProject")}</h1>
            <img alt='dropdown' src={require('./assets/down-arrow.png')} style={{ width: 24, height: 24, marginLeft: 10, marginTop: 5, cursor: 'pointer' }} />
          </div>
          {showDropDown && (
            <div style={{ width: 300, backgroundColor: '#283238', position: 'absolute', top: 70, right: 20, padding: 10, borderRadius: 10, zIndex: 10 }}>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                <input placeholder='Project Name...' type='text' style={{ backgroundColor: "#efeee9", border: "none", borderRadius: 10, fontSize: 14, padding: 5, height: 40 }} value={newProject} onChange={(e) => { setNewProject(e.target.value) }} />
                <button style={{ backgroundColor: "#000000", borderRadius: 10, fontSize: 10, fontFamily: "Inter", border: "none", color: "#efeee9", padding: 10, height: 40, cursor: 'pointer' }} onClick={handleCreateNewProject}>Create New Project</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', marginTop: 10 }}>
                {projects.length > 0 && projects.map((project, index) => {
                  return (
                    <div key={index} style={{ display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }}>
                      <p style={{ cursor: 'pointer', color: '#efeee9', fontSize: 16, marginTop: 5, marginBottom: 5, padding: 5, fontFamily: "EB Garamond" }} onClick={() => { handleProjectClick(project) }}>{project}</p>
                      <img src={require('./assets/bin.png')} alt='bin' style={{ width: 20, height: 20, cursor: 'pointer' }} onClick={() => { deleteProject(index) }} />
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      <Board projectname={selectedProject} />
    </div>
  );
}

export default App;
