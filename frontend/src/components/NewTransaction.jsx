import  { useState } from "react";
import NoteIcon from "./Icons/NoteIcon";
import AccountsSelect from "./AccountsSelect";
import DatePicker from "./DatePicker";
import CategoryPicker from "./CategoryPicker";
// import ButtonGroup from "./ButtonGroup";
import { Tab, TabGroup, TabList } from "@headlessui/react";
import { ArrowLeftIcon, HomeIcon } from "@heroicons/react/24/outline";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function NewTransaction() {

    const [transactionType, setTransactionType] = useState("expense");
    const navigate = useNavigate();

    function changeTransactionType(type) {
        setTransactionType(type);
    }

    async function submit(event) {
        event.preventDefault();
        const formData = new FormData(event.target.form);
        console.log("fromData" + formData);
        const transactionObj = {
            transactionType: formData.get("transactionType"),
            amount: parseInt(formData.get("amount")),
            title: formData.get("title"),
            date: formData.get("date"),
            category: formData.get("category"),
        }

        if (formData.get("from") != undefined) {
            transactionObj.from = formData.get("from");
        }

        if (formData.get("to") != undefined) {
            transactionObj.to = formData.get("to");
        }

        const response = await axios.post("http://localhost:3000/newtransaction", transactionObj);
        navigate("/app/dashboard");

    }
    
    return (
        <>
            <div className="dark:bg-darkblue m-0 block">
                <div className="m-4 flex">
                    <Link className="flex flex-row p-3 dark:hover:bg-slate-600 dark:hover:rounded-xl" to={"/app/dashboard"}>
                        <ArrowLeftIcon className="w-7 mr-2 stroke-white" strokeWidth={2}/>
                        <HomeIcon className="w-8 stroke-white" strokeWidth={2}/>
                    </Link>
                    <h1 className="text-3xl p-5 font-bold font-sans dark:text-slate-200">New Transaction</h1>
                </div>
                {/* Button Group */}
                {/* <div className="flex justify-center items-center">
                    <div className="inline-flex rounded-md shadow-sm" role="group">
                        <button type="button" onClick={() => changeTransactionType("expense")}
                            className="px-4 py-2 text-lg font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-red-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                                Expense
                        </button>
                        <button type="button" onClick={() => changeTransactionType("income")}
                            className="px-4 py-2 text-lg font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-green-500 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                                Income
                        </button>
                        <button type="button" onClick={() => changeTransactionType("transfer")} 
                            className="px-4 py-2 text-lg font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-yellow-400 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                                Transfer
                        </button>
                    </div>
                </div> */}
                
                <div className="flex w-full justify-center pt-5 px-4">
                    <div className="w-full max-w-md">
                        <TabGroup>
                            <TabList className="flex gap-4">
                                <Tab onClick={() => changeTransactionType("expense")} className="rounded-full py-1 px-3 text-xl font-semibold  text-red-600 focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">Expenses</Tab>
                                <Tab onClick={() => changeTransactionType("income")} className="rounded-full py-1 px-3 text-xl font-semibold text-green-500 focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">Income</Tab>
                                <Tab onClick={() => changeTransactionType("transfer")} className="rounded-full py-1 px-3 text-xl font-semibold text-yellow-400 focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white">Transfer</Tab>
                            </TabList>
                        </TabGroup>
                    </div>
                </div>

                {/* Form */}
                <form className="p-5" method="POST">
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-6">
                                    <div className="mt-2 flex flex-col justify-center">
                                        
                                        <input type="hidden" name="transactionType" value={transactionType}/>

                                        <div className="flex shadow-inner sg from-yellow-400">
                                            <div className="pl-8 w-1/2">

                                                {/* Amount */}
                                                <div className="flex mb-5 items-center rounded-md shadow-sm ring-1 p-1.5 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset sm:max-w-md focus-within:ring-cyan-600">
                                                    <p className="text-3xl text-white p-1">₹</p>
                                                    <input
                                                        name="amount"
                                                        type="number"
                                                        placeholder="0"
                                                        className="block h-20 flex-1 border-0 bg-transparent lg:placeholder:text-4xl lg:text-4xl py-1.5 pl-1.5 text-cyan-600 font-bold text-6xl placeholder:text-gray-400 focus:caret-cyan-600 placeholder:text-lg focus:outline-none focus:ring-0 sm:text-sm sm:leading-6"
                                                    />

                                                </div>
                                                

                                                {/* Title */}

                                                <div className="flex rounded-md shadow-sm ring-1 p-1.5 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset sm:max-w-md focus-within:ring-cyan-600">
                                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">

                                                        <NoteIcon />
                                                    </span>
                                                    <input
                                                        name="title"
                                                        type="text"
                                                        placeholder="Title"
                                                        className="block flex-1 border-0 bg-transparent lg:text-lg py-1.5 pl-1.5 text-white text-3xl placeholder:text-gray-400 focus:caret-cyan-600 placeholder:text-lg focus:outline-none focus:ring-0 sm:text-sm sm:leading-6"
                                                    />

                                                </div>

                                                {/* Frequency */}
                                                {/* <div className="flex mt-4 rounded-md shadow-sm ring-1 p-1.5 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset sm:max-w-md focus-within:ring-cyan-600">
                                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                                                        <ArrowPathIcon className="fill-none stroke-white w-7 h-7"/>
                                                    </span>
                                                    <input
                                                        name="frequency"
                                                        type="text"
                                                        placeholder="Title"
                                                        className="block flex-1 border-0 bg-transparent lg:text-lg py-1.5 pl-1.5 text-white text-3xl placeholder:text-gray-400 focus:caret-cyan-600 placeholder:text-lg focus:outline-none focus:ring-0 sm:text-sm sm:leading-6"
                                                    />

                                                </div> */}

                                                {/* Account(s) */}
                                                
                                                
                                                <h1>{transactionType}</h1>
                                                {
                                                    transactionType == "expense" ? 
                                                        <AccountsSelect name="from"/>
                                                    : (
                                                        transactionType == "income" ?
                                                            <AccountsSelect name="to"/>
                                                        :
                                                            <div>
                                                                <AccountsSelect name="from"/>
                                                                <AccountsSelect name="to"/>
                                                            </div>

                                                    )   
                                                        
                                                }

                                            </div>

                                            {/* Date */}
                                            <DatePicker />
                                        </div>
                                        {/* Category */}
                                        <CategoryPicker />
                                        
                                        <div className="mt-3 p-3 flex justify-center items-center">
                                            <button type="submit" onClick={submit} className="text-white items-center w-24 bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                </form>
            </div>

            
        </>
    )
}

export default NewTransaction;