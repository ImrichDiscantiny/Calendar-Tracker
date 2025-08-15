import {FaRegSquarePlus} from 'react-icons/fa6';
import {IconBaseProps} from 'react-icons';
import {FaCheck} from 'react-icons/fa';
import {MdCancel} from 'react-icons/md';

import {useState, createElement, FunctionComponent} from 'react';

interface ActivityButton {
  time: number;
  spanY: number;
}

export function AddButton({time, spanY}: ActivityButton) {
  const [clicked, setClicked] = useState(false);
  const [start, setStart] = useState('');

  const PlusIcon = FaRegSquarePlus as FunctionComponent<IconBaseProps>;
  const YesIcon = FaCheck as FunctionComponent<IconBaseProps>;
  const CancelIcon = MdCancel as FunctionComponent<IconBaseProps>;

  const defaultOption = 'Not picked';

  const addActivity = () => {
    setClicked(!clicked);
  };

  const addTimeStart = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStart(e.target.value);
  };

  function TimeStartOptions() {
    const def = <option selected={true}>{defaultOption}</option>;
    const options = [def];

    for (let i = 0; i < spanY; i++) {
      const currTime = (time + i).toString() + ':00';
      const option = <option value={currTime}>{currTime}</option>;
      options.push(option);
    }

    return options;
  }

  function TimeEndOptions() {
    const currTimeStart = parseInt(start.split(':')[0]);
    const options = [];

    for (let i = currTimeStart; i < time + spanY; i++) {
      const currTime = i.toString() + ':00';
      const option = <option value={currTime}>{currTime}</option>;
      options.push(option);
    }

    return options;
  }

  if (clicked) {
    return (
      <form className="border-box flex flex-col" action="">
        <label>Activity name</label>
        <input type="text" />

        <label>Day</label>

        <input type="date" />

        <label>From</label>

        <select defaultValue={'No Time Selected'} onChange={addTimeStart} id="timeStartSelecId" name="timeStartSelect">
          {TimeStartOptions()}
        </select>

        <label>End</label>

        <select defaultValue={'No Time Selected'} id="timeEndSelecId" name="timeEndSelect">
          {TimeEndOptions()}
        </select>

        <label>Type</label>

        <input type="text" />

        <div className="my-2 flex flex-row justify-center text-[1.5rem]">
          <button> {createElement(YesIcon, {className: ' text-[#0f5f14] mx-3'})}</button>
          <button onClick={addActivity}> {createElement(CancelIcon, {className: 'text-[#bf1f1f] mx-3'})}</button>
        </div>
      </form>
    );
  } else {
    return (
      <div onClick={addActivity} className="group  flex  justify-center items-center h-full hover:bg-slate-300 rounded-md ">
        <button className=" text-[2rem] group-hover:text-[3rem] p-auto">{createElement(PlusIcon, {className: ''})}</button>
      </div>
    );
  }
}
