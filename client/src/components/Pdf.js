import React, { useState } from 'react'

const Pdf = (props) => {

  return (
    <div id="content" style={{ width: "600px" }}>
      <h1 style={{width: '-webkit-fill-available'}}>Questions</h1>
      <ol>
        {props.data?.map(n => (
          <div key={n._id} class="pdf-title" >
            
            <li>
              <div id="slot">
                <span id="sub">Subject : {n.subject}</span>
                <span id="marks">Marks : {n.difficulty}</span>
                <div id="qsn">
                  {n.qsn}
                </div>
              </div>
            </li>
          </div>
        ))}
      </ol>
    </div>
  )
}


export default Pdf
