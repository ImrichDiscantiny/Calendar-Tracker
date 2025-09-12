import { MouseEventHandler, useEffect, useRef } from "react";


export function EmptyDiv({i, j, hidden, buttonMove}: {i: number; j: number; hidden: boolean, buttonMove: null | CallableFunction}) {

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const childRefs = {
    1: useRef<HTMLDivElement | null>(null),
    2: useRef<HTMLDivElement | null>(null),
    3: useRef<HTMLDivElement | null>(null),
  };


  
 const mouseDown: MouseEventHandler<HTMLDivElement> = (e) =>{
    
    if (!wrapperRef.current ||  buttonMove === null) return;

    const parent = wrapperRef.current.parentElement as HTMLElement;
    const parentRect = parent.getBoundingClientRect();


    const childRect =( e.target as HTMLDivElement).getBoundingClientRect();
    const relativeTop = childRect.top - parentRect.top;
    console.log(e.pageY, parentRect.bottom,  parentRect.top,  parentRect.height)
    buttonMove(parentRect.height, relativeTop, childRect.height)    
  }

  useEffect(()=>{
    
  }, [])


  return (
    <div  ref={wrapperRef}  key={`p-${i + 2}-${j + 1}`}
        className={`bg-[#d3e1ff]  z-10 min-h-[40px] ${hidden?'hidden':''}  border-none`}
        style={{
            gridRowStart: i,
            gridColumnStart: j,
            gridRowEnd: `span ${1}`,
            gridColumnEnd: `span ${1}`,
        }}
      >
        <div className="grid grid-cols-1 grid-rows-[repeat(3,_auto)] w-full h-full m-0 border-black border-b-[1px]">
          <div onMouseDown={mouseDown} ref={childRefs[1]} data-id="1" className="bg-[#d3e1ff] row-start-1 col-start-1 col-span-1 row-span-1 hover:bg-sky-700"></div>
          <div onMouseDown={mouseDown} ref={childRefs[2]} data-id="2" className="bg-[#d3e1ff] row-start-2 col-start-1 col-span-1 row-span-1 border-y-[1px] border-[#a7a7a7] hover:bg-sky-700"></div>
          <div onMouseDown={mouseDown} ref={childRefs[3]} data-id="3" className="bg-[#d3e1ff] row-start-3 col-start-1 col-span-1 row-span-1 hover:bg-sky-700"></div>
      </div>
    </div>
  )
}