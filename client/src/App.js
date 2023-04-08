import './App.css';
import React ,{createContext, useState}from 'react'
import {Route,Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Errorpage from './components/Errorpage'
import Logout from './components/Logout'
import Queform from './components/Queform';
// import { initialState, reducer } from '../src/reducer/UseReducer';
import Quescard from './components/Quescard';




  //Context API
  export const UserContext = createContext()


  const Routing =() =>{
    return (
      <Switch>

      <Route exact path="/">     
        <Home/>
      </Route>


      <Route path="/Dashboard">
        <Dashboard/>
      </Route>

      <Route path="/login">      
        <Login/>
      </Route>
     
      <Route path="/signup">     
        <Signup/>
      </Route>

      <Route path="/logout">     
        <Logout/>
      </Route>

      <Route path="/quescard">
        <Quescard/>
      </Route>

       <Route path="/queform">     
        <Queform/>
      </Route>

      <Route >     
      <Errorpage/>
      </Route>
      </Switch>

    )

  }

  const App = () => {

  // const[state, dispatch] = useReducer(reducer, initialState)
  const [visible, setVisible] = useState('false');
  
  return (  
    <>
      <UserContext.Provider value={{visible, setVisible}}>
        
      <Navbar/>
      <Routing/> 
      </UserContext.Provider>
     
    </>
  )
}

export default App
