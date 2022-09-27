import React from 'react';
import './App.css';
import Table from './pages/table';
import './styles/filterByname.css'
import './styles/filterComparison.css'
import './styles/filterSelected.css'
import './styles/ordenedFilter.css'
import './styles/master.css'
import MyContextProvider from './context/contextProvider';

function App() {
  return (
    <MyContextProvider>
      <Table />
    </MyContextProvider>
  );
}

export default App;
