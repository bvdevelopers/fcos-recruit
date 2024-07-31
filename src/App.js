import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import Store from './redux/Store'; // Import your Redux store
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Form from './components/form/Form';
import Table from './components/table/Table';
import Home from './components/home/home';
import Tender_Form from './components/tender_form/Tender_Form'
import View_form from './components/table/View_form';
import FilteredCandidates from './components/FilteredCandidates/FilteredCandidates';
import "./App.css"

function App() {

  return (
    <Provider store={Store}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="home" element={<Home />} />
            <Route path="form" element={<Form />} />
            <Route path="table" element={<Table />} />
            <Route path='tenderform' element={<Tender_Form/>} />
            <Route path="/viewForm/:id" element={<View_form />} />
            <Route path="/filteredCandidates" element={<FilteredCandidates />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
