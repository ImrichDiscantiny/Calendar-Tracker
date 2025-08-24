import {FaRegSquarePlus} from 'react-icons/fa6';
import {IconBaseProps} from 'react-icons';

import {createElement, FunctionComponent} from 'react';
import { ActivityButton } from './types';



export function AddButton({ i, j, span, buttonClick}: ActivityButton) {
  
  const PlusIcon = FaRegSquarePlus as FunctionComponent<IconBaseProps>;

  return (
    <div key={`${i + 2}-${j + 1}`}
      className={`bg-[#d3e1ff] row-start-${i + 2} col-start-${j + 1}  row-span-${span} z-50 min-h-[40px]`}
      style={{gridRowEnd: `span ${span}`,}}>
      <div  onClick={() => buttonClick(i, j-1, span)} className="group  flex  justify-center items-center h-full hover:bg-slate-300 rounded-md ">
        <button className=" text-[2rem] group-hover:text-[3rem] p-auto">{createElement(PlusIcon, {className: ''})}</button>
      </div>
    </div>      
    
  );
  
}
