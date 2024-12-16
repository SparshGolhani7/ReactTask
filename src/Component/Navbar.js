import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
       
         <h4><NavLink to={'/'} >Home</NavLink></h4>
            
         <h3><NavLink to={'/Dashboard'}>Dashboard</NavLink></h3>


         <h3><NavLink to={'/Expense'}>Expense</NavLink></h3>
         <h3><NavLink to={'/Map'}>Map</NavLink></h3>
         
          
    </nav>
  )
}

export default Navbar
