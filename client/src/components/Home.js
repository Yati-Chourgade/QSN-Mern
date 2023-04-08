import React ,{useEffect, useState} from 'react'


const Home = () => {
  const[userName, setUserName] = useState('')
  const [show, setShow]= useState(false)
  

  const userHomePage =async()=>{
    try{
      const res = await fetch('/getdata',{
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        }
      })

      const data =await res.json()
      console.log(data)
      setUserName(data.name)
      setShow(true)

      if(!res.status===200){
        const error = new Error(res.error)
        throw error
      }

    }catch(err){
      console.log(err)

    }
  }
  useEffect(()=>{
    userHomePage()
  },[])

  return (
    <>
    <div className="container">
      <div className="box"></div>
      <div className="box overlay"></div>
      <h1 className='head'>WELCOME </h1>
      <h1 id="test">{userName}</h1>
      <h2 id="home">{show ?'Go to Dashboard to Add , View and Generate Questions': 'Login to Access Dashboard'}</h2>
    </div>

    </>
  )
}

export default Home
