import React, { useEffect, useState } from 'react'
import Navbar from "./Navbar"
import ShareVaccination from "./ShareVaccinations"
import "../CSS/Vaccination.css"
import Logo from "../images/wigglesLogo.png"
import { BsShareFill } from 'react-icons/bs'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'
import {AiOutlineEdit, AiOutlinePlus, AiOutlineSave, AiFillDelete} from "react-icons/ai"
import { useNavigate } from 'react-router-dom'

const Vaccination = () => {
    const navigate = useNavigate();
    const[show, setShow]=useState(0);
    const[print, setPrint]=useState(false);
    // const[cookies]=useCookies();
    // const userID= cookies.userID;
    const[userID, setUserID]=useState("")
    const[petName, setPetName]=useState("");
    const[breed, setBreed]=useState("");
    const[weight, setWeight]=useState("");
    const[allergies, setAllergies]=useState("");
    const[conditions, setConditions]=useState("");
    const[vetName, setVetName]=useState("");
    const[vetNumber, setVetNumber]=useState("");
    const[vetAddress, setVetAddress]=useState("");
    const[vaccinations, setVaccinations]=useState([]);
    const[visit, setVisit]=useState({
        name:"",
        batchNumber: null,
        date: null,
        dueDate: null,
    });
    const[inactive, setInactive]=useState(true);
    const[addVaccination,setAddVaccination]=useState(false);
    const[editbtn, setEditbtn]=useState("Edit");
    const[editIcon,setEditIcon]=useState("0")

    function onFocus(e){
        e.currentTarget.type = "date";
    }
    function onBlur(e){
        e.currentTarget.type = "text";
        e.currentTarget.placeholder = "Date";
    }
    useEffect(()=>{
        document.querySelector(".vaccinationContainer").addEventListener("click", (e)=>e.stopPropagation());
        const handleContent=async()=>{
            const response= await fetch("https://wiggles-live-the-code-backend.vercel.app/profiledata",{
                method:"POST",
                body: JSON.stringify({
                    userID,
                }),
                credentials:"include",
                headers:{
                    "Content-type": "application/json",
                }
            })
            if(response.status==401){
                navigate("/login")
                return;
            }

            if(!response.ok){
                toast.error("Please refresh");
                return;
            }
            const data= await response.json();
            setUserID(data.foundUser._id);
            setPetName(data.foundUser.name);
            setBreed(data.foundUser.breed);
            setWeight(data.foundUser.weight);
            setAllergies(data.foundUser.allergies);
            setConditions(data.foundUser.conditions);
            setVetName(data.foundUser.vetName);
            setVetNumber(data.foundUser.vetNumber);
            setVetAddress(data.foundUser.vetAddress);
            setVaccinations(data.foundUser.vaccinations);
        }
        handleContent();
    }, [addVaccination, userID]);

    const handleEdit=async(e)=>{
        e.preventDefault();
        if(editbtn==="Edit"){
            setInactive(false);
            setEditbtn("Save") 
            setEditIcon(!editIcon);
            return;
        }
        const response= await fetch("https://wiggles-live-the-code-backend.vercel.app/updateProfile",{
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

        toast.success("Successfully updated!");
        setInactive(true);
        setEditbtn("Edit")
        setEditIcon(!editIcon);
        
    }

    document.addEventListener("click", ()=>setAddVaccination(false));

    const handleAddVaccine =async(e)=>{
        e.preventDefault();
        e.stopPropagation();
        if(!addVaccination){
            setAddVaccination(!addVaccination);
            return;
        }
        const response= await fetch("https://wiggles-live-the-code-backend.vercel.app/updateVaccinations",{
            method:"POST",
            body: JSON.stringify({
                visit,
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

        toast.success("Successfully updated!");
        setAddVaccination(!addVaccination);
        setVisit({
            name:"",
            batchNumber: null,
            date: null,
            dueDate: null,
        });
    }

    return (
    <>
    <Navbar/>
    <div className='vaccinationWrapper'>
        <div className="shareIconContainer" onClick={()=>show ? setShow(0):setShow(1)} style={{opacity: print ? 0:1}} ><BsShareFill/></div>
        <ShareVaccination show={show} print={print} setPrint={setPrint} userID={userID}/>
            <div className='headerContainer'>
                <div className='logoInfoContainer'>
                    <img src={Logo} alt="website-logo"></img>
                    <h3>Wiggles</h3>
                </div>
                <h1>PET HEALTH RECORD</h1>
            </div>
            <div className='healthInfoWrapper'>
                <button id='vaccinationButton' className='editButton' onClick={handleEdit} style={{opacity: print ? 0:1}}> { editIcon ? <AiOutlineEdit className='editIcon'/> : <AiOutlineSave className='editIcon'/> }&nbsp;{editbtn}</button>
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
                                value={breed ?? ""}
                                onChange={(e)=>{setBreed(e.target.value)}}
                            />
                        </h1>
                        <div className='dogWeight'>
                        <h1>Weight: 
                            <input 
                                disabled={inactive}
                                type="number" 
                                value={weight ?? ""}
                                onChange={(e)=>{setWeight(e.target.value)}}
                                placeholder="kg"
                            />
                        </h1>
                        <h1 className='dogWeightunit'>{(weight > 0)? "kg" : ""}</h1>
                        </div>
                        <h1>Allergies:
                            <input 
                                disabled={inactive}
                                type="text" 
                                value={allergies ?? ""}
                                onChange={(e)=>{setAllergies(e.target.value)}}
                            />
                        </h1>
                        <h1>Conditions: 
                            <input 
                                disabled={inactive}
                                type="text" 
                                value={conditions  ?? ""}
                                onChange={(e)=>{setConditions(e.target.value)}}
                            />
                        </h1>
                    </div>
                </div>
                <div className='HealthInfoContainer'>
                    <h1 className='vetNameInfo'>Veterinarian: 
                        <h1 className='vetHonorific'>Dr.</h1>
                        <input 
                            disabled={inactive}
                            type="text" 
                            value={vetName ?? ""}
                            onChange={(e)=>{setVetName(e.target.value)}}
                        />
                    </h1>
                    <div className='vetInfo'>
                        <h1>Phone no.: 
                            <input 
                                disabled={inactive}
                                type="number" 
                                value={vetNumber ?? ""}
                                maxLength={10}
                                onChange={(e)=>{setVetNumber(e.target.value)}}
                            />
                        </h1>
                        <h1>Address: 
                            <input 
                                disabled={inactive}
                                type="text" 
                                value={vetAddress ?? ""}
                                onChange={(e)=>{setVetAddress(e.target.value)}}
                            />
                        </h1>
                    </div>
                </div>
                <div className='vaccinationContainer'>
                    <div className='vaccinationInfoPrimary'>
                        <h1>Vaccinations</h1>
                        <button id="vaccinationButton" form="vaccinationForm" style={{opacity: print ? 0:1}}>{addVaccination ? <AiOutlineSave className='addIcon'/> :<AiOutlinePlus className='addIcon'/>}&nbsp;{addVaccination ? "Save" : "Add"} </button>  
                    </div>
                    <form name="Vaccination Form" id="vaccinationForm" onSubmit={handleAddVaccine} ></form>
                    <table className='vaccinationTable'>
                        <thead>
                        <tr>
                          <th>Name</th>
                          <th>Batch Number</th>
                          <th>Date</th>
                          <th>Next visit</th>
                          {/* {!editIcon && <th className='deletedVaccination'>Action</th>} */}
                        </tr>
                        </thead>
                        <tbody>
                        {addVaccination && 
                        <tr className='addVaccinationForm'>
                            <td><input required type="text" placeholder="Name" form="vaccinationForm" value={visit.name ?? ""} onChange={(e)=>setVisit((visit)=>({...visit, name:e.target.value}))}/></td>
                            <td><input required type="number" placeholder="Batch no" form="vaccinationForm" value={visit.batchNumber ?? ""} onChange={(e)=>setVisit((visit)=>({...visit, batchNumber:e.target.value}))}/></td>
                            <td><input required placeholder="Date" onFocus = {onFocus} onBlur={onBlur} form="vaccinationForm" value={visit.date ?? ""} onChange={(e)=>setVisit((visit)=>({...visit, date:e.target.value}))}/></td>
                            <td><input required placeholder="Next Visit" onFocus = {onFocus} onBlur={onBlur} form="vaccinationForm" value={visit.dueDate ?? ""} onChange={(e)=>setVisit((visit)=>({...visit, dueDate:e.target.value}))}/></td>
                        </tr>
                        }
                        {vaccinations && 
                            vaccinations.map((vaccination)=>(
                                <tr key={vaccination._id}>
                                    <td>{vaccination.name}</td>
                                    <td>{vaccination.batchNumber}</td>
                                    <td>{vaccination.date.slice(0,10)}</td>
                                    <td>{vaccination.dueDate.slice(0,10)}</td>
                                    {/* {!editIcon && <td><AiFillDelete className='addIcon'/></td>} */}
                                </tr>
                            ))
                        }   
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
    )
}

export default Vaccination