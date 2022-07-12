import React from 'react'
import { NavLink } from 'react-router-dom'
import './main.css'


function Navbar() {
  return (
    <div>
        <nav className="main-menu">
            <ul>
                <li>
                    <NavLink to='/'>
                        <i className="fa fa-home fa-2x"></i>
                        <span className="nav-text">Managment Panel</span>
                    </NavLink>

                </li>

                
                <li>
                    <NavLink to='/table'>
                       
                        <i className="fa fa-table fa-2x"></i>
                        <span className="nav-text"> Table  </span>
                    </NavLink>

                </li>
                <li>
                    <NavLink to='/totalOrders'>
                       
                        <i className="fa fa-table fa-2x"></i>
                        <span className="nav-text"> TotalOrders  </span>
                    </NavLink>

                </li>
                

            </ul>

          
        </nav>
  
     
  
    </div>
  )
}

export default Navbar