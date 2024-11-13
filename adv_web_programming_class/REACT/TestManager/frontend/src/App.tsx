
import './App.css'
import Header from "./components/Header.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProjectList from "./components/ProjectList.tsx";
import ModifyDetail from "./components/ModifyDetail.tsx";

function App() {

    return (
        <>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path='/' element={<ProjectList />} />

                    <Route
                        path="/projects"
                        element={<ProjectList />}
                    />

                    <Route
                        path="/modify"
                        element={<ModifyDetail />}
                    />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
