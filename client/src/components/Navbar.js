import React, {useContext, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import {NavLink ,Link} from "react-router-dom"
import nav from "../images/nav.png"
import Cookies from "js-cookie"

import { UserContext } from '../App'

const Navbar = () => {
  //const{visible} = useContext(UserContext)
  const temp = Cookies.get('Logged') ? Cookies.get('Logged') : 'false'
  const [visible, setVisible] = useState(temp)

  console.log('state=',visible);

  const RenderMenu = ()=>{
    if(visible === "true"){
      return(
        <>

      <li className="nav-item active">
        <NavLink className="nav-link" to="/">Home </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/Dashboard">Dashboard</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/logout">Logout</NavLink>
      </li>


        </>
      )
    } else{
      return(
        <>
        <li className="nav-item active">
        <NavLink className="nav-link" to="/">Home </NavLink>
      </li>
      
      <li className="nav-item">
        <Link className="nav-link" to="/login">Login</Link>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/signup">Registration</NavLink>
      </li>
      {/* <li className="nav-item">
        <NavLink className="nav-link" to="/Dashboard">Dashboard</NavLink>
      </li> */}
      {/* <li className="nav-item">
        <NavLink className="nav-link" to="/logout">Logout</NavLink>
      </li> */}

        </>
      )

    }

  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light" id='nav1'>
            <NavLink className="navbar-brand" to="#">QSN BNK
            <img src={nav} alt ="logo"/>
            </NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ml-auto">
     
     <RenderMenu/>
   
    </ul> 
  </div>
</nav>
    </>
  )
}

export default Navbar
