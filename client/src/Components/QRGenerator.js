import React, { useEffect, useState } from "react";
import {QRCodeCanvas } from 'qrcode.react';
import { useCookies } from "react-cookie";
import Navbar from "../Components/Navbar";
import ReactSwitch from "react-switch";
import "../CSS/QRGenerator.css";
import Logo from "../images/wigglesLogo.png";

export default function QRGenerator() {
  const [cookies] = useCookies();
  const userID = cookies.userID;
  const [checked, setChecked] = useState(false);

  const [name, setName] = useState("");
  const [contactNumber,setContactNumber] = useState("")
  const [alternateNumber,setAlternateNumber] = useState("")
  const [message,setMessage] = useState("")

  const handleChange = (val) => {
    setChecked(val);
  };

  useEffect(()=>{
    
      const fetchData = async () => {
        try{
        const response = await fetch("http://localhost:3001/profiledata", {
        method: "POST",
        body: JSON.stringify({
          userID,
        }),
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      })
      let data = await response.json();
      if (data.status === "ok") {
        setName(data.foundUser.name);
      } 
    }catch(err){
      console.log(err)
    }
    
  };
  fetchData();

  },[userID])

  useEffect(()=>{
    const fetchData = async() =>{
      try{
        const response = await fetch("http://localhost:3001/qrData", {
        method: "POST",
        body: JSON.stringify({
          userID,
        }),
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      })
      let data = await response.json();
      if (data.status === "ok") {
        setContactNumber(data.foundUser.contactNumber);
        setAlternateNumber(data.foundUser.alternateNumber);
        setMessage(data.foundUser.message)
      } 
    }catch(err){
      console.log(err)
    }
    };
    fetchData();
  },[userID])


  const handleSubmit = async (event) =>{
    event.preventDefault();

    try{
    
        const response = await fetch("http://localhost:3001/qr-code",{
          method:"POST",
          body: JSON.stringify({
            contactNumber,
            alternateNumber,
            message,
          }),
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
        })
  
        console.log(response);
        const data = await response.json();
      
    }catch(err){
      console.log(err);
    }
  }

  const downloadQRCode = () => {
    const qrCodeURL = document.getElementById('qrCodeEl')
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    console.log(qrCodeURL)
    let aEl = document.createElement("a");
    aEl.href = qrCodeURL;
    aEl.download = "QR_Code.png";
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
  }

  return (
    { userID } && (
      <>
        <Navbar />
        <div className="qrGeneratorWindow">
          <div className="qrGeneratorContainer">
            <div className="msgContainerLeft">
              <div className="qrGeneratorHeader">Wiggles</div>
              <div className="messageTitle">
                <h2>Message</h2>
                <div className="lostPet">
                  <span>Pet lost?</span>
                  <ReactSwitch
                    checked={checked}
                    onChange={handleChange}
                    onColor="#fed3a3"
                    onHandleColor="#ff8400"
                    handleDiameter={25}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={18}
                    width={48}
                    className="react-switch"
                    id="material-switch"
                  />
                </div>
              </div>
              <form action="" className="msgForm" onSubmit={handleSubmit}>
                <label id="contactno" >
                  <input
                    className="inputField"
                    type="number"
                    name="contact no"
                    value={contactNumber}
                    placeholder="Contact Number"
                    onChange = {(event)=>{
                      setContactNumber(event.target.value)
                    }}
                  />
                </label>
                <label id="alternateContactno" >
                  <input
                    className="inputField"
                    type="number"
                    name="contact no"
                    value={alternateNumber}
                    placeholder="Alternate Contact Number"
                    onChange = {(event)=>{
                      setAlternateNumber(event.target.value)
                    }}
                  />
                </label>
                <label id="message" >
                  <textarea
                    className="inputField"
                    id="textarea"
                    type="text"
                    name="message"
                    value={message}
                    rows={7}
                    placeholder="Drop your message here."
                    onChange = {(event)=>{
                      setMessage(event.target.value)
                    }}
                  />
                </label>

                <button className="uploadMsg" type="submit">
                  Submit
                </button>
              </form>
            </div>
            <div className="qrContainerRight">
              <div className="userImg"></div>
              <div className="userName">{name}</div>
              <div
                className="userQR"
                style={{
                  height: "auto",
                  margin: "0 auto",
                  maxWidth: 64,
                  width: "100%",
                }}
              >
                <QRCodeCanvas 
                  id="qrCodeEl"
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={"http://localhost:3000/lost/" + userID}
                  viewBox={`0 0 256 256`}
                />
              </div>
              <div className="infoTxt">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Aspernatur voluptates facilis quae ad id ratione.
              </div>
              <div className="viewSaveBtn">
                <button className="viewQR">View QR</button>
                <button className="downloadQR" onClick={downloadQRCode}>Save QR</button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}
 