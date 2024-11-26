import { Outlet,useNavigate, Link } from 'react-router-dom';
import logo from '../../img/logo.ico';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Layout.css'


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
  const ContractsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#ffff"} fill={"none"} {...props}>
      <path d="M18 6C17.9531 4.44655 17.7797 3.51998 17.1377 2.87868C16.2581 2 14.8423 2 12.0108 2H8.0065C5.17501 2 3.75926 2 2.87963 2.87868C2 3.75736 2 5.17157 2 8V16C2 18.8284 2 20.2426 2.87963 21.1213C3.75926 22 5.17501 22 8.0065 22H12.0108C14.8423 22 16.2581 22 17.1377 21.1213C17.7797 20.48 17.9531 19.5535 18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20.2419 11.7419L21.419 10.5648C21.6894 10.2944 21.8246 10.1592 21.8969 10.0134C22.0344 9.73584 22.0344 9.41003 21.8969 9.13252C21.8246 8.98666 21.6894 8.85145 21.419 8.58104C21.1485 8.31062 21.0133 8.17542 20.8675 8.10314C20.59 7.96562 20.2642 7.96562 19.9866 8.10314C19.8408 8.17542 19.7056 8.31062 19.4352 8.58104L18.2581 9.7581M20.2419 11.7419L14.9757 17.0081L12 18L12.9919 15.0243L18.2581 9.7581M20.2419 11.7419L18.2581 9.7581" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 19H6L7.25 16.5L8.5 19H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 6H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 10H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );


  const GridTableIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#ffff"} fill={"none"} {...props}>
      <path d="M3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28248 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28248 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.5 8.99976L21.5 8.99976" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2.5 14.9998L21.5 14.9998" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 21.5L16 2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 21.4998L8 2.49976" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );

  const LogoutSquare02Icon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#ffff"} fill={"none"} {...props}>
      <path d="M2.5 12C2.5 7.52163 2.5 5.28245 3.89124 3.89121C5.28249 2.49997 7.52166 2.49997 12 2.49997C16.4783 2.49997 18.7175 2.49997 20.1088 3.89121C21.5 5.28245 21.5 7.52163 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1087C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1087C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7.03662 12.0275L14.0122 12.0275M14.0122 12.0275C14.0122 12.5979 11.857 14.5148 11.857 14.5148M14.0122 12.0275C14.0122 11.4421 11.857 9.56307 11.857 9.56307M17.0366 7.99509V15.9951" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );

  const DashboardSquare01Icon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#ffffff"} fill={"none"} {...props}>
      <path d="M2 18C2 16.4596 2 15.6893 2.34673 15.1235C2.54074 14.8069 2.80693 14.5407 3.12353 14.3467C3.68934 14 4.45956 14 6 14C7.54044 14 8.31066 14 8.87647 14.3467C9.19307 14.5407 9.45926 14.8069 9.65327 15.1235C10 15.6893 10 16.4596 10 18C10 19.5404 10 20.3107 9.65327 20.8765C9.45926 21.1931 9.19307 21.4593 8.87647 21.6533C8.31066 22 7.54044 22 6 22C4.45956 22 3.68934 22 3.12353 21.6533C2.80693 21.4593 2.54074 21.1931 2.34673 20.8765C2 20.3107 2 19.5404 2 18Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 18C14 16.4596 14 15.6893 14.3467 15.1235C14.5407 14.8069 14.8069 14.5407 15.1235 14.3467C15.6893 14 16.4596 14 18 14C19.5404 14 20.3107 14 20.8765 14.3467C21.1931 14.5407 21.4593 14.8069 21.6533 15.1235C22 15.6893 22 16.4596 22 18C22 19.5404 22 20.3107 21.6533 20.8765C21.4593 21.1931 21.1931 21.4593 20.8765 21.6533C20.3107 22 19.5404 22 18 22C16.4596 22 15.6893 22 15.1235 21.6533C14.8069 21.4593 14.5407 21.1931 14.3467 20.8765C14 20.3107 14 19.5404 14 18Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 6C2 4.45956 2 3.68934 2.34673 3.12353C2.54074 2.80693 2.80693 2.54074 3.12353 2.34673C3.68934 2 4.45956 2 6 2C7.54044 2 8.31066 2 8.87647 2.34673C9.19307 2.54074 9.45926 2.80693 9.65327 3.12353C10 3.68934 10 4.45956 10 6C10 7.54044 10 8.31066 9.65327 8.87647C9.45926 9.19307 9.19307 9.45926 8.87647 9.65327C8.31066 10 7.54044 10 6 10C4.45956 10 3.68934 10 3.12353 9.65327C2.80693 9.45926 2.54074 9.19307 2.34673 8.87647C2 8.31066 2 7.54044 2 6Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 6C14 4.45956 14 3.68934 14.3467 3.12353C14.5407 2.80693 14.8069 2.54074 15.1235 2.34673C15.6893 2 16.4596 2 18 2C19.5404 2 20.3107 2 20.8765 2.34673C21.1931 2.54074 21.4593 2.80693 21.6533 3.12353C22 3.68934 22 4.45956 22 6C22 7.54044 22 8.31066 21.6533 8.87647C21.4593 9.19307 21.1931 9.45926 20.8765 9.65327C20.3107 10 19.5404 10 18 10C16.4596 10 15.6893 10 15.1235 9.65327C14.8069 9.45926 14.5407 9.19307 14.3467 8.87647C14 8.31066 14 7.54044 14 6Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
  const TypeCursorIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#ffffff"} fill={"none"} {...props}>
      <path d="M6 16C5.07003 16 4.60504 16 4.22354 15.8978C3.18827 15.6204 2.37962 14.8117 2.10222 13.7765C2 13.395 2 12.93 2 12C2 11.07 2 10.605 2.10222 10.2235C2.37962 9.18827 3.18827 8.37962 4.22354 8.10222C4.60504 8 5.07003 8 6 8M12 16H18C18.93 16 19.395 16 19.7765 15.8978C20.8117 15.6204 21.6204 14.8117 21.8978 13.7765C22 13.395 22 12.93 22 12C22 11.07 22 10.605 21.8978 10.2235C21.6204 9.18827 20.8117 8.37962 19.7765 8.10222C19.395 8 18.93 8 18 8H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 3H9M11 3H9M9 3V21M9 21H7M9 21H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const FilterIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#ffffff"} fill={"none"} {...props}>
      <path d="M8.85746 12.5061C6.36901 10.6456 4.59564 8.59915 3.62734 7.44867C3.3276 7.09253 3.22938 6.8319 3.17033 6.3728C2.96811 4.8008 2.86701 4.0148 3.32795 3.5074C3.7889 3 4.60404 3 6.23433 3H17.7657C19.396 3 20.2111 3 20.672 3.5074C21.133 4.0148 21.0319 4.8008 20.8297 6.37281C20.7706 6.83191 20.6724 7.09254 20.3726 7.44867C19.403 8.60062 17.6261 10.6507 15.1326 12.5135C14.907 12.6821 14.7583 12.9567 14.7307 13.2614C14.4837 15.992 14.2559 17.4876 14.1141 18.2442C13.8853 19.4657 12.1532 20.2006 11.226 20.8563C10.6741 21.2466 10.0043 20.782 9.93278 20.1778C9.79643 19.0261 9.53961 16.6864 9.25927 13.2614C9.23409 12.9539 9.08486 12.6761 8.85746 12.5061Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <div className="main">
     <Navbar className='nav' expand="lg" style={{ borderRadius:'12px',margin:'10px', backgroundColor: '#3d3d3d', boxShadow:'0px 0px 10px 2px' }}>
      <Container>
        <Navbar.Brand href="https://www.fcos.in/"><img src={logo} height={50} width={80} alt='logo'/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='toggle'/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className='menus'as={Link} to="/home"><DashboardSquare01Icon/> Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/form" className='menus'><TypeCursorIcon/>Form</Nav.Link>
            <Nav.Link as={Link} to="/table" className='menus'><GridTableIcon/> Table view</Nav.Link>
            <Nav.Link as={Link} to="/tenderform" className='menus'><ContractsIcon/>   Tender Form</Nav.Link>
            <Nav.Link as={Link} to="/filteredCandidates" className='menus'><FilterIcon/>Filter View</Nav.Link>
          </Nav>
           {/* Add logout icon here */}
      <Nav className="ms-auto" onClick={logout}>
        {/* <Nav.Link href="/logout" className='menus'> */}
          <LogoutSquare02Icon/> Logout
        {/* </Nav.Link> */}
      </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <div className="body"><Outlet /></div>
    </div>

  );
}

export default Layout;
