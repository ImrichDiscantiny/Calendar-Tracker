import {createElement, FunctionComponent, useState, useRef, useEffect} from 'react';
import {IconBaseProps} from 'react-icons';
import {FaArrowLeft} from 'react-icons/fa';
import {FaArrowRight} from 'react-icons/fa';
import calendarHeader from './map-calendar-header';
import calendarTable from './map-calendar-row';
interface DayItem {
  activity: any | null;
  heightSpan: number;
  isEmpty: boolean;
}

interface Row {
  time: number;
  days: [DayItem[], DayItem[], DayItem[], DayItem[], DayItem[]];
  isEmpty: boolean;
  overlap: boolean;
  maxHeight: number;
  spanIndex: number[];
}

export function CalendarMain() {
  const [currDates, setDates] = useState(['Po', 'Ut', 'Str', 'Št', 'Pia', 'So', 'Ne']);
  const [firstDayInWeek, setFirstDay] = useState(new Date());
  const [activities, setActivities] = useState<any[]>([]);

  const LeftArrowIcon = FaArrowLeft as FunctionComponent<IconBaseProps>;
  const RightArrowIcon = FaArrowRight as FunctionComponent<IconBaseProps>;

  const hasInitialized = useRef(false);

  if (!hasInitialized.current) {
    const currDate = new Date();
    const currDay = currDate.getDay() - 1;
    const firstDay = new Date();
    firstDay.setDate(currDate.getDate() - currDay);

    updateDays(firstDay);
    hasInitialized.current = true;
  }

  useEffect(() => {
    const lastDayInWeek = new Date(firstDayInWeek.getTime() + 5 * 24 * 60 * 60 * 1000);

    const [first, last] = get_YYYY_MM_DD(firstDayInWeek, lastDayInWeek);
    fetch(`/api/activity/${first}/${last}`)
      .then((res) => res.json())
      .then((data) => {
        setActivities(organiseActivities(data.result));
        console.log('Data:', activities);
      })
      .catch((err) => console.error('Fetch error:', err));
  }, [firstDayInWeek]);

  function organiseActivities(activities: any[]) {
    const currentWorktimes: Row[] = [];
    for (let i = 6; i < 19; i++) {
      currentWorktimes.push({
        time: i,
        days: [[], [], [], [], []],
        isEmpty: true,
        maxHeight: 0,
        overlap: false,
        spanIndex: [],
      });
    }

    if (activities.length === 0) {
      console.log('old');
      return currentWorktimes;
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

      console.log(activities[i], workIndex, startHours);

      for (let j = workIndex; j < workIndex + duration; j++) {
        const currTime = currentWorktimes[j];

        if (workIndex < 13 && startHours === currTime.time) {
          const row = {activity, heightSpan: duration === 0.5 ? 1 : duration, isEmpty: false};

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

    console.log('new');
    return currentWorktimes;

    // newWorktimes = currentWorktimes.map((t) => {
    //   if (startHours === t.time) {
    //     const row = {activity, heightSpan: duration === 0.5 ? 1 : duration, isEmpty: false};

    //     t.days[dayIndex].push(row);

    //     const currLen = t.days[dayIndex].length;
    //     if (currLen > t.maxHeight) t.maxHeight = currLen;

    //     t.isEmpty = false;
    //     saved = true;
    //     return t;
    //   } else {
    //     if (saved && spanCounter > 0) {
    //       t.overlap = true;
    //       spanCounter--;
    //       t.spanIndex.push(dayIndex + 1);
    //     }
    //     return t;
    //   }
    // });

    // aggregate timestamps based on day
  }

  function get_YYYY_MM_DD(first: Date, last: Date) {
    const firstDate = first.getFullYear() + '-' + (first.getMonth() + 1) + '-' + first.getDate();
    const lastDate = last.getFullYear() + '-' + (last.getMonth() + 1) + '-' + last.getDate();

    return [firstDate, lastDate];
  }

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

    console.log(newDays);
    setFirstDay(firstDay);

    setDates(newDays);
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

  return (
    <div className=" bg-[#d3e1ff] rounded-lg border-2 border-[#0f285f] relative">
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
        <div className="grid grid-cols-[10%_repeat(5,_1fr)] grid-rows-[repeat(15,_auto)] gap-y-2">
          <div className="row-start-1 col-start-1 col-span-1 w-[50%]"></div>

          {[calendarHeader(currDates), ...calendarTable(activities)]}
        </div>
      </section>
    </div>
  );
}
