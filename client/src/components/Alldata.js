// import React, { useState } from 'react'
// // import Ques from '../../../server/model/ques'
// import Navbar2 from './Navbar2'
// import Quescard from './Quescard'

// const uniqueList = [
//   ...new Set(
//   Ques.map((curElem)=>{
//   return curElem.category
// })
// ),
// "All",
// ]


// const Alldata = () => {

//    const [quesData, setquesData]= useState(Ques)
//    const [quesList, setquesList]=useState(uniqueList)

//    const filterItem=(category)=>{

//     if(category=="All"){
//       setquesData(Ques)
//       return
//     }

//    const updatedList = Ques.filter((curElem)=>{
//       return curElem.category===category
//     })
//    setquesData(updatedList) 
//   }
//   return (
//     <>
//     <Navbar2 filterItem={filterItem} quesList={quesList} />
//      <Quescard quesData={quesData}/>
//     </>
//   )
// }

// export default Alldata
