import {createElement, FunctionComponent, useState, useRef, useEffect, useMemo, useContext} from 'react';
import {IconBaseProps} from 'react-icons';
import {FaArrowLeft} from 'react-icons/fa';
import {FaArrowRight} from 'react-icons/fa';

import {CalendarGrid} from './calendar-grid';
import { Activity, Row } from './types';



export function CalendarMain() {
  const [currDates, setDates] = useState(['Po', 'Ut', 'Str', 'Št', 'Pia', 'So', 'Ne']);
  const [firstDayInWeek, setFirstDay] = useState(new Date());
  const [activities, setActivities] = useState<Activity[]>([]);

  const LeftArrowIcon = FaArrowLeft as FunctionComponent<IconBaseProps>;
  const RightArrowIcon = FaArrowRight as FunctionComponent<IconBaseProps>;

  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current) return;
    const lastDayInWeek = new Date(firstDayInWeek.getTime() + 5 * 24 * 60 * 60 * 1000);

    const [first, last] = get_YYYY_MM_DD(firstDayInWeek, lastDayInWeek);
    console.log('Time:', first, last);

    fetch(`/api/activity/${first}/${last}`)
      .then((res) => res.json())
      .then((data) => {
        setActivities(data.result);
      })
      .catch((err) => console.error('Fetch error:', err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstDayInWeek]);

  const organiseActivities = useMemo(() => {
    const currentWorktimes: Row[] = [];

    for (let i = 6; i < 21; i++) {
      currentWorktimes.push({
        time: i,
        days: [[], [], [], [], []],
        isEmpty: true,
        maxHeight: 0,
        overlap: false,
        spanIndex: [],
      });
    }

    // place activities inside calendar
    for (let i = 0; i < activities.length; i++) {
      const activity = activities[i];
      const start = new Date(activity.activity_time_start);
      const end = new Date(activity.activity_time_end);
      const startHours = start.getHours();
      const endHours = end.getHours();
      const duration = endHours - startHours < 1 ? 1 : endHours - startHours;
      const dayIndex = start.getDay() - 1;

      let spanCounter = duration - 1;
      let saved = false;

      const workIndex = startHours - 6;

      // console.log(activities[i], workIndex, startHours);

      for (let j = workIndex; j < workIndex + duration; j++) {
        const currTime = currentWorktimes[j];

        if (workIndex < 13 && startHours === currTime.time) {
          const row = {activity, heightSpan: duration === 0.5 ? 1 : duration};

          currTime.days[dayIndex].push(row);

          const currLen = currTime.days[dayIndex].length;
          if (currLen > currTime.maxHeight) currTime.maxHeight = currLen;

          currTime.isEmpty = false;
          saved = true;
        } else if (saved && spanCounter > 0) {
          currTime.overlap = true;
          spanCounter--;
          currTime.spanIndex.push(dayIndex + 1);
        }
      }
    }

    const wlen = currentWorktimes.length;

    for (let i = 0; i < 5; i++) {
      let startIndex = -1;
      let spanH = 0;

      for (let j = 0; j < wlen; j++) {
        if (currentWorktimes[j].days[i].length === 0) {
          if (startIndex === -1) {
            startIndex = j;
            currentWorktimes[j].isEmpty = false;
          } else {
            currentWorktimes[j].overlap = true;
            currentWorktimes[j].spanIndex.push(i + 1);
          }
          spanH++;
        } else if (currentWorktimes[j].days[i].length !== 0) {
          let jumpSpan = 0;
          currentWorktimes[j].days[i].map((day) => {
            if (day.heightSpan > jumpSpan) {
              jumpSpan = day.heightSpan;
            }
          });

          j = j + jumpSpan - 1;

          if (spanH !== 0) {
            const row = {activity: null, heightSpan: spanH};
            currentWorktimes[startIndex].days[i].push(row);
          }
          spanH = 0;
          startIndex = -1;
        }
        // if (spanH / 5 === 1 && spanH !== 0) {
        //   const row = {activity: null, heightSpan: spanH};
        //   currentWorktimes[startIndex].days[i].push(row);
        //   spanH = 0;
        //   startIndex = -1;
        // }
      }

      if (spanH !== 0) {
        const row = {activity: null, heightSpan: spanH};
        currentWorktimes[startIndex].days[i].push(row);
      }
    }

    // console.log('new', currentWorktimes);
    return currentWorktimes;
  }, [activities]);

  function updateDays(firstDay: Date) {
    const days = ['Po', 'Ut', 'Str', 'Št', 'Pia', 'So', 'Ne'];

    const newDays = currDates.map((day, index) => {
      if (index === 0) {
        return days[0] + ' - ' + firstDay.getDate() + '.' + (firstDay.getMonth() + 1);
      } else {
        const currDate = new Date(firstDay.getTime() + index * 24 * 60 * 60 * 1000);

        return days[index] + ' - ' + currDate.getDate() + '.' + (currDate.getMonth() + 1);
      }
    });

    setFirstDay(firstDay);

    setDates(newDays);
  }

  function get_YYYY_MM_DD(first: Date, last: Date) {
    const firstDate = first.getFullYear() + '-' + (first.getMonth() + 1) + '-' + first.getDate();
    const lastDate = last.getFullYear() + '-' + (last.getMonth() + 1) + '-' + last.getDate();

    return [firstDate, lastDate];
  }

  const moveWeekAhead = () => {
    const newDate = new Date(firstDayInWeek.getTime() + 7 * 24 * 60 * 60 * 1000);
    console.log(newDate);
    updateDays(newDate);
  };

  const moveWeeBack = () => {
    const newDate = new Date(firstDayInWeek.getTime() - 7 * 24 * 60 * 60 * 1000);
    console.log(newDate);
    updateDays(newDate);
  };

  if (!hasInitialized.current) {
    const currDate = new Date();
    const currDay = currDate.getDay() - 1;
    const firstDay = new Date();
    firstDay.setDate(currDate.getDate() - currDay);

    updateDays(firstDay);
    hasInitialized.current = true;
  }

  return (
    <div className=" bg-[#d3e1ff] rounded-lg border-2 border-[#5f0f0f] relative">
      <div className="flex flex-row justify-center">
        {createElement(LeftArrowIcon, {size: 40, color: '#0f285f', className: 'my-auto  mx-4', onClick: moveWeeBack})}
        <div className="flex flex-col">
          <input className="bg-[#dae4f3] m-2 p-1 border-2 border-[#0f285f] rounded-lg text-[1.25em]" type="date" />
          <button className="bg-[#0f285f] px-5 m-1 border-2 border-[#0f285f] rounded-lg text-[1.15em] self-center text-white">
            Pick
          </button>
        </div>

        {createElement(RightArrowIcon, {size: 40, color: '#0f285f', className: 'my-auto mx-4', onClick: moveWeekAhead})}
      </div>
    
      <section>
        <CalendarGrid calendarItems={{dateID: firstDayInWeek, dayDates: currDates, activityRows: organiseActivities}} />
      </section>

    </div>
  );
}
