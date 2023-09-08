import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Home = () => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies();
    useEffect(()=>{
        const verifyCookie = async () => {
            if (!cookies.token) {
              navigate("/Login");
            }
            const response = await fetch('http://localhost:3001/',{
                method:"POST",
                credentials:'include',
                headers: {
                    'Content-type': 'application/json',
                },
            })
            const data = await response.json();
            return data.status
              ? navigate("/Profile")
              : (removeCookie("token"), navigate("/login"));
        };
        verifyCookie();
    }, [cookies, navigate, removeCookie]);
}

export default Home