import React from 'react';
import './App.css';
import Table from './components/table';
import MyContextProvider from './context/contextProvider';

function App() {
  return (
    <MyContextProvider>
      <Table />
    </MyContextProvider>
  );
}

export default App;
