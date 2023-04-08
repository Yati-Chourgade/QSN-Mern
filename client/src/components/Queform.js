import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'

const Queform = () => {


  const history = useHistory()
  const[userq,setUser] = useState({
      qsn:"", subject:"", difficulty:""
  })


  let name,value
  const handleInputsi=(e)=>{
      console.log(e)
      name =e.target.name
      value=e.target.value

      setUser({...userq, [name]:value})
      
  }
const PostQues = async (e)=>{
  e.preventDefault()

   if (checkForBadWord(userq)) {
      console.log('Bad word found');
      window.alert('Bad word found')
    } else{
        const {qsn,subject,difficulty }= userq

 const resp = await fetch('/queform',{
  method:"POST",
  headers:{
      "Content-Type":"application/json"
  },
  body:JSON.stringify({
  qsn,subject,difficulty

  })
 })
 const datae = await resp.json()

 if(resp.status === 422 || !datae){
  window.alert(" No Submission ")
  console.log("No Submission")
 }else{
  window.alert("Submission Successful")
  console.log("Submission Successful")

  history.push("/dashboard")
   }
  }
}

  return (
    <>

      <button id="togglebutton" type="Text" data-toggle="modal" data-target="#exampleModalCenter">
        Add Question
      </button>


      <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Add Question</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form method="POST">
                <select className="select"name='subject' placeholder="Subject" 
                 value={userq.subject}
                 onChange={handleInputsi} >
                  <option value="Physics">Physics</option>
                  <option value="Maths">Maths</option>
                  <option value="Chemistry">Chemistry</option>
                </select>
                <br /><br />



                <select className="select" name='difficulty' placeholder="Difficulty level"
                 value={userq.difficulty}
                 onChange={handleInputsi} >
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="5">Five</option>
                </select>
                <br /><br />

                <div className="form-outline">
                  <textarea className="form-control" name="qsn" id="textArea" rows="4" 
                   value={userq.qsn}
                   onChange={handleInputsi}></textarea>
                  <label className="form-label" >Type Question Here</label>
                </div>

                <input type="submit" name="submit" value="submit"  onClick={PostQues}/>

              </form>



            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              {/* <button type="button" class="btn btn-primary">Save changes</button> */}
            </div>
          </div>
        </div>
      </div>



    </>
  )
  }

export default Queform
