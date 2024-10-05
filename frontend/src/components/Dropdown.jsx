import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Cog8ToothIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';

function Dropdown(props) {
    return (
        <>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md dark:bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-700">
                        Options
                        {/* <img src={props.picture} width="30px" height alt="" /> */}
                    <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 dark:text-white " />
                    </MenuButton>
                </div>

                <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 dark:divide-slate-50 rounded-md dark:bg-gray-800 bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                    <div className="py-1">
                    <MenuItem>
                        <a
                            href="#"
                            className="flex items-center px-4 py-2 text-lg dark:text-slate-100 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 font-bold dark:hover:bg-gray-700 dark:hover:text-slate-100"
                        >
                            <Cog8ToothIcon className="h-6 inline pr-3"/>
                            Settings
                        </a>
                    </MenuItem>
                    <MenuItem>
                        <a
                        href="#"
                        className="flex items-center px-4 py-2 text-lg dark:text-red-600 text-red-700 dark:hover:bg-gray-700 dark:hover:text-red-600 daar data-[focus]:bg-gray-100 data-[focus]:text-gray-900 font-bold"
                        >
                            <div className="flex"></div>
                            <ArrowRightStartOnRectangleIcon className="h-6 inline pr-3"/>
                            Logout
                        </a>
                    </MenuItem>
                    </div>
                </MenuItems>
            </Menu>
        </>
    )
}

export default Dropdown;