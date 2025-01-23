// import React from "react";
import { Link } from "react-router-dom";
// import TransactionsIcon from "./Icons/TransactionsIcon";
// import DashboardIcon from "./Icons/DashboardIcon";
// import InvestmentsIcon from "./Icons/InvestmentsIcon";
// import GoalIcon from "./Icons/GoalIcon";
// import AccountsIcon from "./Icons/AccountsIcon";

import { DashboardIcon, TransactionsIcon, InvestmentsIcon, GoalIcon, AccountsIcon } from "./Icons";

function Sidebar() {
    return (
        <>
            <aside className="top-0 left-0 z-40 w-full h-full pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-darkblue dark:border-gray-700" aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto">
                    <ul className="space-y-2 font-medium">
                        
                        <li>
                            <Link to="/app/dashboard" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <DashboardIcon className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"/>
                            <span className="ms-3 dark:text-white text-lg">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/app/transactions" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <TransactionsIcon className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"/>
                            <span className="ms-3 dark:text-white text-lg">Transactions</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/app/investments" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <InvestmentsIcon className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"/>
                                <span className="flex-1 ms-3 whitespace-nowrap text-lg">Investments</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/app/goals" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <GoalIcon className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"/>
                                <span className="flex-1 ms-3 whitespace-nowrap text-lg">Goals</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/app/accounts" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <AccountsIcon className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"/>
                                <span className="flex-1 ms-3 whitespace-nowrap text-lg">Accounts</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default Sidebar;