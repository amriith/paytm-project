import { useState } from "react"
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { PasswordInput } from "../components/PasswordInput";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password,setPassword] = useState("");
const navigate = useNavigate();


    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
    <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">

    <Heading label={"Sign In"} />
    < SubHeading label={"Enter your credentials to log in"}/> 
    <InputBox onChange={(e)=>{
       setUsername(e.target.value)
    }} label={"Username"}  placeholder={"xyz@gmail.com"}/>
    <PasswordInput onChange={ (e) =>{
        setPassword(e.target.value)
    }} label={"Password"}  placeholder={"Password"}/> 
    
    <div className="pt-4"> 
    <Button onClick={ async ()=>{
       const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
            username,
   password
        });
        localStorage.setItem("token", response.data.token) 
navigate("/dashboard")

    }} label={"Sign In"} />

     </div> 
    <BottomWarning label={"Don't Have an Account? "} buttonText={"Sign Up"} to={"/signup"}/>

        </div>
        </div>
        </div>
}