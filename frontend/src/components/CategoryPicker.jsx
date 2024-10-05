import { useState } from "react";
import CinemaIcon from "./Categories/CinemaIcon";
import ElectronicsIcon from "./Categories/ElectronicsIcon";

import EntertainmentIcon from "./Categories/EntertainmentIcon";

import FoodIcon from "./Categories/FoodIcon";
import SubscriptionIcon from "./Categories/SubscriptionIcon";
import SportsIcon from "./Categories/SportsIcon";
import VacationIcon from "./Categories/VacationIcon";
import GroceriesIcon from "./Categories/GroceriesIcon";
import RestaurantIcon from "./Categories/RestaurantIcon";

import BankIcon from "./Categories/BankIcon";
import RepairIcon from "./Categories/RepairIcon";
import PhoneIcon from "./Categories/PhoneIcon";
import InternetIcon from "./Categories/InternetIcon";
import HomeSuppliesIcon from "./Categories/HomeSuppliesIcon";
import TaxesIcon from "./Categories/TaxesIcon";
import TVIcon from "./Categories/TVIcon";
import HouseLoanIcon from "./Categories/HouseLoanIcon";
import ShoppingIcon from "./Categories/ShoppingIcon";
import HealthCareIcon from "./Categories/HealthCareIcon";
import EducationIcon from "./Categories/EducationIcon";
import LifestyleIcon from "./Categories/LifestyleIcon";
import WorkIcon from "./Categories/WorkIcon";
import InvestmentsIcon from "./Categories/InvestmentsIcon";
import SalaryIcon from "./Categories/SalaryIcon";
import InterestIcon from "./Categories/InterestIcon";
import CarIcon from "./Categories/CarIcon";
import BikeIcon from "./Categories/BikeIcon";
import FuelIcon from "./Categories/FuelIcon";
import TrainIcon from "./Categories/TrainIcon";
import SavingsIcon from "./Categories/SavingsIcon";

function CategoryPicker() {

    const [category, setCategory] = useState("");

    return (
        <>
            <h2 className="text-2xl dark:text-slate-200 font-semibold">Category</h2>
            <div className="flex flex-col w-3/5">

                {/* Entertainment */}
                <h3 className="text-xl dark:text-slate-200 p-3">Entertainment</h3>
                <div className="flex justify-evenly border-t-2 border-b-slate-200 p-3">
                    <div className="m-3">
                        <button type="button" className="flex flex-col items-center" onClick={() => setCategory("Cinema")}>
                            <CinemaIcon />
                            <h1 className="text-md dark:text-slate-200">Cinema</h1>
                        </button>
                    </div>

                    <div className="m-3">
                        <button type="button" className="flex flex-col items-center" onClick={() => setCategory("Electronics")}>
                            <ElectronicsIcon name="Electronics" />
                            <h1 className="text-md dark:text-slate-200">Electronics</h1>
                        </button>
                    </div>

                    <div className="m-3">
                        <button type="button" className="flex flex-col items-center" onClick={() => setCategory("Entertainment")}>
                            <EntertainmentIcon />
                            <h1 className="text-md dark:text-slate-200">Entertainment</h1>
                        </button>
                    </div>

                    <div className="m-3">
                        <button type="button" className="flex flex-col items-center" onClick={() => setCategory("Subscription")}>
                            <SubscriptionIcon />
                            <h1 className="text-md dark:text-slate-200">Subscription</h1>
                        </button>
                    </div>
                    
                    <div className="m-3">
                        <button type="button" className="flex flex-col items-center" onClick={() => setCategory("Sports")}>
                        <SportsIcon />
                            <h1 className="text-md dark:text-slate-200">Sports</h1>
                        </button>
                    </div>
                    
                    
                    
                    
                </div>

                {/* Food */}
                <h3 className="text-xl dark:text-slate-200 p-3">Food</h3>
                <div className="flex justify-evenly border-t-2 border-b-slate-200 p-3">
                    <div className="m-3">
                        <button type="button" className="flex flex-col items-center" onClick={() => setCategory("Food")}>
                            <FoodIcon />
                            <h1 className="text-md dark:text-slate-200">Food</h1>
                        </button>
                    </div>

                    <div className="m-3">
                        <button type="button" className="flex flex-col items-center" onClick={() => setCategory("Groceries")}>
                            <GroceriesIcon />
                            <h1 className="text-md dark:text-slate-200">Groceries</h1>
                        </button>
                    </div>

                    <div className="m-3">
                        <button type="button" className="flex flex-col items-center" onClick={() => setCategory("Restaurant")}>
                            <RestaurantIcon />
                            <h1 className="text-md dark:text-slate-200">Restaurant</h1>
                        </button>
                    </div>
                      
                </div>

                {/* Lifestyle */}
                <h3 className="text-xl dark:text-slate-200 p-3">Lifestyle</h3>
                <div className="flex justify-evenly border-t-2 border-b-slate-200 p-3">

                    <div className="m-3">
                        <button type="button" className="flex flex-col items-center" onClick={() => setCategory("Education")}>
                            <EducationIcon />
                            <h1 className="text-md dark:text-slate-200">Education</h1>
                        </button>
                    </div>

                    <div className="m-3">
                        <button type="button" className="flex flex-col items-center" onClick={() => setCategory("Healthcare")}>
                            <HealthCareIcon />
                            <h1 className="text-md dark:text-slate-200">Healthcare</h1>
                        </button>
                    </div>

                    <div className="m-3">
                        <button type="button" className="flex flex-col items-center" onClick={() => setCategory("Lifestyle")}>
                            <LifestyleIcon name="Lifestyle" />
                            <h1 className="text-md dark:text-slate-200">Lifestyle</h1>
                        </button>
                    </div>

                    <div className="m-3">
                        <button type="button" className="flex flex-col items-center" onClick={() => setCategory("Shopping")}>
                            <ShoppingIcon />
                            <h1 className="text-md dark:text-slate-200">Shopping</h1>
                        </button>
                    </div>

                    <div className="m-3">
                        <button type="button" className="flex flex-col items-center" onClick={() => setCategory("Vacation")}>
                            <VacationIcon name="Vacation" />
                            <h1 className="text-md dark:text-slate-200">Vacation</h1>
                        </button>
                    </div>

                    <div className="m-3">
                        <button type="button" className="flex flex-col items-center" onClick={() => setCategory("Work")}>
                            <WorkIcon />
                            <h1 className="text-md dark:text-slate-200">Work</h1>
                        </button>
                    </div>
                      
                </div>

                {/* Housing */}
                <h3 className="text-xl dark:text-slate-200 p-3">Housing</h3>
                <div className="flex justify-evenly border-t-2 border-b-slate-200 p-3">

                    <div className="m-3">
                        <button type="button" className="flex flex-col items-center" onClick={() => setCategory("Electricity")}>
                            <ElectronicsIcon name="Electricity" />
                            <h1 className="text-md dark:text-slate-200">Electricity</h1>
                        </button>
                    </div>

                    <div className="m-3">
                        <button type="button" className="flex flex-col items-center" onClick={() => setCategory("Home Supplies")}>
                            <HomeSuppliesIcon />
                            <h1 className="text-md dark:text-slate-200">Home Supplies</h1>
                        </button>
                    </div>

                    <div className="m-3">
                        <button type="button" className="flex flex-col items-center" onClick={() => setCategory("Internet")}>
                            <InternetIcon />
                            <h1 className="text-md dark:text-slate-200">Internet</h1>
                        </button>
                    </div>

                    <div className="m-3">
                        <button type="button" className="flex flex-col items-center" onClick={() => setCategory("Loan")}>
                            <HouseLoanIcon />
                            <h1 className="text-md dark:text-slate-200">Loan</h1>
                        </button>
                    </div>

                    <div className="m-3">
                        <button type="button" className="flex flex-col items-center" onClick={() => setCategory("House Maintenance")}>
                            <RepairIcon name="Maintenance" />
                            <h1 className="text-md dark:text-slate-200">Maintenance</h1>
                        </button>
                    </div>

                    <div className="m-3">
                        <button type="button" className="flex flex-col items-center" onClick={() => setCategory("Phone")}>
                            <PhoneIcon />
                            <h1 className="text-md dark:text-slate-200">Phone Bill</h1>
                        </button>
                    </div>
                    <div className="m-3">
                        <button type="button" className="flex flex-col items-center" onClick={() => setCategory("House Rent")}>
                            <BankIcon name="Rent" />
                            <h1 className="text-md dark:text-slate-200">Rent</h1>
                        </button>
                    </div>
                    <div className="m-3">
                        <button type="button" className="flex flex-col items-center" onClick={() => setCategory("Taxes")}>
                            <TaxesIcon />
                            <h1 className="text-md dark:text-slate-200">Taxes</h1>
                        </button>
                    </div>
                    <div className="m-3">
                        <button type="button" className="flex flex-col items-center" onClick={() => setCategory("TV")}>
                            <TVIcon />
                            <h1 className="text-md dark:text-slate-200">TV</h1>
                        </button>
                    </div>
                    
                </div>

                {/* Income */}
                <h3 className="text-xl dark:text-slate-200 p-3">Income</h3>
                <div className="flex justify-evenly border-t-2 border-b-slate-200 p-3">
                    <div className="m-3">
                        <button type="button" className="flex flex-col items-center" onClick={() => setCategory("Salary")}>
                            <SalaryIcon />
                            <h1 className="text-md dark:text-slate-200">Salary</h1>
                        </button>
                    </div>
                    <div className="m-3">
                        <button type="button" className="flex flex-col items-center" onClick={() => setCategory("Investments")}>
                            <InvestmentsIcon />
                            <h1 className="text-md dark:text-slate-200">Investments</h1>
                        </button>
                    </div>
                    <div className="m-3">
                        <button type="button" className="flex flex-col items-center" onClick={() => setCategory("Interest")}>
                            <InterestIcon />
                            <h1 className="text-md dark:text-slate-200">Interest</h1>
                        </button>
                    </div>
                    
                    
                    

                </div>

                {/* Transportation */}
                <h3 className="text-xl dark:text-slate-200 p-3">Transportation</h3>
                <div className="flex  justify-evenly border-t-2 border-b-slate-200 p-3">
                    <div className="m-3">
                        <button type="button" className="flex flex-col items-center" onClick={() => setCategory("Car Costs")}>
                            <CarIcon name="Car Costs" />
                            <h1 className="text-md dark:text-slate-200">Car Costs</h1>
                        </button>
                    </div>
                    <div className="m-3">
                        <button type="button" className="flex flex-col items-center" onClick={() => setCategory("Car Loan")}>
                            <CarIcon name="Car Loan" />
                            <h1 className="text-md dark:text-slate-200">Car Loan</h1>
                        </button>
                    </div>
                    <div className="m-3">
                        <button type="button" className="flex flex-col items-center" onClick={() => setCategory("Bike Costs")}>
                            <BikeIcon name="Costs" />
                            <h1 className="text-md dark:text-slate-200">Bike Costs</h1>
                        </button>
                    </div>
                    <div className="m-3">
                        <button type="button" className="flex flex-col items-center" onClick={() => setCategory("Bike Loan")}>
                            <BikeIcon name="Loan" />
                            <h1 className="text-md dark:text-slate-200">Bike Loan</h1>
                        </button>
                    </div>
                    <div className="m-3">
                        <button type="button" className="flex flex-col items-center" onClick={() => setCategory("Fuel")}>
                            <FuelIcon />
                            <h1 className="text-md dark:text-slate-200">Fuel</h1>
                        </button>
                    </div>

                    <div className="m-3">
                        <button type="button" className="flex flex-col items-center" onClick={() => setCategory("Repair")}>
                            <RepairIcon name="Repair" />
                            <h1 className="text-md dark:text-slate-200">Repair</h1>
                        </button>
                    </div>
                    
                    <div className="m-3">
                        <button type="button" className="flex flex-col items-center" onClick={() => setCategory("Public Transport")}>
                            <TrainIcon />
                            <h1 className="text-md dark:text-slate-200">Public Transport</h1>
                        </button>
                    </div>
                    
                    <div className="m-3">
                        <button type="button" className="flex flex-col items-center" onClick={() => setCategory("Taxi")}>
                            <CarIcon name="Taxi" />
                            <h1 className="text-md dark:text-slate-200">Taxi</h1>
                        </button>
                    </div>

                </div>

                {/* Savings */}
                <h3 className="text-xl dark:text-slate-200 p-3">Savings</h3>
                <div className="flex  justify-evenly border-t-2 border-b-slate-200 p-3">

                    <div className="m-3">
                        <button type="button" className="flex flex-col items-center" onClick={() => setCategory("Emergency Savings")}>
                            <LifestyleIcon name="Emergency Savings" />
                            <h1 className="text-md dark:text-slate-200">Emergency Savings</h1>
                        </button>
                    </div>
                    
                    <div className="m-3">
                        <button type="button" className="flex flex-col items-center" onClick={() => setCategory("Savings")}>
                            <SavingsIcon />
                            <h1 className="text-md dark:text-slate-200">Savings</h1>
                        </button>
                    </div>
                    
                    <div className="m-3">
                        <button type="button" className="flex flex-col items-center" onClick={() => setCategory("Vacation Savings")}>
                            <VacationIcon name="Vacation Savings" />
                            <h1 className="text-md dark:text-slate-200">Vacation Savings</h1>
                        </button>
                    </div>
                    
                    
                    Coming Soon...
                </div>
                <input type="hidden" name="category" value={category} readOnly/>
            </div>
        </>
    )
}

export default CategoryPicker;