import React, { useState } from 'react'
import Navbar from "./Navbar"
import ShareVaccination from "./ShareVaccinations"
import "../CSS/Vaccination.css"
import Logo from "../images/wigglesLogo.png"
import { BsShareFill } from 'react-icons/bs'

const Vaccination = () => {

    const[show, setShow]=useState(0);
    const[addVaccination,setAddVaccination]=useState(false);
    const handleClick = () =>{
        setAddVaccination(!addVaccination);
    }
    const handleAddVaccine =(e)=>{
        e.preventDefault();
        console.log("hi im working");
    }
  return (
    <>
        <Navbar/>
        <div className='vaccinationWrapper'>
        <div className="shareIconContainer"><BsShareFill className="shareIcon" onClick={()=>show ? setShow(0):setShow(1)}/></div>
        <ShareVaccination show={show}/>
            <div className='headerContainer'>
                <div className='logoInfoContainer'>
                    <img src={Logo} alt="website-logo"></img>
                    <h3>Wiggles</h3>
                </div>
                <h1>PET HEALTH RECORD</h1>
            </div>
            <div className='healthInfoWrapper'>
                <div className='HealthInfoContainer'>
                    <h1>Pet's name: </h1>
                    <div className='dogHealthInfo'>
                        <h1>Height: </h1>
                        <h1>Weight: </h1>
                        <h1>Allergies: </h1>
                        <h1>Existing conditions: </h1>
                    </div>
                </div>
                <div className='HealthInfoContainer'>
                    <h1>Veterinarian: </h1>
                    <div className='vetInfo'>
                        <h1>Phone no.: </h1>
                        <h1>Address:</h1>
                    </div>
                </div>
                <div className='vaccinationContainer'>
                    <div className='vaccinationInfoPrimary'>
                        <h1>Vaccinations</h1>
                        <button id="addVaccination" form="vaccinationForm" onClick={handleClick}>{addVaccination ? "Save" : "Add +"}</button>
                    </div>
                    <form id="vaccinationForm" onSubmit={handleAddVaccine}></form>
                    <table>
                        <tr>
                        <th>Name</th>
                        <th>Batch Number</th>
                        <th>Date</th>
                        <th>Next visit</th>
                        </tr>
                        {addVaccination && 
                        <tr className='addVaccinationForm'>
                                <td><input type="text" placeholder="Name" form="vaccinationForm" /></td>
                                <td><input type="text" placeholder="Batch number" form="vaccinationForm"/></td>
                                <td><input  placeholder="Date" form="vaccinationForm"/></td>
                                <td><input  placeholder="Next Visit" form="vaccinationForm"/></td>
                        </tr>
                        }
                    </table>
                </div>
            </div>
        </div>

    </>
  )
}

export default Vaccination