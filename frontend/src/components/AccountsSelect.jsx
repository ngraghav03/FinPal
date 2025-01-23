import axios from "axios";
import { useEffect, useState } from "react";
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

function AccountsSelect(props) {
    const [accounts, setAccounts] = useState([]);
    const [selected, setSelected] = useState({
        name: props.name.charAt(0).toUpperCase() + props.name.slice(1)  // & Capitalizing
    });

    useEffect(() => {

        async function fetchData() {
            const response = await axios.get("http://localhost:3000/secrets", { withCredentials: true });
            console.log("AS Response data : " + JSON.stringify(response.data));
            
            const accountsData = response.data.user.accounts;
            // console.log("Accounts Data : " + JSON.stringify(accountsData));

            setAccounts(() => {
                return accountsData.map((account, index) => {
                    return { 
                        id: index,
                        name: account.name 
                    }
                });
            })

        }
        fetchData();

        
    }, []);

    return (
        <>
            <div>
                <Listbox value={selected} onChange={setSelected}>
                    <div className="relative mt-2">
                        <ListboxButton className="relative lg:w-3/5 cursor-default rounded-md bg-transparent py-3 pl-3 pr-5 text-left text-white font-semibold shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 sm:text-sm sm:leading-6">
                        <span className="flex items-center">
                            <span className="ml-3 block truncate">{selected.name}</span>
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                            <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                        </span>
                        </ListboxButton>

                        <ListboxOptions
                        transition
                        className="absolute z-10 mt-1 max-h-56 lg:w-3/5 overflow-auto rounded-md bg-transparent py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                        >
                        {accounts.map((account) => (
                            <ListboxOption
                            key={account.id}
                            value={account}
                            className="group relative cursor-default select-none py-2 pl-3 pr-9 text-white font-semibold data-[focus]:bg-cyan-500 data-[focus]:text-white"
                            >
                            <div className="flex items-center">
                                <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                                {account.name}
                                </span>
                            </div>

                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-cyan-500 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                                <CheckIcon aria-hidden="true" className="h-5 w-5" />
                            </span>
                            </ListboxOption>
                        ))}
                        </ListboxOptions>
                    </div>
                </Listbox>

                <input type="hidden" name={props.name} 
                    value={selected.name != props.name.charAt(0).toUpperCase() + props.name.slice(1) ? selected.name : undefined} 
                    // value={selected.name}
                />
            </div>
        </>
    )    
}


export default AccountsSelect;