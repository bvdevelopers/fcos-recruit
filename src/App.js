import { Provider } from 'react-redux';
import Store from './redux/Store'; // Import your Redux store
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Form from './components/form/Form';
import Table from './components/table/Table';
import Home from './components/home/home';
import TenderForm from './components/tender_form/TenderForm';
import ViewForm from './components/table/ViewForm';
import FilteredCandidates from './components/FilteredCandidates/FilteredCandidates';
import Login from './Login'; // Import your Login component
import "./bootstrap/bootstrap.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useEffect } from 'react';

// Authentication check function
const isAuthenticated = () => {
  return localStorage.getItem("authToken") !== null || sessionStorage.getItem("authToken") !== null;
};

// Protected Route Component
const ProtectedRoute = ({ redirectPath = '/login' }) => {
  return isAuthenticated() ? <Outlet /> : <Navigate to={redirectPath} />;
};

function App() {
  useEffect(() => {
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <Provider store={Store}>
      <Router>
        <Routes>
          {/* Public route for login */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route path="/" element={<Layout />}>
            {/* Protect all routes under Layout */}
            <Route element={<ProtectedRoute />}>
              <Route path="home" element={<Home />} />
              <Route path="form" element={<Form />} />
              <Route path="table" element={<Table />} />
              <Route path="tenderform" element={<TenderForm />} />
              <Route path="/viewForm/:id" element={<ViewForm />} />
              <Route path="/filteredCandidates" element={<FilteredCandidates />} />
            </Route>
          </Route>
          
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
