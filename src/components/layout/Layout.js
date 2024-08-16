import React, { useEffect, useState } from 'react';
import './Layout.css';
import { useLocation } from 'react-router-dom'
import { Outlet, useNavigate } from 'react-router-dom';
import { newtab, rmtab } from '../../redux/tabSlice';
import {  useSelector, useDispatch } from 'react-redux'
import logo from '../../img/logo.ico';

function Layout() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState();
  const currentPath = location.pathname;
  const segment = currentPath.substring(1);


  let [navState, setNavStste] = useState({ isNavOpened: true })

  useEffect(() => {
    setCurrentTab(segment);
  }, [currentPath]);

  useEffect(() => {
    navigate("home")
  }, [])

  const navigate = useNavigate();
  const redux = useSelector((state) => state)
  const tabsdata = redux.tab;
  const [menuIcon, setMenuIcon] = useState('&#x2716;');



  function chtab(tb) {
    // console.log(tb.target.value);
    navigate(`/${tb.target.value}`);
  }
  function cuttab(e, index) {
    const value = e.target.parentElement.textContent;
    dispatch(rmtab(index));

    // const news = value.slice(0, -1);
    // console.log(news);

    if (tabsdata.length === 0 || index < 0) {
      navigate('home');
    }
    else {
      console.log(index)
      const tab = tabsdata[index + (index > 0 ? -1 : 1)];
      console.log(tab)
      if (tab !== undefined) {
        
          navigate(`/${tab}`);
        
      }
      else {
        navigate('home');
      }
    }

  }


  function handlemenu(menu) {


      if (redux.tab.includes(menu)) {
        navigate(`/${menu}`);
      }
      else {
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
      setNavStste({ isNavOpened: false, navMargin: "0", navWidth: "200" })

    }
    else {
      // a.style.width = "0px";
      // a.style.backgroundImage.width = '0px'
      a.style.display="none";
      setNavStste({ isNavOpened: true, navMargin: "-100", navWidth: "0" })
      setMenuIcon('&#9776;');

    }
  }

  console.log("isNavOpened ", navState.isNavOpened)
  console.log("navSate ", navState)

  return (
    <div className="main">
      
      <aside className='sidebar' id="sidenav">
        {/* <p> Menu </p> */}
        <img src={logo} alt="Tender" className="menu-logo" />
        <a href="javascript:void(0)">
          {/* <i class="fa fa-user-o" aria-hidden="true" name='home' onClick={() => handlemenu("home")} ></i>
          Home */}
           <button  class="fa fa-user-o" aria-hidden="true" className="menu" name='home' onClick={() => handlemenu("home")} style={{"--clr":"#8A2BE2"}}><span>HOME</span><i></i></button>
        </a>
        <a href="javascript:void(0)">
          {/* <i class="fa fa-laptop" name='form' onClick={() => handlemenu("form")} aria-hidden="true"></i> */}
          <button class="fa fa-laptop" aria-hidden="true"  className="menu" name='form' onClick={() => handlemenu("form")} >FORM</button>
          {/* Form */}
        </a>
        <a href="javascript:void(0)">
          {/* <i class="fa fa-clone" aria-hidden="true"></i>
          Table */}
          <button class="fa fa-clone" aria-hidden="true" className="menu" name='table' onClick={() => handlemenu("table")} >TABLE</button>
        </a>
        <a href="javascript:void(0)">
          {/* <i class="fa fa-star-o" aria-hidden="true"></i>
          Tender */}
            <button class="fa fa-star-o" aria-hidden="true" className="menu" name='tenderform' onClick={() => handlemenu("tenderform")}>TENDER</button>

        </a>
        <a href="javascript:void(0)">
          {/* <i class="fa fa-trash-o" aria-hidden="true"></i>
          FILTER VIEW */}
          <button class="fa fa-trash-o" aria-hidden="true" className="menu" name='filteredCandidates' onClick={() => handlemenu("filteredCandidates")}>FILTER VIEW</button>
        </a>
      </aside>
{/* 
      <div className="sidebar side-bar" id="sidenav" style={{ width: `${navState?.navWidth}px`, marginLeft: `${navState?.navMargin}px` }}>
        <div className="btncont">
          <h1>FCOS</h1>
          <button className="menu" name='home' onClick={() => handlemenu("home")} style={{"--clr":"#8A2BE2"}}><span>HOME</span><i></i></button>
          <br />
          <button className="menu" name='form' onClick={() => handlemenu("form")} >FORM</button>
          <br />
          <button className="menu" name='table' onClick={() => handlemenu("table")} >TABLE</button>
          <br />
          <button className="menu" name='tenderform' onClick={() => handlemenu("tenderform")}>TENDER</button>
          
          <br />
          <button className="menu" name='filteredCandidates' onClick={() => handlemenu("filteredCandidates")}>FILTER VIEW</button>
        </div>
      </div> */}

      <div className="content">
        <div className="header"> {/*nav-bar*/}
          <div style={{"overflow-x":"auto","display":"flex","width":"100%"}}>
          <span className="menu" id="menubtn" onClick={opennav} dangerouslySetInnerHTML={{ __html: menuIcon }}></span>
          {redux.tab.map((tab, index) => (
            // console.log("after remove",tab.menu,"index",index),
            <div className={tab === currentTab ? "activetab" : "tabs"}>
              <button onClick={chtab} value={tab} className="tabs">{tab}</button>
              <span name="namu" onClick={(e) => cuttab(e, index)} className="tabs" value={tab}>&#x2716;</span>
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