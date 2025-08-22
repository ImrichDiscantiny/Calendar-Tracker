import { useState, useEffect, JSX, useCallback} from 'react';


import {ActivityItem} from './activity-item';
import {AddButton} from './button-add-activity';
import { ToggleButton } from './button-toggle-row';
import { ActivityForm } from './new-activity-form';
import { CalendarItems, Activity, Row, DayItem, ActivityFormInput } from './types';
import React from 'react';


export function CalendarGrid({calendarItems}: {calendarItems: CalendarItems}) {

  const [baseLayout, setLayout] = useState<Row[]>(calendarItems.activityRows)

  const [gridItems, setItems] = useState<JSX.Element[]>([])


  const addButtonClick = useCallback((i: number, j: number, span: number) =>{

    const newLayout: Row[] = baseLayout.map((row, idx) => {
      const newDays: DayItem[][] = row.days.map((day, jdx) => { 

        if (idx !== i || jdx !== j) return day;

        if (day[0]) {
          const updatedActivity: ActivityFormInput = { index: i, j: j + 1, span };
          return day.map((cell, k) =>
            k === 0 ? { ...cell, activity: updatedActivity } : cell
          );
        }

        return day;
      });

      return { ...row, days: newDays };
    });

    setLayout(newLayout); // single call at the end

  }, [baseLayout])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const buttonClick = (i: number, j: number) =>{
  //   const newItems = gridItems.filter((el)=>{
  //     console.log(`Input: ${ el.props.i}-${ el.props.j}`)

  //     if( el.props.i!== undefined && el.props.i  === i &&  el.props.j === j){

  //       return <ActivityForm index={i} j={j} span={el.props.heightSpan}></ActivityForm>

  //     }
  //     return el
  //   })

  //   setItems(newItems)
  // }

  useEffect(() => {
    // alert(1)

    const items: JSX.Element[] = []

    baseLayout.forEach((row, i) => {
      let maxHeight = 40;
      let border_colour = '';

      // eslint-disable-next-line array-callback-return
      [timeDiv(row.time, maxHeight, i), ...row.days].forEach((day, j) => {
        if (row.isEmpty && !row.overlap && j !== 0) {
          const e = <EmptyDiv key={`${i + 2}-${j + 1}`} i={i} j={j} borderColour={border_colour} hidden={false}/>;
          items.push(e)
        }
     
        else if (Array.isArray(day) ) {
          if (day.length === 0 && row.overlap === true && row.spanIndex.includes(j) && i % 14 !== 0) {
          }
          
          else if (day.length === 1) {
            const activity = day[0];

            if (activity.activity !== null && "activity_name" in activity.activity){
              const a =  <ActivityDiv key={`${i + 2}-${j + 1}`} i={i} j={j} borderColour={border_colour} maxHeight={maxHeight} activity={activity} />
              items.push(a)
            }

            else if (activity.activity !== null && "index" in activity.activity){
              const f = <ActivityForm index={activity.activity.index} j={activity.activity.j} span={activity.activity.span}></ActivityForm>
              items.push(f)
            }
            
            else {
              const b = <AddButton i={i} j={j} span={activity.heightSpan} buttonClick={addButtonClick}></AddButton>
              items.push(b)
            }
          }
    
          else {
            const e =  <EmptyDiv key={`${i + 2}-${j + 1}`} i={i} j={j} borderColour={border_colour} hidden={true}/>;
            items.push(e)
          }
        }

        else if (j === 0  ) {
          items.push(day)
        }
      });
    });

    setItems(items)
    
  },[addButtonClick, baseLayout, calendarItems.activityRows])

  function calendarHeader(days: string[]) {
    // eslint-disable-next-line array-callback-return
    return days.map((day, index) => {
      if (index < 5) {
        return (
         <ToggleButton day={day} index={index}></ToggleButton>
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
      <div key={`${i + 1}-${j}`} className={`bg-[#d3e1ff]  row-start-${i + 2} col-start-${j} col-span-1 row-span-1 min-h-[40px] z-[50] flex flex-col`}>
        {/* <div className={`bg-[#000000] border-1 py-1 px-auto grid row-start-${i + 2} col-start-1 col-span-6 row-span-1 z-[100] place-self-center`}></div> */}
        <h2>{time}</h2>
      </div>
    );
  }

  function ActivityDiv({i, j, maxHeight, activity, borderColour}: {i: number; j: number; maxHeight: number; activity: any; borderColour: string}) {
    return (
      <div
        key={`${i + 2}-${j + 1}`}
        className={`bg-[#d3e1ff]  ${borderColour} row-start-${i + 2} col-start-${j + 1} row-span-${activity.heightSpan} z-50`}
        style={{
          gridRowEnd: `span ${activity.heightSpan}`, // This will always work
          minHeight: activity.heightSpan * maxHeight,
        }}
      >
        <ActivityItem activity={activity}></ActivityItem>
      </div>
    );
  }

  function EmptyDiv({i, j, borderColour, hidden}: {i: number; j: number; borderColour: string, hidden: boolean}) {
    let h = ''
    if(hidden=== true) h = 'hidden'
    return <div className={`bg-[#d3e1ff] ${borderColour} row-start-${i + 2} col-start-${j + 1} col-span-1 row-span-1 z-20 min-h-[40px] ${h}`} />;
  }

  return (
    <div className="bg-[#c2c2c2] grid grid-cols-[10%_repeat(5,_1fr)] grid-rows-[repeat(16,_auto)] gap-y-[1px] ">
      <div className="bg-[#d3e1ff] row-start-1 col-start-1 col-span-1 w-fill"></div>

      {/* {[calendarHeader(calendarItems.dayDates), ...grid]} */}
      {[calendarHeader(calendarItems.dayDates), gridItems]}
      
    </div>
  );
}
