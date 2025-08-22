
export function ToggleButton({day, index}: {day: string, index: number}) {

 return (
    <div className={`bg-[#d3e1ff] row-start-1 col-start-${index + 2} col-span-1 `}>
        <div key={`${0}-${index}`} className={` flex flex-row w-fit rounded-lg border-2 border-[#0f285f] mx-auto my-2 p-0 box-content`}>
            <span className="mx-2 my-auto text-lg">{day}</span>
            <button className="p-3 bg-[#0f285f] text-white">+</button>
        </div>
    </div>
    );

}