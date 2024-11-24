import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import axios from "axios"; 
import { useEffect, useState } from "react";


export const Dashboard = () => {
 const [balance, setBalance]=useState("");
 const token = localStorage.getItem("token");
    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
    })
            .then(response => {
                console.log("Full API Response:", response.data);
                setBalance(response.data.balance || []);
            })
    }, [])

    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={balance} />
            <Users />
        </div>
    </div>
}