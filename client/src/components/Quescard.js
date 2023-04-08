import React, { useEffect, useState } from 'react'
import Pdf from './Pdf'
import jsPDF from "jspdf"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


const Quescard = () => {

  const [userDataq, setUserDataq] = useState([])
  const [que, setQue] = useState([])

  const [open, setOpen] = React.useState(false);
  const callQuesPage = async () => {
    try {
      const resq = await fetch('/quescard', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
      })

      const datap = await resq.json()
      setUserDataq(
        datap.map((n) => {
          return {
            difficulty: n.difficulty,
            qsn: n.qsn,
            subject: n.subject,
            __v: n.__v,
            _id: n._id,
            checked: false
          }
        }));

      console.log(userDataq)

      if (!resq.status === 200) {
        const error = new Error(resq.error)
        throw error
      }

    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    callQuesPage()
  }, [])

  const setIsChecked = (data) => {
    var temp = false;
    if (data.checked === false) {
      temp = true;
    }

    setUserDataq(
      userDataq.map((n) => {
        if (n._id === data._id) {
          return { ...n, checked: temp };
        }
        else {
          return n;
        }

      }));
  }

  const setBtn = () => {
    setQue(userDataq.filter(n => n.checked === true).map(n => { return n }));
    //generatePDF()
    setOpen(true);
  }

  const generatePDF = () => {

    const doc = new jsPDF("p", "pt", "a4")
    doc.html(document.querySelector('#content'), {
      callback: function (pdf) {
        pdf.save("mypdf.pdf")
      }
    })
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div>
        <div style={{marginTop: '20px'}}>
        <Button variant="contained"  onClick={setBtn}>Preview PDF</Button>
          <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
          >
            <AppBar sx={{ position: 'relative' }}>
              <Toolbar>
                <Button autoFocus color="inherit" onClick={handleClose}>
                  CLOSE
                </Button>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                  PDF PREVIEW
                </Typography>
                <Button autoFocus color="inherit" onClick={generatePDF}>
                  SAVE
                </Button>
              </Toolbar>
            </AppBar>
            <Pdf data={que} />
          </Dialog>
        </div>
      </div>
      <div>
        <div className="content-columns">
          <div className="col" id="phy" >
            {userDataq?.filter(userDataq => userDataq.subject === 'Physics').map(filteredSub => (
              <div className="item">
                <div className="sub" >
                  <h4>{filteredSub.subject}</h4>
                  <h6>marks:{filteredSub.difficulty}</h6>
                  <h5>{filteredSub.qsn}</h5>
                </div>
                <div>
                  <input key={filteredSub._id} type="checkbox" checked={filteredSub.checked}
                    onChange={() => setIsChecked(filteredSub)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="col" id="chem" >
            {userDataq?.filter(userDataq => userDataq.subject === 'Chemistry').map(filteredSub => (
              <div className="item">
                <div className="sub" >
                  <h4>{filteredSub.subject}</h4>
                  <h6>marks:{filteredSub.difficulty}</h6>
                  <h5>{filteredSub.qsn}</h5>
                </div>
                <div>
                  <input key={filteredSub._id} type="checkbox" checked={filteredSub.checked}
                    onChange={() => setIsChecked(filteredSub)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="col" id="maths" >
            {userDataq?.filter(userDataq => userDataq.subject === 'Maths').map(filteredSub => (
              <div className="item">
                <div className="sub" >
                  <h4>{filteredSub.subject}</h4>
                  <h6>marks:{filteredSub.difficulty}</h6>
                  <h5>{filteredSub.qsn}</h5>
                </div>
                <div>
                  <input key={filteredSub._id} type="checkbox" checked={filteredSub.checked}
                    onChange={() => setIsChecked(filteredSub)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Quescard
