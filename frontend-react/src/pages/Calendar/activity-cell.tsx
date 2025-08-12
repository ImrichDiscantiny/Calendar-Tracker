import {MdAccessTime} from 'react-icons/md';

import {FaHourglassStart} from 'react-icons/fa';
import {createElement, FunctionComponent} from 'react';
import {IconBaseProps} from 'react-icons';

export function Activity({activity}: {activity: any}) {
  const currDate = new Date(activity.activity.activity_time_start);
  const endingDate = new Date(activity.activity.activity_time_end);
  const currTime = currDate.toLocaleTimeString();

  // Time Difference in Milliseconds
  const milliDiff: number = currDate.getTime() - endingDate.getTime();
  const totalSeconds = Math.floor(milliDiff / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);

  const timeIcon = MdAccessTime as FunctionComponent<IconBaseProps>;
  const DurationIcon = FaHourglassStart as FunctionComponent<IconBaseProps>;

  return (
    <div className="border-2  flex flex-col mx-1 border-[#0f285f] h-full text-[1rem]">
      <span className="bg-[#0f285f] text-white font-semibold">{activity.activity.activity_name}</span>

      <div className="flex flex-row ml-1">
        {createElement(timeIcon, {className: 'my-auto'})}
        <span className="ml-1">{currTime}</span>
      </div>
      <div className="flex flex-row  ml-1">
        {' '}
        {createElement(DurationIcon, {className: 'my-auto'})}
        <span className="ml-1">{totalMinutes + ' Min.'}</span>
      </div>
    </div>
  );
}
