import { Fragment, useState } from "react";
import { Menu, Transition } from '@headlessui/react'
import { CalendarDaysIcon } from '@heroicons/react/24/outline'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { getDay, startOfToday, format, eachDayOfInterval, startOfMonth, endOfMonth, isToday, isEqual, parse, add, sub } from "date-fns";


function DatePicker() {
    
    let today = startOfToday();
    console.log(format(today, 'yyyy-MM-dd'))
    const [selectedDay, setSelectedDay] = useState(today);
    const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
    // console.log("Current month: " + currentMonth);
    let firstDayOfCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());

    let newDays = eachDayOfInterval({ 
        start: firstDayOfCurrentMonth, 
        end: endOfMonth(firstDayOfCurrentMonth)
    });
    // console.log(newDays);

    function classNames(...classes) {
        // console.log(classes.filter(Boolean).join(' '));
        return classes.filter(Boolean).join(' ');
    
    }
    
    function nextMonth() {
        let firstDayOfNextMonth = add(firstDayOfCurrentMonth, { months: 1 });
        setCurrentMonth(format(firstDayOfNextMonth, 'MMM-yyyy'));
    }

    function previousMonth() {
        let firstDayOfPreviousMonth = sub(firstDayOfCurrentMonth, { months: 1 });
        setCurrentMonth(format(firstDayOfPreviousMonth, 'MMM-yyyy'));
    }

    return (
        <>
            <div className="w-1/2 items-center pr-8">
                <div>
                    <div className="flex flex-row p-2 items-center">
                        <CalendarDaysIcon className="w-7 h-7 mr-2 dark:stroke-white"/>
                        <input type="text" name="date" value={format(selectedDay, 'yyyy-MM-dd')} className="hidden" />
                        <h1 className="bg-transparent text-white p-2 rounded-md">{format(selectedDay, 'MMM d, yyyy')}</h1>
                    </div>
                    
                </div>
                <div className="p-10">
                    <div className="md:pr-14">
                        <div className="flex items-center">
                            <h2 className="flex-auto font-semibold text-gray-200">
                                {format(firstDayOfCurrentMonth, 'MMM yyyy')}
                            </h2>
                            <button 
                                type="button"
                                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
                                
                                <span className="sr-only">Previous month</span>
                                <ChevronLeftIcon onClick={previousMonth} className="w-5 h-5" aria-hidden="true" />
                            </button>
                            <button 
                                type="button"
                                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500">
                                
                                <span className="sr-only">Next month</span>
                                <ChevronRightIcon onClick={nextMonth} className="w-5 h-5" aria-hidden="true" />
                            </button>
                        </div>

                        <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-200">
                            <div>S</div>
                            <div>M</div>
                            <div>T</div>
                            <div>W</div>
                            <div>T</div>
                            <div>F</div>
                            <div>S</div>
                        </div>

                        <div className="grid grid-cols-7 mt-2 text-sm">
                            {newDays.map((day, dayIdx) => (
                                <div
                                key={day.toString()}
                                className={classNames(
                                    'py-2', 
                                    dayIdx > 6 && 'border-t  border-gray-200', 
                                    dayIdx === 0 && (getDay(day) > 0 ? `col-start-${getDay(day) + 1}` : '')
                                )}>
                                    <button type="button"
                                    onClick={() => setSelectedDay(day)}
                                    className={classNames(
                                        isEqual(day, selectedDay) && 'text-white',
                                        !isEqual(day, selectedDay) && isToday(day) && 'text-cyan-500',
                                        !isEqual(day, selectedDay) && !isToday(day) && 'text-white',
                                        !isEqual(day, selectedDay) && !isToday(day) && 'text-gray-400',
                                        isEqual(day, selectedDay) && isToday(day) && 'dark:bg-cyan-500',
                                        isEqual(day, selectedDay) && !isToday(day) && 'bg-gray-900',
                                        !isEqual(day, selectedDay) && 'hover:bg-gray-200 hover:text-gray-700',
                                        (isEqual(day, selectedDay) || isToday(day)) && 'font-bold',
                                        'mx-auto flex h-8 w-8 items-center justify-center rounded-full font semibold'
                                    )}>
                                        <time dateTime={format(day, 'yyyy-MM-dd')}>
                                            {format(day, 'd')}
                                        </time>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DatePicker;