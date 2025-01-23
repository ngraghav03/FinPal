import { ArrowLeftIcon, HomeIcon } from "@heroicons/react/24/outline";
import axios from "axios"; 
import { Link, useNavigate } from "react-router-dom";

function NewAccount() {
    const navigate = useNavigate();
    
    async function submit(event) {
        event.preventDefault();
        const formData = new FormData(event.target.form);


        const response = await axios.post("http://localhost:3000/newaccount", {
            name: formData.get("name"),
            balance: formData.get("balance"),
            incl_networth: formData.get("incl_networth") || "off",
        });
        // console.log(response.data);
        // if (response.data == "Success") {
        //     navigate("/app/dashboard");
        // }
        navigate("/app/dashboard");
        
        
    }

    return (
        <div className="dark:bg-darkblue m-0 block h-screen">
            <div className="m-4 flex">
                <Link className="flex flex-row p-3 dark:hover:bg-slate-600 dark:hover:rounded-xl" to={"/app/dashboard"}>
                    <ArrowLeftIcon className="w-7 mr-2 stroke-white" strokeWidth={2}/>
                    <HomeIcon className="w-8 stroke-white" strokeWidth={2}/>
                </Link>
                <h1 className="text-3xl p-5 font-bold font-sans dark:text-slate-200">New Account</h1>
            </div>
            {/* 
            // ^ Things to add:
            // ^ Account Name, Current Balance, Include in net worth or not (boolean),    
            */}

            <form method="POST">

                {/* // ? Account Name */}
                <div className="flex rounded-md shadow-sm ring-1 m-3 p-1.5 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset sm:max-w-md focus-within:ring-cyan-600">
                    <input
                        name="name"
                        type="text"
                        placeholder="Account Name"
                        className="block flex-1 border-0 bg-transparent lg:text-lg py-1.5 pl-1.5 text-white text-3xl placeholder:text-gray-400 focus:caret-cyan-600 placeholder:text-lg focus:outline-none focus:ring-0 sm:text-sm sm:leading-6"
                        autoComplete="off"
                        required
                    />

                </div>

                {/* // ? Current Balance */}
                <div className="flex items-center rounded-md shadow-sm ring-1 m-3 p-1.5 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset sm:max-w-md focus-within:ring-cyan-600">
                    <p className="text-3xl text-white p-1">₹</p>
                    <input
                        name="balance"
                        type="number"
                        placeholder="0"
                        className="block h-20 flex-1 border-0 bg-transparent lg:placeholder:text-4xl lg:text-4xl py-1.5 pl-1.5 text-cyan-600 font-bold text-6xl placeholder:text-gray-400 focus:caret-cyan-600 placeholder:text-lg focus:outline-none focus:ring-0 sm:text-sm sm:leading-6"
                        required
                    />

                </div>

                {/* // ? Net Worth Toggle  */}
                <div className="flex items-center">
                    <h1 className="m-2 p-4 dark:text-white text-xl">Include in net worth ?</h1>

                    <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" name="incl_networth" className="sr-only peer" />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-cyan-600"></div>
                    </label>
                </div>

                <div className="mt-3 p-3 flex justify-center items-center">
                    <button type="submit" onClick={submit} className="text-white items-center w-24 bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
                </div>
            
            </form>
            
        </div>
    )
}

export default NewAccount;