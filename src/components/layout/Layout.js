import React, { useEffect, useState } from 'react';
import './Layout.css';
import { useLocation } from 'react-router-dom';
import { Outlet, useNavigate } from 'react-router-dom';
import { newtab, rmtab } from '../../redux/tabSlice';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../../img/logo.ico';

function Layout() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState();
  const currentPath = location.pathname;
  const segment = currentPath.substring(1);

  const [navState, setNavStste] = useState({ isNavOpened: true });

  const navigate = useNavigate();
  const redux = useSelector((state) => state);
  const tabsdata = redux.tab;
  const [menuIcon, setMenuIcon] = useState('&#x2716;');

  useEffect(() => {
    setCurrentTab(segment);
  }, [segment]);

  // useEffect(() => {
  //   navigate("home");
  // }, [navigate]);

  function chtab(tb) {
    navigate(`/${tb.target.value}`);
  }

  function cuttab(e, index) {
    dispatch(rmtab(index));

    if (tabsdata.length === 0 || index < 0) {
      navigate('home');
    } else {
      const tab = tabsdata[index + (index > 0 ? -1 : 1)];
      if (tab !== undefined) {
        navigate(`/${tab}`);
      } else {
        navigate('home');
      }
    }
  }

  function handlemenu(menu) {
    if (redux.tab.includes(menu)) {
      navigate(`/${menu}`);
    } else {
      dispatch(newtab(menu));
      navigate(`/${menu}`);
    }
  }

  function opennav() {
    const a = document.getElementById("sidenav");
    if (navState.isNavOpened) {
      setMenuIcon('&#x2716;');
      a.style.width = "200px";
      a.style.display = "block";
      setNavStste({ isNavOpened: false, navMargin: "0", navWidth: "200" });
    } else {
      a.style.display = "none";
      setNavStste({ isNavOpened: true, navMargin: "-100", navWidth: "0" });
      setMenuIcon('&#9776;');
    }
  }

  return (
    <div className="main">
      <aside className='sidebar' id="sidenav">
        <img src={logo} alt="Tender" className="menu-logo" />
        <button onClick={() => handlemenu("home")} className="menu">HOME</button>
        <button onClick={() => handlemenu("form")} className="menu">FORM</button>
        <button onClick={() => handlemenu("table")} className="menu">TABLE</button>
        <button onClick={() => handlemenu("tenderform")} className="menu">TENDER</button>
        <button onClick={() => handlemenu("filteredCandidates")} className="menu">FILTER VIEW</button>
      </aside>

      <div className="content">
        <div className="header">
          <div style={{ overflowX: "auto", display: "flex", width: "100%" }}>
            <span className="menu" id="menubtn" onClick={opennav} dangerouslySetInnerHTML={{ __html: menuIcon }}></span>
            {redux.tab.map((tab, index) => (
              <div className={tab === currentTab ? "activetab" : "tabs"} key={index}>
                <button onClick={chtab} value={tab} className="tabs">{tab}</button>
                <span onClick={(e) => cuttab(e, index)} className="tabs" value={tab}>&#x2716;</span>
              </div>
            ))}
          </div>
        </div>
        <div className="body"><Outlet /></div>
      </div>
    </div>
  );
}

export default Layout;
