

import {useState, createElement, FunctionComponent, useEffect} from 'react';
import { ActivityFormInput} from './types';


export function ActivityForm({ index, j, span}: ActivityFormInput) {

  const [clicked, setClicked] = useState(false);
  const divRows = []
  
  console.log(span)
  for(let i=index; i < index + span;i++){
      const row = <div key={`c-${index + 2}-${j + 1}`}
      className="bg-[#d3e1ff] z-40 min-h-[40px]"
      style={{
          gridRowStart: i + 2,
          gridColumnStart: j + 1,
          gridRowEnd: `span ${1}`,
          gridColumnEnd: `span ${1}`,
      }}
      >
      {i}
      </div>
      divRows.push(row)
  }

  return <>{divRows}</>
 
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