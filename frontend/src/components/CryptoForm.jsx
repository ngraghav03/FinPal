import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

function CryptoForm() {
    const [valueType, setValueType] = useState(false);

    var today = new Date();
    
    const todayDate = `${today.getFullYear()}-${
        today.getMonth() + 1 >= 10 ? today.getMonth() + 1 
        : 
        "0" + (today.getMonth() + 1)
    }-${today.getDate()}`
    
    return (
        <>
            <div>
                {/* //^ Input for Fund ID as per external API */}
                <div className="mb-5">
                    <div className="flex mb-2 items-center rounded-md shadow-sm ring-1 p-1.5 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset sm:max-w-md focus-within:ring-cyan-600">
                        <MagnifyingGlassIcon className="mx-2 w-8 stroke-slate-50" strokeWidth={2}/>
                        <input
                            name="symbol"
                            type="text"
                            placeholder="Search"
                            className="block h-10 flex-1 border-0 bg-transparent lg:placeholder:text-2xl lg:text-2xl py-1.5 pl-1.5 text-cyan-300 font-bold text-6xl placeholder:text-gray-400 focus:caret-cyan-600 placeholder:text-lg focus:outline-none focus:ring-0 sm:text-sm sm:leading-6"
                            autoComplete="off"
                        />
                    </div>
                </div>

                {/* // ^ Toggle for inputting values in terms of shares held or amount */}
                <div className="flex items-center">
                    <h1 className="m-2 p-4 dark:text-white text-xl">Coins</h1>
                    <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" hidden readOnly/>
                        <div onClick={() => setValueType((prev) => !prev)} 
                        // <div
                            className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-cyan-600"></div>
                    </label>
                    <h1 className="text-xl text-white m-2 p-4">Amount</h1>
                </div>

                {/* // ^ Input field for value */}
                <div className="flex mb-5 items-center rounded-md shadow-sm ring-1 p-1.5 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset sm:max-w-md focus-within:ring-cyan-600">
                    {/* <p className="text-3xl text-white p-2 ml-1">{!valueType ? "" : "₹"}</p> */}
                    <input
                        name="value"
                        type="text"
                        placeholder={!valueType ? "Coins" : "0"}
                        className="block h-14 flex-1 border-0 bg-transparent lg:placeholder:text-3xl lg:text-3xl py-1.5 pl-3.5 text-cyan-300 font-bold text-6xl placeholder:text-gray-400 focus:caret-cyan-600 placeholder:text-lg focus:outline-none focus:ring-0 sm:text-sm sm:leading-6"
                        autoComplete="off"
                    />
                </div>

                {/* // ^ Toggle for Including in Net Worth */}
                <div className="flex items-center">
                    <h1 className="m-2 p-4 dark:text-white text-xl">Include in net worth ?</h1>
                    <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" name="incl_networth" className="sr-only peer" />
                        <div
                            className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-cyan-600"></div>
                    </label>
                </div>

                <input type="text" name="lastUpdatedAt" value={todayDate} hidden readOnly/>
                <input type="text" name="valueType" value={valueType} hidden readOnly/>

            </div>
        </>
    )
}

export default CryptoForm;