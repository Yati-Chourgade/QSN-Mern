//import { set } from 'mongoose'
import React, {useState,useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import logo3 from "../images/logo3.JPG"
import { UserContext } from '../App'
import Cookies from "js-cookie"


const Login = () => {

    const {visible, setVisible}= useContext(UserContext)


    const history = useHistory()
    const [email,setEmail]= useState('')
    const [password, setPassword] = useState('')

    const loginUser = async(e)=>{
        e.preventDefault()

        const res = await fetch('/signin',{
            method: "POST",
            headers:{
                "Content-Type":"application/json"

            }, 
            body:JSON.stringify({
                email,
                password

            })

        })

        const data = await res.json()

        if(res.status===400 || !data){
            window.alert("Invalid Credentials");
            // setVisible('false');
            Cookies.set('Logged', "false");
            
           }else{
            debugger
            
            // dispatch({type:"USER" , payload:true})
            // setVisible('true');
            Cookies.set('Logged', "true");
            window.alert("Login Successful")   
            history.push("/")
           }


    }

  return (
    <>

<section className="sign-in">
            <div className="container mt-5">
                <div className='sign-in-content'>
                    <div >
                            <figure className='sign-in-image'>
                                <img  className='sign-in-img' src={logo3} alt="regi pic"/>
                            </figure>

                            <NavLink to="/Signup" className="sign-up-image-link">Create an Account</NavLink>

                    </div>
                    <div className='sign-in-form'>
                        <h2 className='form-title'>Login</h2>
                        <form method ="POST" className='register-form' id="register-form">

                           

                            <div className='form-group'>
                                <label htmlFor='email'>
                                <i class="zmdi zmdi-email"></i>
                                </label> 
                                <input type="email" name="email" id="email" autoComplete='off' 
                                value ={email}
                                onChange={(e)=> setEmail(e.target.value)}
                                placeholder="Your Email"/>
                                    
                            </div> 

                            <div className='form-group'>
                                <label htmlFor='password'>
                                <i class="zmdi zmdi-lock"></i>
                                </label> 
                                <input type="password" name="password" id="password" autoComplete='off' 
                                value ={password}
                                onChange={(e)=> setPassword(e.target.value)}
                                placeholder="Your Password"/>
                                    
                            </div> 

                            <div className="form-group form-button">
                                <input type="submit" name="signin" id="signin" className='form-submit' value="Login"
                                onClick={loginUser}
                                />

                            </div>
                        </form>
                        </div>
                    </div>    
                </div>
           
      </section>
    </>
      
    
  )
}

export default Login
