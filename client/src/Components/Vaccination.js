import React from 'react'
import Navbar from "./Navbar"
import "../CSS/Vaccination.css"
import Logo from "../images/wigglesLogo.png"

const Vaccination = () => {
  return (
    <>
        <Navbar/>
        <div className='vaccinationWrapper'>
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
                        <button id="addVaccination">Add +</button>
                    </div>
                    <table>
                        <tr>
                        <th>Name</th>
                        <th>Batch Number</th>
                        <th>Date of vaccination</th>
                        <th>Due date</th>
                        </tr>
                    </table>
                </div>
            </div>
        </div>

    </>
  )
}

export default Vaccination