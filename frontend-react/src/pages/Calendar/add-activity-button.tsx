import {FaRegSquarePlus} from 'react-icons/fa6';
import {IconBaseProps} from 'react-icons';
import {createElement, FunctionComponent} from 'react';

export function AddButton() {
  const PlusIcon = FaRegSquarePlus as FunctionComponent<IconBaseProps>;
  const PlusI = createElement(PlusIcon, {color: '#fff', className: 'my-auto'});
  return (
    <div
      className="flex flex-wrap justify-center
"
    >
      <button className=" inline-block w-fit ">{createElement(PlusIcon, {className: 'text-[1.75rem]'})}</button>
    </div>
  );
}
