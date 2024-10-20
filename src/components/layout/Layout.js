import { Outlet,useNavigate, Link } from 'react-router-dom';
import logo from '../../img/logo.ico';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Navbar, Nav, Container } from 'react-bootstrap';
import {FaSignOutAlt } from 'react-icons/fa'



function Layout() {
  const navigate=useNavigate();
  const logout=()=>
  {
    if(window.confirm("Are you sure, you want to logout"))
    {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    navigate("/login");
    // window.location.href = "/login";
    }
  }
  return (
    <div className="main">
     <Navbar className='nav' expand="lg">
      <Container>
        <Navbar.Brand href="https://www.fcos.in/"><img src={logo} height={50} width={80} alt='logo'/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='toggle'/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className='menus'as={Link} to="/home">Home</Nav.Link>
            <Nav.Link as={Link} to="/form" className='menus'>Form</Nav.Link>
            <Nav.Link as={Link} to="/table" className='menus'>Table</Nav.Link>
            <Nav.Link as={Link} to="/tenderform" className='menus'>Tender Form</Nav.Link>
            <Nav.Link as={Link} to="/filteredCandidates" className='menus'>Filter View</Nav.Link>
          </Nav>
           {/* Add logout icon here */}
      <Nav className="ms-auto">
        {/* <Nav.Link href="/logout" className='menus'> */}
          <FaSignOutAlt onClick={logout} size={24} />
        {/* </Nav.Link> */}
      </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
<br></br>
      <div className="body"><Outlet /></div>
    </div>

  );
}

export default Layout;
