
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import DashBoard from "./components/DashBoard.tsx";
// import RoleAssigned from "./components/RoleAssigned.tsx";
import ProjectList from "./components/ProjectList.tsx";

function App() {

  return (
    <Router>
        <ProjectList/>
        {/*<RoleAssigned/>*/}
     {/*<DashBoard/>*/}
    </Router>
  )
}

export default App
