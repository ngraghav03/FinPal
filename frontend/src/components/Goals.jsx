import { ArrowLeftIcon, HomeIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { Link } from "react-router-dom";

function Goals() {

    const [goals, setGoals] = useState([]);
    // TODO: Create a state selected to keep track of which goal is selected
    // TODO: Whichever goal is selected, toggle the view between progressbar and info 
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get("http://localhost:3000/secrets", { withCredentials: true });
            // console.log("AS Response data : " + JSON.stringify(response.data));
            
            const goalsData = response.data.user.goals;
            // console.log("Goals Data : " + JSON.stringify(goalsData));

            setGoals(() => {
                return goalsData.map((goal, index) => {
                    return { 
                        id: index,
                        name: goal.name,
                        current: goal.current, 
                        target: goal.target,
                        colour: goal.colour
                    }
                });
            })
        
        }
        fetchData();
    }, [])

    return (
        <>
            <div className="dark:bg-darkblue m-0 block h-screen">
                
                <div className="m-4 flex">
                    <Link className="flex flex-row p-3 dark:hover:bg-slate-600 dark:hover:rounded-xl" to={"/app/dashboard"}>
                        <ArrowLeftIcon className="w-7 mr-2 stroke-white" strokeWidth={2}/>
                        <HomeIcon className="w-8 stroke-white" strokeWidth={2}/>
                    </Link>
                    <h1 className="text-3xl p-5 font-bold font-sans dark:text-slate-200">Goals</h1>
                    
                </div>

                <div className=" ml-10 flex flex-wrap gap-4">
                    {
                        goals.map((goal) => (
                            <button key={goal.id}>
                                <div className="w-56 h-56 my-6 mr-10 p-3 flex flex-col justify-center rounded-xl items-center dark:border-gray-500 dark:bg-lighterblue border hover:scale-110">
                                        <CircularProgressbar
                                        value={goal.current}
                                        maxValue={goal.target}
                                        text={`${(goal.current * 100 / goal.target).toFixed(2)}%`}
                                        className="font-semibold w-40 h-40"
                                        styles={buildStyles({
                                            pathColor: `${goal.colour}`,
                                            textColor: `#e2e8f0`,
                                            trailColor: "#e2e8f0",
                                            })}
                                        />
                                    
                                    <h2 className="text-slate-50 text-2xl font-semibold mt-2">{goal.name}</h2>
                                </div>
                            </button>
                        ))
                    }
                </div>

            </div>
        </>
    )
}

export default Goals;