import {Activity} from './activity-cell';
import {AddButton} from './add-activity-button';

interface CalendarItems {
  dateID: Date;
  activityRows: any[];
  dayDates: string[];
}

export function CalendarGrid({calendarItems}: {calendarItems: CalendarItems}) {
  function calendarHeader(days: string[]) {
    return days.map((day, index) => {
      if (index < 5) {
        return (
          <div
            key={`${0}-${index}`}
            className={`row-start-1 col-start-${
              index + 2
            } col-span-1 flex flex-row justify-between rounded-lg border-2 border-[#0f285f] mx-auto my-2 p-0`}
          >
            <span className="mx-2 my-auto text-lg">{day}</span>
            <button className="p-3 bg-[#0f285f] text-white">+</button>
          </div>
        );
      }
    });
  }

  function timeDiv(t: number, maxHeight: number, i: number, j: number = 1) {
    if (i === 0 && maxHeight === 0) {
      maxHeight = 50;
    }
    const time = t.toString() + ':00';

    return (
      <div key={`${i + 1}-${j}`} className={`  row-start-${i + 2} col-start-${j} col-span-1 row-span-1 h-[${maxHeight}px] z-[50] flex flex-col`}>
           <div className={`bg-[#000000] border-1 py-1 px-auto grid row-start-${i + 2} col-start-1 col-span-6 row-span-1 z-[100] place-self-center`}></div>


        <h2>{time}</h2>
      </div>
    );
  }

  function ActivityDiv({i, j, maxHeight, activity, borderColour}: {i: number; j: number; maxHeight: number; activity: any; borderColour: string}) {
    return (
      <div
        key={`${i + 2}-${j + 1}`}
        className={`  ${borderColour} row-start-${i + 2} col-start-${j + 1} row-span-${activity.heightSpan} z-50`}
        style={{
          gridRowEnd: `span ${activity.heightSpan}`, // This will always work
          minHeight: activity.heightSpan * maxHeight,
        }}
      >
        <Activity activity={activity}></Activity>
      </div>
    );
  }

  function EmptyDiv({i, j, borderColour}: {i: number; j: number; borderColour: string}) {
    return <div className={`${borderColour} row-start-${i + 2} col-start-${j + 1} col-span-1 row-span-1 z-20 min-h-[25px]`} />;
  }

  function ButtonDiv({i, j, row, activity, borderColour}: {i: number; j: number; row: any; activity: any; borderColour: string}) {
    return (
      <div
        key={`${calendarItems.dateID}-${i + 2}-${j + 1}`}
        className={` ${borderColour} row-start-${i + 2} col-start-${j + 1}  row-span-${activity.heightSpan} z-50 min-h-[25px]`}
        style={{
          gridRowEnd: `span ${activity.heightSpan}`,
        }}
      >
        <AddButton time={row.time} spanY={activity.heightSpan}></AddButton>
      </div>
    );
  }

  function TimeRow(): any[] {
    return calendarItems.activityRows.map((row, i) => {
      let maxHeight = 40;
      let border_colour = '';

      return [timeDiv(row.time, maxHeight, i), ...row.days].map((day, j) => {
        if (row.isEmpty && !row.overlap && j !== 0) {
          <EmptyDiv key={`${i + 2}-${j + 1}`} i={i} j={j} borderColour={border_colour} />;
        }
        
        else if (j === 0) {
          return day;
        }
     
        else {
          if (day.length === 0 && row.overlap === true && row.spanIndex.includes(j) && i % 14 !== 0) {
            // console.log('index', i + 2, 'j:', j + 1, row.spanIndex, row.spanIndex.includes(j));
            return null;
          }

          
          else if (day.length === 1) {
            const activity = day[0];
            if (activity.activity !== null) return <ActivityDiv key={`${i + 2}-${j + 1}`} i={i} j={j} borderColour={border_colour} maxHeight={maxHeight} activity={activity} />;
            else return <ButtonDiv key={`${i + 2}-${j + 1}`} i={i} j={j} borderColour={border_colour} row={row} activity={activity} />;
          }
       
          else {
            return <EmptyDiv key={`${i + 2}-${j + 1}`} i={i} j={j} borderColour={border_colour} />;
          }
        }
      });
    });
  }

  return (
    <div className=" grid grid-cols-[10%_repeat(5,_1fr)] grid-rows-[repeat(16,_auto)] gap-y-2 ">
      <div className="row-start-1 col-start-1 col-span-1 w-[50%]"></div>

      {[calendarHeader(calendarItems.dayDates), ...TimeRow()]}
    </div>
  );
}
