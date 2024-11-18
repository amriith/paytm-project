import {useState, useSyncExternalStore} from "react";
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PasswordInput } from "../components/PasswordInput";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";



export const Signup = () => {
const [firstName, setFirstName] = useState("");
const [lastName, setLastName]  = useState(" ");
const[email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();

return  <div className="bg-slate-300 h-screen flex justify-center">
<div className="flex flex-col justify-center">
<div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">

<Heading label={"Sign Up"} />
<SubHeading label={"Enter Your Information to Create an Account" } /> 
<InputBox onChange={ e=> {setFirstName(e.target.value)}}  placeholder="Jhon" label={"First Name"} /> 
<InputBox onChange={ e=> {setLastName(e.target.value)}} placeholder="Cena" label={"Last Name"}  />
<InputBox onChange={ e => {setEmail(e.target.value)}} placeholder="xyz@gmail.com" label={"Email Id"} /> 
<PasswordInput onChange={ e=> {setPassword(e.target.value)}} placeholder="1234"  label={"Password"}/>
<Button label={"Sign Up"}/> 
<BottomWarning label={"Already have an account?"}  buttonText={"Sign In"} to={"/signin"}/>   
</div>
</div>
</div>
}