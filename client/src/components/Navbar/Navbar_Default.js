import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import './Navbar_Default.css';
function Navbar(props) {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='my-navbar' data-testid='navbar'>
          <Link to='#' className='my-menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} data-testid='showSideBar'/>
          </Link>
        </div>
        <nav className={sidebar ? 'my-nav-menu active' : 'my-nav-menu' } data-testid='navmenu'>
          <ul className='my-nav-menu-items' onClick={showSidebar}>
            <li className='my-navbar-toggle'>
              <Link to='#' className='my-menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {props.sideBarData.map((item, index) => {
              return (
                <li key={index} className={"my-" + item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span className='my-nav-item-title'>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;