import React, { useState } from "react";
import QRCode from "react-qr-code";
import { useCookies } from "react-cookie";
import Navbar from "../Components/Navbar";
import ReactSwitch from "react-switch";
import "../CSS/QRGenerator.css";
import Logo from "../images/wigglesLogo.png";

export default function QRGenerator() {
  const [cookies] = useCookies();
  const userID = cookies.userID;
  const [checked, setChecked] = useState(false);

  const handleChange = (val) => {
    setChecked(val);
  };

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
              <form action="" className="msgForm">
                <label id="contactno" >
                  <input
                    className="inputField"
                    type="number"
                    name="contact no"
                    placeholder="Contact Number"
                  />
                </label>
                <label id="alternateContactno" >
                  <input
                    className="inputField"
                    type="number"
                    name="contact no"
                    placeholder="Alternate Contact Number"
                  />
                </label>
                <label id="message" >
                  <textarea
                    className="inputField"
                    id="textarea"
                    type="text"
                    name="message"
                    rows={7}
                    placeholder="Drop your message here."
                  />
                </label>

                <button className="uploadMsg" type="submit">
                  Upload Message
                </button>
              </form>
            </div>
            <div className="qrContainerRight">
              <div className="userImg"></div>
              <div className="userName">POGO</div>
              <div
                className="userQR"
                style={{
                  height: "auto",
                  margin: "0 auto",
                  maxWidth: 64,
                  width: "100%",
                }}
              >
                <QRCode
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
                <button className="downloadQR">Save QR</button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
}