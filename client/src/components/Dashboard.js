import React from 'react'
import {NavLink} from "react-router-dom"
import Queform from './Queform'
import Quescard from './Quescard'



const Dashboard = () => {
  
  return (
    <>
      
<div className="site-wrap">

<nav className="site-nav">

  <div className="name">
    QuestionBank

  </div>

  <ul>
    <li>
    <Queform />
    </li>
    <li><NavLink className="nav-link" to="/">Home </NavLink></li>
   
  </ul>

</nav>

<main>

  <header>
    <h1 className="title">DASHBOARD</h1>

    <nav className="nav-tabs" id="nav-tabs">
      <NavLink to="#0" className="active">
        Physics
        {/* <span></span> */}
      </NavLink>
      <NavLink to="#0">
        Chemistry   
      </NavLink>
      <NavLink to="#0">
        Mathematics
      </NavLink>
    </nav>
  </header>

   <div>
   <Quescard/>
   </div> 
   
</main>

</div>
    </>
  )
}

   
export default Dashboard
