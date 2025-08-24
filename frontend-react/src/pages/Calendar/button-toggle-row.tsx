import { useState } from "react";


export function ToggleButton({day, index, clicked, colClick}: {day: string, index: number, clicked: boolean , colClick: CallableFunction}) {
    const [clickedButton, setClicked] = useState(clicked);

    return (
        <div className={`bg-[#d3e1ff] row-start-1 col-start-${index + 2} col-span-1 `}>
            <div key={`${-1}-${index}`} className={` flex flex-row w-fit rounded-lg border-2 border-[#0f285f] mx-auto my-2 p-0 box-content`}>
                <span className="mx-2 my-auto text-lg">{day}</span>
                <button onClick={() => colClick(clicked, index)} className="p-3 bg-[#0f285f] text-white">{clicked ?'-': '+' }</button>
            </div>
        </div>
        );

}