import React from "react"
import "../index.css";
import Logo from "../images/wigglesLogo.png"
function Base(){
    return (
        <div> 
            <img className="logoimg" src={Logo} alt="website-logo"></img>
            <h1 className="logoheading">Wiggles</h1> 
        </div>
    )
}
export default Base