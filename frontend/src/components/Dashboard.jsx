import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
function Dashboard() {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            try {
                const response = await axios.get("http://localhost:3000/secrets", { withCredentials: true });
                console.log("Response data : " + JSON.stringify(response.data));
                setUser(response.data);
                setLoading(false);

            } catch (err) {
                console.log(err);
                setLoading(false);
            }
            
        }
        fetchData();
    }, [])

    return (
        <div className="dark:bg-gray-800 m-0 block h-screen">
            <div>
                <h1 className="text-3xl p-5 font-bold font-sans dark:text-white">Dashboard</h1>
                {
                    loading ? ( 
                        <Loading /> 
                    ) : (
                        <h1 className="dark:text-white">{JSON.stringify(user)}</h1>
                    )
                }

                <div className="grid grid-cols-2 grid-rows-2">
                    <div className="rounded-md border-8 border-gray-700 h- 1/2">
                        <h1>My Net Worth</h1>
                    </div>
                    <div className="rounded-md border-8 border-gray-700 h- 1/2 row-span-2">
                        <h1>Transactions</h1>
                    </div>
                    <div className="rounded-md border-8 border-gray-700 h- 1/2">
                        <h1>Goals</h1>
                    </div>


                </div>

            </div>
        </div>
    )
}

export default Dashboard;