import { MouseEventHandler, useEffect, useRef, useState } from "react";

export function DraggableButton({onMouseDown, id, mouseDown}: { onMouseDown: MouseEventHandler<HTMLDivElement>, id: string, mouseDown: boolean}){
  
  const draggerWrap = useRef<HTMLDivElement | null>(null);
  

  const [style, setStyle] = useState<React.CSSProperties>({})

  const draggableButton =  (
    <div
      ref={draggerWrap}
      onMouseDown={onMouseDown}
      draggable='false' 
      id={id} 
      className='absolute bg-[#1dba1f] bg-opacity-80 w-[100%] h-[20px] flex justify-center items-center z-50'
      style={style}
      >
               
        <button className='relative border-[1px] border-[#000000] rounded-sm p-1 h-fit m-auto'></button>       
    </div>    
  )

  useEffect(()=>{

    if(id.includes('DragBottom')){
      setStyle({
        bottom: 0 ,
        left:0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: "12px",
        borderBottomRightRadius: "12px",
        display: mouseDown ? "": "none"
        
      })
    }
    else{
      setStyle(
        {
          top: 0,
          left: 0,
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          display: mouseDown ? "": "none"
        }
      )
    }

  }, [mouseDown])

  return draggableButton
}