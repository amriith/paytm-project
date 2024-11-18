import { useState } from "react"
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { PasswordInput } from "../components/PasswordInput";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";

export const Signin = () => {
    const [userName, setUserName] = useState("");
    const [password,setPassword] = useState("");



    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
    <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">

    <Heading label={"Sign In"} />
    < SubHeading label={"Enter your credentials to log in"}/> 
    <InputBox label={"Username"}  placeholder={"xyz@gmail.com"}/>
    <PasswordInput label={"Password"}  placeholder={"Password"}/> 
    
    <div className="pt-4"> 
    <Button label={"Sign In"} />

     </div> 
    <BottomWarning label={"Don't Have an Account? "} buttonText={"Sign Up"} to={"/signup"}/>

        </div>
        </div>
        </div>
}