

import {useState, createElement, FunctionComponent, useEffect, useRef, JSX, MouseEventHandler} from 'react';
import { ActivityFormInput} from './types';
import {DraggableButton} from './button-draggable'
import { EmptyDiv } from './activity-empty-item';




export function ActivityForm({ index, j, span}: ActivityFormInput) {

  
  const [rowOptions, setOptions] = useState<JSX.Element[]>([]);
  const [isMouseDown, setMouseDown] = useState(false);


  const eventWrapper  = useRef<HTMLDivElement | null>(null);
  const currButton = useRef<HTMLDivElement | null>(null);
  const secondButton = useRef<HTMLDivElement | null>(null);
 
  const grabOffsetY = useRef(0);

  const onMouseDown: MouseEventHandler<HTMLDivElement> = (e): void => {

    const el = e.currentTarget as HTMLDivElement;
    currButton.current = el
    const elRect = currButton.current.getBoundingClientRect();
    if( el.id.includes("DragTop")) { 
      grabOffsetY.current = e.pageY - elRect.top;        
    }
     
    else if( el.id.includes("DragBottom")){
      grabOffsetY.current =   elRect.bottom - e.pageY;
    }
    
    else return

    eventWrapper.current!.addEventListener("mousemove", onMouseMove);
    eventWrapper.current!.addEventListener("mouseup", onMouseUp);

 

  };

  const onMouseMove = (e: MouseEvent): void => {
   
    if( currButton.current === null ||  secondButton.current === null ) return

   
    const parent = eventWrapper.current!
    const parentRect = parent.getBoundingClientRect();
    
    const parentTop = parentRect.top;
    const parentBottom = parentRect.bottom;

    if( currButton.current.id.includes("DragTop")) {
      const beforeTopY = currButton.current.getBoundingClientRect().top + 20  
      const secondBottomY = secondButton.current.getBoundingClientRect().bottom - 20
      const currValue = parseInt( currButton.current.style.top.replace('px', ''))

      if(currValue < -1){
        currButton.current.style.top = `${0}px`
        window.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
        return
      }

      // if(beforeTopY > secondBottomY){
      //   const overlap = beforeTopY + 20 - secondBottomY - 20
      //   currButton.current.style.top = `${currValue - overlap}px`
      //   window.dispatchEvent(new MouseEvent("mouseup", { bubbles: false }));
      //   return
      // }
    
      const y = e.pageY - parentTop - grabOffsetY.current;

      currButton.current.style.top = `${y}px`
    }

    else if( currButton.current.id.includes("DragBottom")) {
      

      const beforeBottomY = currButton.current.getBoundingClientRect().bottom - 20  
      const secondTopY = secondButton.current.getBoundingClientRect().top + 20
      const currValue = parseInt( currButton.current.style.bottom.replace('px', ''))
      const relativeToTop =  parentBottom - currValue - 1

      if( relativeToTop > parentBottom){
        currButton.current.style.bottom = `${0}px`
        window.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
        return
      }

      // if(beforeBottomY < secondTopY){
      //   const overlap = beforeBottomY + 20 - secondTopY - 20
      //   currButton.current.style.bottom = `${currValue + overlap}px`
      //   window.dispatchEvent(new MouseEvent("mouseup", { bubbles: false }));
      //   return
      // }
      
      const y = parentBottom - e.pageY - grabOffsetY.current;
      console.log(secondButton.current.style.bottom, parentBottom, e.pageY, grabOffsetY.current, y)
      currButton.current.style.bottom = `${y}px`
    }
  }

  const onMouseUp = (e: MouseEvent): void =>{
    if(currButton.current !== null || secondButton.current !== null){
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)

      currButton.current = null
    }


  }

  const positionButton = (parentHeight: number, relativeTop: number, rectHeight: number) =>{
    if(isMouseDown) return

    setMouseDown(true)

    currButton.current = document.getElementById(`DragTop-${index}-${j}`) as HTMLDivElement
    secondButton.current = document.getElementById(`DragBottom-${index}-${j}`) as HTMLDivElement

    currButton.current.style.top = `${relativeTop}px`
    currButton.current.style.height = `${rectHeight}px` 

    secondButton.current.style.bottom = `${parentHeight - relativeTop - rectHeight}px`
    secondButton.current.style.height = `${rectHeight}px`
    
    secondButton.current.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));

    console.log(secondButton.current.style.bottom)

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

    let currOptions:JSX.Element[] = []
    eventWrapper.current!.addEventListener("mouseleave", onMouseUp);

    if(rowOptions.length === 0){

      currOptions = getRows()
      setOptions(currOptions)
      return
    }
    else(
      currOptions = rowOptions
    )
    
   
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

      <DraggableButton onMouseDown={onMouseDown} id={`DragTop-${index}-${j}`} mouseDown={isMouseDown}/>
      <DraggableButton onMouseDown={onMouseDown} id={`DragBottom-${index}-${j}`}  mouseDown={isMouseDown}/>

      <>{rowOptions}</>
    
    </div>   
  )

 
}

// const [start, setStart] = useState('');
  // const YesIcon = FaCheck as FunctionComponent<IconBaseProps>;
  // const CancelIcon = MdCancel as FunctionComponent<IconBaseProps>;

  // const defaultOption = 'Not picked';

// const addTimeStart = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setStart(e.target.value);
  // };

  // function TimeStartOptions() {
  //   const def = <option selected={true}>{defaultOption}</option>;
  //   const options = [def];

  //   for (let i = 0; i < spanY; i++) {
  //     const currTime = (time + i).toString() + ':00';
  //     const option = <option value={currTime}>{currTime}</option>;
  //     options.push(option);
  //   }

  //   return options;
  // }

  // function TimeEndOptions() {
  //   const currTimeStart = parseInt(start.split(':')[0]);
  //   const options = [];

  //   for (let i = currTimeStart; i < time + spanY; i++) {
  //     const currTime = i.toString() + ':00';
  //     const option = <option value={currTime}>{currTime}</option>;
  //     options.push(option);
  //   }

  //   return options;
  // }

  // return (
    //   <form className="border-box flex flex-col" action="">
    //     <label>Activity name</label>
    //     <input type="text" />

    //     <label>Day</label>

    //     <input type="date" />

    //     <label>From</label>

    //     <select defaultValue={'No Time Selected'} onChange={addTimeStart} id="timeStartSelecId" name="timeStartSelect">
    //       {TimeStartOptions()}
    //     </select>

    //     <label>End</label>

    //     <select defaultValue={'No Time Selected'} id="timeEndSelecId" name="timeEndSelect">
    //       {TimeEndOptions()}
    //     </select>

    //     <label>Type</label>

    //     <input type="text" />

    //     <div className="my-2 flex flex-row justify-center text-[1.5rem]">
    //       <button> {createElement(YesIcon, {className: ' text-[#0f5f14] mx-3'})}</button>
    //       <button onClick={addActivity}> {createElement(CancelIcon, {className: 'text-[#bf1f1f] mx-3'})}</button>
    //     </div>
    //   </form>
    // );