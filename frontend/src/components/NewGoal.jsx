import { useState } from "react";

import { ArrowLeftIcon, HomeIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from "axios";

function NewGoal() {

    const colourObj = {
        pink: "#f472b6",
        indigo: "#818cf8",
        red: "#ef4444",
        amber: "#fbbf24",
        green: "#16a34a",
        cyan: "#06b6d4",
        fuchsia: "#c026d3",
        teal: "#0d9488",
    }

    const [name, setName] = useState(0);
    const [currentValue, setCurrentValue] = useState(0);
    const [targetValue, setTargetValue] = useState(100);
    // const [roundedPercentage, setRoundedPercentage] = useState(0.0);
    const [colour, setColour] = useState("#3E98C7");

    const navigate = useNavigate();

    const roundedPercentage = (currentValue * 100 / targetValue).toFixed(2);

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleCurrentChange(event) {
        setCurrentValue(parseInt(event.target.value));
    }

    function handleTargetChange(event) {
        setTargetValue(parseInt(event.target.value));
    }

    async function submit(event) {
        event.preventDefault();
        const formData = new FormData(event.target.form);

        const response = await axios.post("http://localhost:3000/newgoal", {
            name: formData.get("name"),
            current: formData.get("current"),
            target: formData.get("target"),
            colour: formData.get("colour"),
        });
        // console.log("Response from backend: " + JSON.stringify(response));

        navigate("/app/dashboard");
    }

    return (
        <>
            <div className="dark:bg-darkblue m-0 block h-screen">
                
                <div className="m-4 flex">
                    <Link className="flex flex-row p-3 dark:hover:bg-slate-600 dark:hover:rounded-xl" to={"/app/dashboard"}>
                        <ArrowLeftIcon className="w-7 mr-2 stroke-white" strokeWidth={2}/>
                        <HomeIcon className="w-8 stroke-white" strokeWidth={2}/>
                    </Link>
                    <h1 className="text-3xl p-5 font-bold font-sans dark:text-slate-200">New Goal</h1>
                </div>

                <form method="POST">

                    <div className="flex">
                        <div>
                            {/* // ? Account Name */}
                            <div className="flex rounded-md shadow-sm ring-1 m-3 p-1.5 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset sm:max-w-md focus-within:ring-cyan-600">
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="What is your goal?"
                                    className="block flex-1 border-0 bg-transparent lg:text-xl py-1.5 pl-1.5 text-slate-50 text-3xl font-semibold placeholder:text-gray-400 placeholder:font-semibold focus:caret-cyan-600 placeholder:text-lg focus:outline-none focus:ring-0 sm:text-sm sm:leading-6"
                                    autoComplete="off"
                                    required
                                    onChange={handleNameChange}
                                />

                            </div>

                            {/* //^ Current and Target */}
                            <div className="flex">
                                {/* // ? Current Amount */}
                                <div className="flex items-center w-1/5
                                rounded-md shadow-sm ring-1 m-3 p-1.5 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset sm:max-w-md focus-within:ring-cyan-600">
                                    <p className="text-3xl text-white p-1">₹</p>
                                    <input
                                        name="current"
                                        type="text"
                                        placeholder="Current"
                                        className="block h-20 flex-1 border-0 bg-transparent lg:placeholder:text-3xl lg:text-3xl py-1.5 pl-1.5 text-cyan-600 font-bold placeholder:text-gray-400 focus:caret-cyan-600 placeholder:text-lg focus:outline-none focus:ring-0 sm:text-sm sm:leading-6"
                                        required
                                        onChange={handleCurrentChange}
                                        autoComplete="off"
                                    />

                                </div>

                                {/* // ? Target Amount */}
                                <div className="flex items-center w-1/5
                                rounded-md shadow-sm ring-1 m-3 p-1.5 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset sm:max-w-md focus-within:ring-cyan-600">
                                    <p className="text-3xl text-white p-1">₹</p>
                                    <input
                                        name="target"
                                        type="text"
                                        placeholder="Target"
                                        className="block h-20 flex-1 border-0 bg-transparent lg:placeholder:text-4xl lg:text-4xl py-1.5 pl-1.5 text-cyan-600 font-bold text-6xl placeholder:text-gray-400 focus:caret-cyan-600 placeholder:text-lg focus:outline-none focus:ring-0 sm:text-sm sm:leading-6"
                                        required
                                        onChange={handleTargetChange}
                                        autoComplete="off"
                                    />

                                </div>
                            </div>

                            {/* // ? Colours */}
                            {/* <div className="mt-3 ml-3 grid grid-cols-4 w-52 p-2 gap-2">
                                <button type="button" onClick={() => setColour(colourObj.pink)}><div className="w-10 h-10 dark:bg-pink-400 rounded-full"></div></button>
                                <button onClick={() => setColour(colourObj.indigo)}><div className="w-10 h-10 dark:bg-indigo-400 rounded-full"></div></button>
                                <button onClick={() => setColour(colourObj.red)}><div className="w-10 h-10 dark:bg-red-500 rounded-full"></div></button>
                                <button onClick={() => setColour(colourObj.amber)}><div className="w-10 h-10 dark:bg-amber-400 rounded-full"></div></button>
                                <button onClick={() => setColour(colourObj.green)}><div className="w-10 h-10 dark:bg-green-600 rounded-full"></div></button>
                                <button onClick={() => setColour(colourObj.cyan)}><div className="w-10 h-10 dark:bg-cyan-500 rounded-full"></div></button>
                                <button onClick={() => setColour(colourObj.fuchsia)}><div className="w-10 h-10 dark:bg-fuchsia-600 rounded-full"></div></button>
                                <button onClick={() => setColour(colourObj.teal)}><div className="w-10 h-10 dark:bg-teal-600 rounded-full"></div></button>
                            </div> */}
                        </div>

                        {/* // ? Circular Progress Bar */}
                        <div className="w-40 h-40">
                            <CircularProgressbar 
                                value={!isNaN(currentValue && targetValue) ? currentValue : "0"} 
                                maxValue={!isNaN(currentValue && targetValue) ? targetValue : "100"} 
                                // text={!isNaN(currentValue && targetValue) ? `${currentValue * 100 / targetValue}%` : ""}
                                text={!isNaN(currentValue && targetValue) ? `${roundedPercentage}%` : ""}
                                className="font-semibold"
                                styles={buildStyles({
                                    pathColor: `${colour}`,
                                    textColor: `#e2e8f0`,
                                    trailColor: "#e2e8f0",
                                })}
                            />
                                
                        </div>

                    </div>

                    {/* // ? Colours */}
                    <div className="mt-3 ml-3 grid grid-cols-4 w-52 p-2 gap-2">
                        <button type="button" onClick={() => setColour(colourObj.pink)}><div className="w-10 h-10 dark:bg-pink-400 rounded-full"></div></button>
                        <button type="button" onClick={() => setColour(colourObj.indigo)}><div className="w-10 h-10 dark:bg-indigo-400 rounded-full"></div></button>
                        <button type="button" onClick={() => setColour(colourObj.red)}><div className="w-10 h-10 dark:bg-red-500 rounded-full"></div></button>
                        <button type="button" onClick={() => setColour(colourObj.amber)}><div className="w-10 h-10 dark:bg-amber-400 rounded-full"></div></button>
                        <button type="button" onClick={() => setColour(colourObj.green)}><div className="w-10 h-10 dark:bg-green-600 rounded-full"></div></button>
                        <button type="button" onClick={() => setColour(colourObj.cyan)}><div className="w-10 h-10 dark:bg-cyan-500 rounded-full"></div></button>
                        <button type="button" onClick={() => setColour(colourObj.fuchsia)}><div className="w-10 h-10 dark:bg-fuchsia-600 rounded-full"></div></button>
                        <button type="button" onClick={() => setColour(colourObj.teal)}><div className="w-10 h-10 dark:bg-teal-600 rounded-full"></div></button>
                    </div>
                    
                    <input type="hidden" name="colour" value={colour} />

                    <div className="mt-3 p-3 flex justify-center items-center">
                        <button type="submit" onClick={submit} className="text-white items-center w-24 bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Submit</button>
                    </div>

            
                </form>

            </div>
        </>
    )
}

export default NewGoal;