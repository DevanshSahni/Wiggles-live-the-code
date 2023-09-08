import React, { useEffect, useState } from 'react'
import Navbar from "./Navbar"
import "../CSS/Vaccination.css"
import Logo from "../images/wigglesLogo.png"
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'

const Vaccination = () => {
    const[show, setShow]=useState(0);
    const[cookies]=useCookies();
    const userID= cookies.userID;
    const[petName, setPetName]=useState("");
    const[height, setHeight]=useState("");
    const[weight, setWeight]=useState("");
    const[allergies, setAllergies]=useState("");
    const[conditions, setConditions]=useState("");
    const[vetName, setVetName]=useState("");
    const[vetNumber, setVetNumber]=useState("");
    const[vetAddress, setVetAddress]=useState("");
    const[inactive, setInactive]=useState(true);
    const[editbtn, setEditbtn]=useState("Edit");

    useEffect(()=>{
        const handleContent=async()=>{
            const response= await fetch("http://localhost:3001/profiledata",{
                method:"POST",
                body: JSON.stringify({
                    userID,
                }),
                credentials:"include",
                headers:{
                    "Content-type": "application/json",
                }
            })

            if(!response.ok){
                toast.error("Please refresh");
                return;
            }
            const data= await response.json();

            setPetName(data.foundUser.name);
            setHeight(data.foundUser.height);
            setWeight(data.foundUser.weight);
            setAllergies(data.foundUser.allergies);
            setConditions(data.foundUser.conditions);
            setVetName(data.foundUser.vetName);
            setVetNumber(data.foundUser.vetNumber);
            setVetAddress(data.foundUser.vetAddress);
        }
        handleContent();
    }, []);

    const handleEdit=async(e)=>{
        e.preventDefault();
        if(editbtn==="Edit"){
            setInactive(false);
            setEditbtn("Submit") 
            return;
        }
        const response= await fetch("http://localhost:3001/updateProfile",{
            method:"POST",
            body: JSON.stringify({
                name:petName,
                height,
                weight,
                allergies,
                conditions,
                vetName,
                vetNumber,
                vetAddress,
            }),
            credentials:"include",
            headers:{
                "Content-type": "application/json",
            }
        })

        if(!response.ok){
            toast.error("Please refresh");
            return;
        }
        const data= await response.json();

        toast.success("Successfully updated!");
        setInactive(true);
        setEditbtn("Edit")
    }


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
                <button id='addVaccination' onClick={handleEdit}>{editbtn}</button>
                <div className='HealthInfoContainer'>
                    <h1>Pet's name: 
                        <input 
                            disabled={inactive}
                            type="text" 
                            value={petName}
                            onChange={(e)=>{setPetName(e.target.value)}}
                        />
                    </h1>
                    <div className='dogHealthInfo'>
                        <h1>Height: 
                            <input 
                                disabled={inactive}
                                type="number" 
                                value={height}
                                onChange={(e)=>{setHeight(e.target.value)}}
                            />
                        </h1>
                        <h1>Weight: 
                            <input 
                                disabled={inactive}
                                type="number" 
                                value={weight}
                                onChange={(e)=>{setWeight(e.target.value)}}
                            />
                        </h1>
                        <h1>Allergies:
                            <input 
                                disabled={inactive}
                                type="text" 
                                value={allergies }
                                onChange={(e)=>{setAllergies(e.target.value)}}
                            />
                        </h1>
                        <h1>Conditions: 
                            <input 
                                disabled={inactive}
                                type="text" 
                                value={conditions}
                                onChange={(e)=>{setConditions(e.target.value)}}
                            />
                        </h1>
                    </div>
                </div>
                <div className='HealthInfoContainer'>
                    <h1>Veterinarian: 
                        <input 
                            disabled={inactive}
                            type="text" 
                            value={vetName}
                            onChange={(e)=>{setVetName(e.target.value)}}
                        />
                    </h1>
                    <div className='vetInfo'>
                        <h1>Phone no.: 
                            <input 
                                disabled={inactive}
                                type="number" 
                                value={vetNumber}
                                maxLength={10}
                                onChange={(e)=>{setVetNumber(e.target.value)}}
                            />
                        </h1>
                        <h1>Address: 
                            <input 
                                disabled={inactive}
                                type="text" 
                                value={vetAddress}
                                onChange={(e)=>{setVetAddress(e.target.value)}}
                            />
                        </h1>
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