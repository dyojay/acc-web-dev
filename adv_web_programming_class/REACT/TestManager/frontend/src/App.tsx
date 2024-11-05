import { BrowserRouter } from 'react-router-dom';
import DashBoard from './components/DashBoard';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
    return (
        <BrowserRouter>
            <ErrorBoundary>
                <DashBoard />
            </ErrorBoundary>
        </BrowserRouter>
    );
}

export default App;