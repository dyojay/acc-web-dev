import RoleAssigned from "./RoleAssigned";
import ProjectList from "./ProjectList";
import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary.tsx";
import TaskList from "./TaskList.tsx";

export default function DashBoard() {
    return (
        <>
            <Header/>
            <Routes>
                <Route path='/' element={<ProjectList />} />
                <Route
                    path="/projects"
                    element={<ProjectList />}
                    errorElement={<ErrorBoundary />}
                />

            <Route path='/roles' element={<RoleAssigned />} />

                <Route path="/tasks" element={<TaskList />} />

            </Routes>
        </>
    );
}