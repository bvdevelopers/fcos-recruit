import React, { useEffect, useRef,useState } from 'react';
import './Layout.css';
import { useLocation } from 'react-router-dom'
import { Outlet, useNavigate } from 'react-router-dom';
import { newtab, rmtab } from '../../redux/tabSlice';
import { UseSelector, useSelector, useDispatch } from 'react-redux'
import { addForm } from '../../redux/formSlice';


function Layout() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState();
  const currentPath = location.pathname;
  const segment = currentPath.substring(1);
 
 
let [navState,setNavStste]=useState({isNavOpened:true})

  // useEffect(() => {
  //   setCurrentTab(segment);
  // }, [currentPath]);

  useEffect(() => {
    navigate("/")
  }, [])

  const navigate = useNavigate();
  const redux = useSelector((state) => state)
  const tabsdata = redux.tab;
  const [menuIcon, setMenuIcon] = useState('&#9776;');
  


  function chtab(tb) {
    // console.log(tb.target.value);
    navigate(`/${tb.target.value}`);
  }
  function cuttab(e, index) {
    const value = e.target.parentElement.textContent;
    dispatch(rmtab(index));

    const news = value.slice(0, -1);
    // console.log(news);

    if (tabsdata.length === 0 || index < 0) {
      navigate('home');
    }
    else {
      console.log(index)
      const tab = tabsdata[index + (index > 0 ? -1 : 1)];
      console.log(tab)
      if (tab !== undefined) {
        if (tab.startsWith("form")) {
          console.log("in form/")
          const id = tab.substring(tab.length - 5);
          console.log('extracted id', id);
          navigate(`form/${id}`);
        }
        else {
          navigate(`/${tab}`);
        }
      }
      else {
        navigate('home');
      }
    }

  }


  function handlemenu(menu) {

    if (menu === "form") {
      const randomNumber = Math.floor(Math.random() * (100000 - 10000 + 1)) + 10000;
      const menus = `${menu}/${randomNumber}`
      menu = menu + "/" + randomNumber
      dispatch(addForm(randomNumber));
      dispatch(newtab(menu));

      navigate(`/${menus}`)

    }
    else {
      if (redux.tab.includes(menu)) {
        navigate(`/${menu}`);
      }
      else {
        dispatch(newtab(menu));
        navigate(`/${menu}`);
      }

    }
  }


  function opennav() {
    
    // const a = document.getElementById("sidenav");
    if (navState.isNavOpened) {
      setMenuIcon('&#x2716;');
      // a.style.width = "150px";
      setNavStste({isNavOpened:false,navMargin:"0",navWidth:"150"})

    }
    else {
      // a.style.width = "0px";
      setNavStste({isNavOpened:true,navMargin:"-100",navWidth:"0"})
      setMenuIcon('&#9776;');
      
    }
  }

  console.log("isNavOpened ",navState.isNavOpened)
console.log("navSate ",navState)

  return (
    <div className="main">

      <div className="sidebar side-bar" id="sidenav" style={{width:`${navState?.navWidth}px`,marginLeft:`${navState?.navMargin}px`}}>
        <div className="btncont">
          <h1>FCOS</h1>
          <button className="menu" name='home' onClick={() => handlemenu("home")} >HOME</button>
          <br />
          <button className="menu" name='form' onClick={() => handlemenu("form") } >FORM</button>
          <br />
          <button className="menu" name='table' onClick={() => handlemenu("table")}>TABLE</button>
        </div>
      </div>

      <div className="content">
        <div className="header"> {/*nav-bar*/}
          <span className="menu" id="menubtn" onClick={opennav} dangerouslySetInnerHTML={{ __html: menuIcon }}></span>
          {redux.tab.map((tab, index) => (
            // console.log("after remove",tab.menu,"index",index),
            <div className={tab === currentTab ? "activetab" : "tabs"}>
              <button onClick={chtab} value={tab} className="tabs">{tab}</button>
              <span name="namu" onClick={(e) => cuttab(e, index)} className="tabs" value={tab}>&#x2716;</span>
            </div>
          ))}

        </div>
        <div className="body"><Outlet /></div>
      </div>
    </div>
  );
}
export default Layout;