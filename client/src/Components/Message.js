import React from 'react'
import '../CSS/Message.css'
import Logo from "../images/photo.png";
import {FiPhoneCall} from "react-icons/fi";

export default function Message() {
  return (
    <div className='msgWindow'>
        <div className="msgCard">
            <div className="header">
                    <h3>Wiggles</h3>
                <div className="status">Lost</div>
            </div>
            <div className="profileImg">
                <img src={Logo} alt="Profile Image" className="userImg" />
            </div>
            <div className="petName">Gooffyy</div>
            <div className="petInfoPrimary">Female&nbsp;|&nbsp;3 years</div>
            <div className="msgByOwner">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, accusamus tempore autem non optio totam, vero magnam deleniti asperiores nobis voluptatibus id! Aperiam vero at numquam blanditiis ipsum tempora neque.</div>
            <div className="petInfoSecondary">
                <div className="bio" >Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, illum.</div>
                <div className="otherInfo">
                    <div className="breed">Breed: Labrador</div>
                    <div className="vaccinated">Vaccinated: Yes</div>
                </div>
            </div>
            <div className="contactInfo">
                <span className="contactPrimary"><FiPhoneCall className='callIcon'/> &nbsp; 1234567890</span>
                <span className="contactSecondary"><FiPhoneCall className='callIcon'/>&nbsp; 0987654321</span>
            </div>

        </div>
    </div>
  )
}
