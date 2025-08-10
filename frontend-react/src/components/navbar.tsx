import {NavLink} from 'react-router-dom';
import {createElement, FunctionComponent} from 'react';

import {IoMdHome, IoIosStats} from 'react-icons/io';
import {FaCalendarAlt} from 'react-icons/fa';
import {IconBaseProps} from 'react-icons';
import './navbar.css';

export function Navbar() {
  // Type-safe icon references
  const HomeIcon = IoMdHome as FunctionComponent<IconBaseProps>;
  const CalendarIcon = FaCalendarAlt as FunctionComponent<IconBaseProps>;
  const StatsIcon = IoIosStats as FunctionComponent<IconBaseProps>;

  return (
    <nav className="bg-[#0f285f] flex flex-row justify-center">
      <NavLink className="" to="/">
        {({isActive}) => (
          <div className="p-1 px-2 border-r-[1px] border-[#fff] flex flex-row justify-between gap-1 items-center">
            {createElement(HomeIcon, {size: 20, color: '#fff', className: 'my-auto'})}
            <span className={isActive ? 'active-span font-semibold' : 'text-[#fff]'}>Home</span>
          </div>
        )}
      </NavLink>

      <NavLink className="" to="/timeline">
        {({isActive}) => (
          <div className="p-1 px-2 border-r-[1px] border-[#fff] flex flex-row justify-between gap-1 items-center">
            {createElement(CalendarIcon, {size: 16, color: '#fff', className: 'my-auto'})}
            <span className={isActive ? 'active-span font-semibold' : 'text-[#fff]'}>Activities</span>
          </div>
        )}
      </NavLink>

      <NavLink className="" to="/stats">
        {({isActive}) => (
          <div className="p-1 px-2 flex flex-row justify-between gap-1 items-center">
            {createElement(StatsIcon, {size: 20, color: '#fff', className: 'my-auto'})}
            <span className={isActive ? 'active-span font-semibold' : 'text-[#fff]'}>Statistics</span>
          </div>
        )}
      </NavLink>
    </nav>
  );
}
