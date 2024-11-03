
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import DashBoard from "./components/DashBoard.tsx";
import TaskList from "./components/TaskList.tsx";
import ProjectList from "./components/ProjectList.tsx";
// import RoleAssigned from "./components/RoleAssigned.tsx";
// import ProjectList from "./components/ProjectList.tsx";

function App() {

  return (
    <Router>
    {/*<TaskList/>*/}
    {/* <DashBoard/>*/}
      <ProjectList/>
    </Router>
  )
}

export default App
