
function BankIcon(props) {
    return (
        <>
            {/* <div className="m-3">
                <button className="flex flex-col items-center">
                    <svg version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" 
                    width="800px" height="800px" viewBox="0 0 64 64" enableBackground="new 0 0 64 64" xmlSpace="preserve"
                    className="dark:fill-white dark:bg-amber-500 p-2 w-11 h-11 rounded-full">
                        <g>
                            <circle cx="32" cy="14" r="3"/>
                            <path d="M4,25h56c1.794,0,3.368-1.194,3.852-2.922c0.484-1.728-0.242-3.566-1.775-4.497l-28-17
                                C33.438,0.193,32.719,0,32,0s-1.438,0.193-2.076,0.581l-28,17c-1.533,0.931-2.26,2.77-1.775,4.497C0.632,23.806,2.206,25,4,25z
                                M32,9c2.762,0,5,2.238,5,5s-2.238,5-5,5s-5-2.238-5-5S29.238,9,32,9z"/>
                            <rect x="34" y="27" width="8" height="25"/>
                            <rect x="46" y="27" width="8" height="25"/>
                            <rect x="22" y="27" width="8" height="25"/>
                            <rect x="10" y="27" width="8" height="25"/>
                            <path d="M4,58h56c0-2.209-1.791-4-4-4H8C5.791,54,4,55.791,4,58z"/>
                            <path d="M63.445,60H0.555C0.211,60.591,0,61.268,0,62v2h64v-2C64,61.268,63.789,60.591,63.445,60z"/>
                        </g>
                    </svg>
                    <h1 className="text-md dark:text-slate-200">{props.name}</h1>
                </button>
                
            </div> */}

            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" enableBackground="new 0 0 64 64" xmlSpace="preserve"
            className="dark:fill-white dark:bg-amber-500 p-2 w-11 h-11 rounded-full">
                <g>
                    <circle cx="32" cy="14" r="3"/>
                    <path d="M4,25h56c1.794,0,3.368-1.194,3.852-2.922c0.484-1.728-0.242-3.566-1.775-4.497l-28-17
                        C33.438,0.193,32.719,0,32,0s-1.438,0.193-2.076,0.581l-28,17c-1.533,0.931-2.26,2.77-1.775,4.497C0.632,23.806,2.206,25,4,25z
                        M32,9c2.762,0,5,2.238,5,5s-2.238,5-5,5s-5-2.238-5-5S29.238,9,32,9z"/>
                    <rect x="34" y="27" width="8" height="25"/>
                    <rect x="46" y="27" width="8" height="25"/>
                    <rect x="22" y="27" width="8" height="25"/>
                    <rect x="10" y="27" width="8" height="25"/>
                    <path d="M4,58h56c0-2.209-1.791-4-4-4H8C5.791,54,4,55.791,4,58z"/>
                    <path d="M63.445,60H0.555C0.211,60.591,0,61.268,0,62v2h64v-2C64,61.268,63.789,60.591,63.445,60z"/>
                </g>
            </svg>
        </>
    )
}

export default BankIcon;