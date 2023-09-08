import React, { useEffect, useState } from 'react'
import Navbar from "./Navbar"
import ShareVaccination from "./ShareVaccinations"
import "../CSS/Vaccination.css"
import Logo from "../images/wigglesLogo.png"
import { BsShareFill } from 'react-icons/bs'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import {AiOutlineCheck, AiOutlineEdit, AiOutlineFileDone, AiOutlinePlus, AiOutlineSave} from "react-icons/ai"

const Vaccination = () => {
    const[show, setShow]=useState(0);
    const[cookies]=useCookies();
    const userID= cookies.userID;
    const[petName, setPetName]=useState("");
    const[breed, setBreed]=useState("");
    const[weight, setWeight]=useState("");
    const[allergies, setAllergies]=useState("");
    const[conditions, setConditions]=useState("");
    const[vetName, setVetName]=useState("");
    const[vetNumber, setVetNumber]=useState("");
    const[vetAddress, setVetAddress]=useState("");
    const[inactive, setInactive]=useState(true);
    const[addVaccination,setAddVaccination]=useState(false);
    const[editbtn, setEditbtn]=useState("Edit");
    const[editIcon,setEditIcon]=useState("0")

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
            setBreed(data.foundUser.breed);
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
            setEditbtn("Save") 
            setEditIcon(!editIcon);
            return;
        }
        const response= await fetch("http://localhost:3001/updateProfile",{
            method:"POST",
            body: JSON.stringify({
                name:petName,
                breed,
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
        setEditIcon(!editIcon);
        
    }

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
        <div className="shareIconContainer" onClick={()=>show ? setShow(0):setShow(1)} ><BsShareFill className='shareIcon'/></div>
        <ShareVaccination show={show}/>
            <div className='headerContainer'>
                <div className='logoInfoContainer'>
                    <img src={Logo} alt="website-logo"></img>
                    <h3>Wiggles</h3>
                </div>
                <h1>PET HEALTH RECORD</h1>
            </div>
            <div className='healthInfoWrapper'>
                <button id='addVaccination' className='editButton' onClick={handleEdit}> { editIcon ? <AiOutlineEdit className='editIcon'/> : <AiOutlineSave className='editIcon'/> }&nbsp;{editbtn}</button>
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
                        <h1>Breed: 
                            <input 
                                disabled={inactive}
                                type="text" 
                                value={breed}
                                onChange={(e)=>{setBreed(e.target.value)}}
                            />
                        </h1>
                        <div className='dogWeight'>
                        <h1>Weight: 
                            <input 
                                disabled={inactive}
                                type="number" 
                                value={weight}
                                onChange={(e)=>{setWeight(e.target.value)}}
                                placeholder="kg"
                            />
                        </h1>
                        <h1>{(weight > 0)? "kg" : ""}</h1>
                        </div>
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
                    <button id="addVaccination" form="vaccinationForm" onClick={handleClick}>{addVaccination ? <AiOutlineSave className='addIcon'/> :<AiOutlinePlus className='addIcon'/>}&nbsp;{addVaccination ? "Save" : "Add"} </button>
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