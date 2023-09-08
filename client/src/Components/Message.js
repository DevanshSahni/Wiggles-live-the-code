import React, { useEffect,useState } from "react";
import "../CSS/Message.css";
import Logo from "../images/wigglesLogo.png";
import { useCookies } from "react-cookie";

export default function Message() {
  const [cookies] = useCookies();
  const userID = cookies.userID;
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDob] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState("");
  const [bio, setBio] = useState("");
  const [vaccinated, setVaccinated] = useState("");
  const [contactNumber,setContactNumber] = useState("")
  const [alternateNumber,setAlternateNumber] = useState("")
  const [message,setMessage] = useState("")



  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3001/profiledata", {
        method: "POST",
        body: JSON.stringify({
          userID,
        }),
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
      });
      let data = await response.json();
      if (data.status === "ok") {
        setName(data.foundUser.name);
        setBreed(data.foundUser.breed);
        setGender(data.foundUser.gender);
        setImage(data.foundUser.image);
        setBio(data.foundUser.bio);
        setVaccinated(data.foundUser.vaccinated);
        // setAddress(data.foundUser.address);
        var today = new Date();
        var dob = new Date(data.foundUser.dob);
        setDob((data.foundUser.dob).slice(0,10));
        //subtracting in milliseconds and then converting result to years.
        var currAge = Math.floor(
            (today.getTime() - dob.getTime()) / (1000 * 60 * 60 * 24 * 365)
          );
          setAge(currAge);
        
      }
    };
    fetchData();
  }, [userID]);


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

  return (
    <div className="msgWindow">
      <div className="msgCard">
        <div className="header">
          <div className="logoInfoContainer">
            <img src={Logo} alt="website-logo"></img>
            <h3>Wiggles</h3>
          </div>
          <div className="status">Lost</div>
        </div>
        <div className="profileImg">
          <img src={image} alt="Profile Image" className="userImg" />
        </div>
        <div className="petName">{name}</div>
        <div className="petInfoPrimary">{gender} &nbsp; | &nbsp; {age} years</div>
        <div className="msgByOwner">
          {message}
        </div>
        <div className="petInfoSecondary">
          <div className="bio">
            {bio}
          </div>
          <div className="otherInfo">
            <div className="breed">Breed: {breed}</div>
            <div className="vaccinated">Vaccinated: 
            {{vaccinated}?"Yes" : "No"}</div>
          </div>
        </div>
        <div className="contactInfo">
          <span className="contactPrimary">{contactNumber}</span>
          <span className="contactSecondary">{alternateNumber}</span>
        </div>
      </div>
    </div>
  );
}
