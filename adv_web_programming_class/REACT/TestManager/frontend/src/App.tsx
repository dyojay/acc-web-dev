import './App.css';
import Header from "./components/Header.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProjectList from "./components/ProjectList.tsx";
import ModifyDetail from "./components/ModifyDetail.tsx";
import Update from "./components/Update";
import { ThemeProvider } from '@mui/material/styles';
import Theme from "./components/Theme.tsx"

function App() {
    return (
        <ThemeProvider theme={Theme}> {/* Wrap your app with ThemeProvider */}
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/' element={<ProjectList />} />
                    <Route path="/projects" element={<ProjectList />} />
                    <Route path="/update" element={<Update />} />
                    <Route path="/modify" element={<ModifyDetail />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
