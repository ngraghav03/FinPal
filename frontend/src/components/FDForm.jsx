import { useState } from "react";
import AccountsSelect from "./AccountsSelect";
import DatePicker from "./DatePicker";

function FDForm() {

    const [deduct, setDeduct] = useState(false);

    return (
      <>
        <div className="grid grid-cols-2">
            <div>
                {/* // ^ FD Amount */}
                <div className="flex mb-5 items-center rounded-md shadow-sm ring-1 p-1.5 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset sm:max-w-md focus-within:ring-cyan-600">
                    <p className="text-3xl text-white p-1">₹</p>
                    <input
                        name="amount"
                        type="number"
                        min={1000}
                        placeholder="0"
                        className="block h-20 flex-1 border-0 bg-transparent lg:placeholder:text-4xl lg:text-4xl py-1.5 pl-1.5 text-cyan-300 font-bold text-6xl placeholder:text-gray-400 focus:caret-cyan-600 placeholder:text-lg focus:outline-none focus:ring-0 sm:text-sm sm:leading-6"
                        required
                    />
                </div>

                {/* // ^ Maturity Date */}
                <div>
                    <h2 className="text-xl text-white font-semibold">Maturity Date</h2>
                    <DatePicker />
                </div>
                
            </div>

            <div>

                {/* // ^ Toggle for Including in Net Worth */}
                <div className="flex items-center">
                    <h1 className="m-2 p-4 dark:text-white text-xl">Include in net worth ?</h1>
                    <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" name="incl_networth" className="sr-only peer" />
                        {/* <div onClick={() => setDeduct((prev) => !prev)}  */}
                        <div
                            className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-cyan-600"></div>
                    </label>
                    {/* <h1 className="text-xl text-white">{deduct.toString()}</h1> */}
                </div>

                {/* // ^ Toggle for deducting from (any) account */}
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <h1 className="m-2 p-4 dark:text-white text-xl">Deduct from Account ?</h1>

                        <label className="inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div onClick={() => setDeduct((prev) => !prev)} 
                                className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-cyan-600"></div>
                        </label>
                        <h1 className="text-xl text-white">{deduct.toString()}</h1>
                    </div>

                    {
                        deduct ? (
                            <AccountsSelect name="debit" />
                        ) : (null)
                    }
                </div>
                   
            </div>
            {/* // ^ Account Selection for credit after maturity */}
            <AccountsSelect name="credit"/>
        </div>
        
      </>
    );
}

export default FDForm;