

import {useState, createElement, FunctionComponent, useEffect, useRef, JSX, MouseEventHandler} from 'react';
import { ActivityFormInput} from './types';
import {DraggableButton} from './button-draggable'
import { EmptyDiv } from './activity-empty-item';




export function ActivityForm({ index, j, span}: ActivityFormInput) {

  
  const [isMouseDown, setMouseDown] = useState(false);
  const [rowOptions, setOptions] = useState<JSX.Element[]>([]);


  const sliderWrapper  = useRef<HTMLDivElement | null>(null);

  const eventWrapper  = useRef<HTMLDivElement | null>(null);
  const currButton = useRef<HTMLDivElement | null>(null);
  const secondButton = useRef<HTMLDivElement | null>(null);
 
  const grabOffsetY = useRef(0);

  const onMouseDown: MouseEventHandler<HTMLDivElement> = (e): void => {
    const el = e.currentTarget as HTMLDivElement;
    const elRect = el.getBoundingClientRect();

    
    if( el.id.includes("DragFirst")) secondButton.current = document.getElementById(`DragSecond-${index}-${j}`) as HTMLDivElement
    
    else secondButton.current = document.getElementById(`DragFirst-${index}-${j}`) as HTMLDivElement

    if(e.pageY !== 0) grabOffsetY.current = e.pageY - elRect.top;
    currButton.current =  e.currentTarget
        

    eventWrapper.current!.addEventListener("mousemove", onMouseMove);
    eventWrapper.current!.addEventListener("mouseup", onMouseUp);

    console.log("id",  el.id, "ElRect", elRect.top, "pageY:", e.pageY)

  };

  const onMouseMove = (e: MouseEvent): void => {
   
    if( currButton.current === null ||  secondButton.current === null ) return

   
    const parent = eventWrapper.current!
    const parentRect = parent.getBoundingClientRect();
    
    const parentTop = parentRect.top;
    const parentBottom = parentRect.bottom;

    const currValue = pxToNum( currButton.current.style.top)

    if(currValue < -1){
      currButton.current.style.top = `${0}px`
      window.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
      return
    }
    
    const y = e.pageY - parentTop - grabOffsetY.current ;
    currButton.current.style.top = `${y}px`

    updateSlider()

  }

  const onMouseUp = (e: MouseEvent): void =>{
    if(currButton.current !== null || secondButton.current !== null){
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)

      analyseLastPosition()

      currButton.current = null
    }
  }

  const positionButton = (pageYOffset: number, relativeTop: number, rectHeight: number) =>{
    setMouseDown(true)

    grabOffsetY.current = pageYOffset

    const firstButton = document.getElementById(`DragFirst-${index}-${j}`) as HTMLDivElement
    const secondButton = document.getElementById(`DragSecond-${index}-${j}`) as HTMLDivElement

    firstButton.style.top = `${relativeTop}px`
    firstButton.style.height = `${rectHeight}px` 

    secondButton.style.top = `${relativeTop}px`
    secondButton.style.height = `${rectHeight}px`

    secondButton.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
  }


  function updateSlider(){
    const currValue = pxToNum( currButton.current!.style.top)
    const secondValue = pxToNum(  secondButton.current!.style.top)

    const currRect =  secondButton.current?.getBoundingClientRect();
    const secondRect =  secondButton.current?.getBoundingClientRect();

    const currH = currRect!.height
    const secondH = secondRect!.height


    if(currValue + currH <= secondValue){
      // console.log((eventWrapper.current!.getBoundingClientRect().height - secondValue).toString() + "px" )
      sliderWrapper.current!.style.top =  (currValue + currH).toString()  + "px"
      sliderWrapper.current!.style.height = ( secondValue - currValue).toString() + "px"
    } 

    else {
      sliderWrapper.current!.style.top = (secondValue + secondH).toString()  + "px"
      sliderWrapper.current!.style.height = ( currValue - secondValue ).toString() + "px"
    }
    
  }

  function analyseLastPosition(){


    rowOptions.map((el)=>{
      console.log(el.props)
    })

  }


  function pxToNum(targetString: string){
    return parseInt(targetString.replace('px', ''))
  }

  
  function getRows(){
    const divRows:JSX.Element[] = []
    
    for(let i=0; i <  span + 0; i++){

      const e =  <EmptyDiv buttonMove={positionButton} i={i + 1} j={1} hidden={false}/>;
      divRows.push(e)
    }

    return divRows
  }


  useEffect(() =>{
    
    eventWrapper.current!.addEventListener("mouseleave", onMouseUp);
    setOptions(getRows)
  }, [])

  return (
    <div        
      key={`${index + 2}-${j + 1}`}
      ref={eventWrapper}       
      className="relative bg-[#d3e1ff] z-50 grid grid-rows-subgrid h-full gap-0"       
      style={{         
        gridRowStart: index + 2,
        gridColumnStart: j + 1,
        gridRowEnd: index + 2 + span,
        gridColumnEnd: j + 2,
      }}       
    >
       
      <DraggableButton onMouseDown={onMouseDown} id={`DragFirst-${index}-${j}`} mouseDown={isMouseDown}/>
      <DraggableButton onMouseDown={onMouseDown} id={`DragSecond-${index}-${j}`}  mouseDown={isMouseDown}/>

      <div ref={sliderWrapper} id={`slider-${index}-${j}`}  className={`absolute top-0 bg-[#b0ff9a33]  z-50 w-full h-[20px] ${isMouseDown? '': 'hidden'} pointer-events-none`} ></div>

      <>{rowOptions}</>
    
    </div>   
  )

}

