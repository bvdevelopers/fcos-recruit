import { Provider } from 'react-redux';
import Store from './redux/Store'; // Import your Redux store
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Form from './components/form/Form';
import Table from './components/table/Table';
import Home from './components/home/home';
import TenderForm from './components/tender_form/TenderForm'
import ViewForm from './components/table/ViewForm';
import FilteredCandidates from './components/FilteredCandidates/FilteredCandidates';
import "./App.css";
import "./bootstrap/bootstrap.css"
function App() {

  return (
    <Provider store={Store}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="home" element={<Home />} />
            <Route path="form" element={<Form />} />
            <Route path="table" element={<Table />} />
            <Route path='tenderform' element={<TenderForm/>} />
            <Route path="/viewForm/:id" element={<ViewForm />} />
            <Route path="/filteredCandidates" element={<FilteredCandidates />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
