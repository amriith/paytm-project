import { useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
export const Appbar = () => {
    const [name, setName] = ("GUEST");
    

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setName(decodedToken.username);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
    }, []);
   
   
    return  <div className="shadow h-14 flex justify-between">
    <div className="flex flex-col justify-center h-full ml-4">
        PayTM App
    </div>
    <div className="flex">
        <div className="flex flex-col justify-center h-full mr-4">
        Hello,{name}
        </div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
            <div className="flex flex-col justify-center h-full text-xl">
               
            </div>
        </div>
    </div>
</div>
}