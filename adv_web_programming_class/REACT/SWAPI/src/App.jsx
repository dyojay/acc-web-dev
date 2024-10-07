import * as React from 'react';
import './App.css';
import { Button, Stack } from '@mui/material';
import Table from './components/Table';
import {useState} from "react";

function App() {
  const [showTable, setShowTable] = useState(false);
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const handleSubmit = () => {
    setShowTable(true);
    setFetchTrigger(prev => prev + 1);
  };
  
  const handleReset = () => {
    setShowTable(false);
    setFetchTrigger(0);
  };


  
  return (
    <div className='app-background'>
      
        <h1>SWAPI</h1>
        <h2>Star Wars API</h2>
       <div>
       <Stack spacing={2} direction="row" justifyContent="center">
        <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
        <Button variant="contained" color="warning" onClick={handleReset}>Reset</Button>
      </Stack>
    </div>
    {showTable && <Table fetchTrigger={fetchTrigger} />}
    </div>
  );
}

export default App;