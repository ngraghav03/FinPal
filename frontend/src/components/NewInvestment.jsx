import {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import CryptoIcon from "./Icons/CryptoIcon";
import FixedDepositIcon from "./Icons/FixedDepositIcon";
import MutualFundIcon from "./Icons/MutualFundIcon";
import StocksIcon from "./Icons/StocksIcon";
import FDForm from "./FDForm";
import MFForm from "./MFForm";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, HomeIcon } from "@heroicons/react/24/outline";
import StocksForm from "./StocksForm";
import { FDFormValidation } from "./InvestmentFormValidation";
import CryptoForm from "./CryptoForm";

function NewInvestment() {

    const [selected, setSelected] = useState("");
    const navigate = useNavigate();

    function changeSelected(type) {
        setSelected((prevType) => type);
    }

    async function submit(event) {
        
        // TODO: If deduct account is set, then check if an account is selected before submitting
        // TODO: Navigate to same page if not selected and submit and navigate to Home if selected

        event.preventDefault();
        const formData = new FormData(event.target.form);
        // console.log("fromData " + JSON.stringify(formData));
        
        var investmentObj = {
            type: formData.get("investmentType"),
            incl_networth: formData.get("incl_networth") == null ? "off" : "on",
        };
        
        switch(investmentObj.type) {
            case "FD":
                // * If credit account is not given, then don't submit the form
                investmentObj = {
                    ...investmentObj,
                    amount: formData.get("amount"),
                    maturityDate: formData.get("date"),
                    creditAccount: formData.get("credit"),
                    debitAccount: formData.get("debit"),
                };

                break;
            
            case "MF":
                investmentObj = {
                    ...investmentObj,
                    fundId: formData.get("fundId"),
                    value: formData.get("value"),
                    valueType: formData.get("valueType") == "true" ? true : false,
                    lastUpdatedAt: formData.get("lastUpdatedAt"),
                }
                break;
            
            case "Stocks":
                investmentObj = {
                    ...investmentObj,
                    symbol: formData.get("symbol"),
                    value: formData.get("value"),
                    valueType: formData.get("valueType") == "true" ? true : false,
                    lastUpdatedAt: formData.get("lastUpdatedAt"),
                }
                break;

            case "Crypto":
                investmentObj = {
                    ...investmentObj,
                    symbol: formData.get("symbol"),
                    value: formData.get("value"),
                    valueType: formData.get("valueType") == "true" ? true : false,
                    lastUpdatedAt: formData.get("lastUpdatedAt"),
                }
                break;
        }
            
        
        

        console.log(JSON.stringify(investmentObj));
        
        const response = await axios.post("http://localhost:3000/newinvestment", investmentObj);
        console.log("response: " + JSON.stringify(response));

        // navigate("/app/dashboard");
        
    }

    return (
        <>
            <div className="h-screen dark:bg-darkblue m-0 block">
            {/* <div className="h-screen dark:bg-gradient-to-br from-darkestblue from-10% to-cyan-700 to-90% via-darkblue via-40% m-0 block"> */}
                <div>
                    <div className="m-4 flex">
                        <Link className="flex flex-row p-3 dark:hover:bg-slate-600 dark:hover:rounded-xl" to={"/app/dashboard"}>
                            <ArrowLeftIcon className="w-7 mr-2 stroke-white" strokeWidth={2}/>
                            <HomeIcon className="w-8 stroke-white" strokeWidth={2}/>
                        </Link>
                        <h1 className="text-3xl p-5 font-bold font-sans dark:text-slate-200">New Investment</h1>
                        <h1 className="text-3xl p-5 font-sans font-bold dark:text-slate-200">{selected}</h1>
                    </div>
                    

                    {/* // ^ Investment Type Selection */}
                    <div className="flex flex-row w-4/5 gap-8 m-5">

                        <button onClick={() => changeSelected("FD")}>
                            <div className={`flex flex-col justify-center items-center rounded-2xl w-40 h-40 border-2 
                                ${selected == "FD" ? "border-green-400" : "border-cyan-300"}`}>
                                {/* <h2 className="text-sm text-red-400 font-semibold">{ selected == "FD" ? "yes" : "no" }</h2> */}
                                <FixedDepositIcon 
                                color={ selected == "FD" ? "yes" : "no" }
                                />
                                <h2 className={`text-xl font-semibold 
                                    ${ selected == "FD" ? "text-green-400" : "text-white"}`}>
                                    Fixed Deposit
                                </h2>
                            </div>
                        </button>
                        
                        <button onClick={() => changeSelected("MF")}>
                            <div className={`flex flex-col justify-center items-center rounded-2xl w-40 h-40 border-2 
                                ${selected == "MF" ? "border-green-400" : "border-cyan-300"}`}>
                                <MutualFundIcon color={ selected == "MF" ? "yes" : "no" }/>
                                <h2 className={`text-xl font-semibold 
                                    ${ selected == "MF" ? "text-green-400" : "text-white"}`}>
                                    Mutual Fund
                                </h2>
                            </div>
                        </button>

                        <button onClick={() => changeSelected("Stocks")}>
                            <div className={`flex flex-col justify-center items-center rounded-2xl w-40 h-40 border-2 
                                ${selected == "Stocks" ? "border-green-400" : "border-cyan-300"}`}>
                                <StocksIcon color={ selected == "Stocks" ? "yes" : "no" } />
                                <h2 className={`text-xl font-semibold 
                                    ${ selected == "Stocks" ? "text-green-400" : "text-white"}`}>
                                    Stocks
                                </h2>
                            </div>
                        </button>

                        <button onClick={() => changeSelected("Crypto")}>
                            <div className={`flex flex-col justify-center items-center rounded-2xl w-40 h-40 border-2 
                                ${selected == "Crypto" ? "border-green-400" : "border-cyan-300"}`}>
                                <CryptoIcon color={ selected == "Crypto" ? "yes" : "no" } />
                                <h2 className={`text-xl font-semibold 
                                    ${ selected == "Crypto" ? "text-green-400" : "text-white"}`}>
                                    Crypto
                                </h2>
                            </div>
                        </button>

                        <button
                            // onClick={() => changeSelected("FD")}
                        >
                            <div className={`flex flex-col justify-center items-center rounded-2xl w-40 h-40 border-2`}>
                                {/* <h2 className="text-sm text-red-400 font-semibold">{ selected == "FD" ? "yes" : "no" }</h2> */}
                                <h2 className="text-sm text-red-400">Coming Soon</h2>
                                <FixedDepositIcon 
                                // color={ selected == "FD" ? "yes" : "no" }
                                />
                                <h2 className={`text-xl font-semibold text-slate-500`}>
                                    Recurring Deposit
                                </h2>
                            </div>
                        </button>

                    </div>

                    {/* // ^ Corresponding Form */}
                    <div className="ml-5 mt-10">
                        <form method="POST">
                            <input type="hidden" name="investmentType" value={selected} />
                            
                            {
                                selected == "FD" ? (
                                    <FDForm />
                                        
                                ) : (
                                    selected == "MF" ? (
                                        <MFForm />
                                    
                                    ) : (
                                        selected == "Stocks" ? (
                                            <StocksForm />
                                        ) : (
                                            selected == "Crypto" ? (
                                                <CryptoForm />
                                            ) : (null)
                                        )

                                    )
                                )
                            }

                            <div className="mt-3 p-3 flex justify-center items-center">
                                <button type="submit" onClick={submit} className="text-white items-center w-24 bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
                            </div>
                        </form>
                    </div>
                    

                </div>
            </div>
                
            
        </>
    )
}

export default NewInvestment;