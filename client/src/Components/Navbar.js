import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Logo from "../images/wigglesLogo.png";
import { CgProfile } from "react-icons/cg";
import { TbLogout,TbVaccine } from "react-icons/tb";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../CSS/Navbar.css";
const Navbar = () => {
  const [name, setName] = useState("");
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const userID = cookies.userID;

  var showMenu = () => {
    var bar = document.getElementsByClassName("bar");
    var ham = document.getElementsByClassName("navbarLinksMenu");
    bar[0].classList.toggle("barOne");
    bar[1].classList.toggle("barTwo");
    bar[2].classList.toggle("barThree");
    ham[0].classList.toggle("navbarLinksMenuShow");
  };

  const [openNotification, setOpenNotification] = useState("false");
  const HandleClick = () => {
    setOpenNotification(!openNotification);
  };

  document.addEventListener("mousedown", handler);
  function handler() {
    setOpenNotification("false");
  }

  const notificationclick = document.getElementsByClassName("notificationIcon");
  notificationclick[0] &&
    notificationclick[0].addEventListener("mousedown", (event) => {
      event.stopPropagation();
    });

  function deleteCookies() {
    var allCookies = document.cookie.split(";");
    // The "expire" attribute of every cookie is
    // Set to "Thu, 01 Jan 1970 00:00:00 GMT"
    for (var i = 0; i < allCookies.length; i++)
      document.cookie =
        allCookies[i] + "=;expires=" + new Date(0).toUTCString();
  }

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
      }).catch((err) => {
        console.log(err);
        toast.error("There was an error. Kindly refresh the page.");
      });
      let data = await response.json();
      if (data.status === "ok") {
        setName(data.foundUser.name);
        setImage(data.foundUser.image);
      } else {
        toast.error("There was an error. Kindly refresh the page.");
      }
    };
    fetchData();
  }, [userID]);

  const logout = (e) => {
    e.preventDefault();
    deleteCookies();
    navigate("/login");
  };

  return (
    <>
      <div className="navbar">
        <div className="navbarLinks">
          <div className="Hamburger" onClick={showMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
          <Link to={"/Profile"} className="logo">
            <img src={Logo} alt="" />
          </Link>
          <div className="navbarLinksMenu">
            <Link to="/Profile" className="navbarLinksProfile">
                <CgProfile className="reactIcon" />&nbsp;Profile              
            </Link>
            <Link to="/Vaccination">
              <TbVaccine className="reactIcon"/>&nbsp;Vaccination</Link>
            {/* <Link to="/GenerateQR">QR Code</Link> */}
            <Link className="enableLogout" onClick={logout}><TbLogout/>&nbsp;Logout</Link>
          </div>
        </div>
        <div className="navbarSecondaryInfo">
          <Link className="navbarDogInfo" to={"/Profile"}>
            <img className="profilePicture dogPhoto" src={image} alt="" />
            <h2>{name}</h2>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
