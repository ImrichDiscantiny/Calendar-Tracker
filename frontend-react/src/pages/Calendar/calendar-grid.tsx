import { useState, useEffect, JSX, useCallback} from 'react';


import {ActivityItem} from './activity-item';
import {AddButton} from './button-add-activity';
import { ToggleButton } from './button-toggle-row';
import { ActivityForm } from './new-activity-form';
import { CalendarItems, Activity, Row, DayItem, ActivityFormInput } from './types';
import {EmptyDiv} from './activity-empty-item'

export function CalendarGrid({calendarItems}: {calendarItems: CalendarItems}) {

  const [baseLayout, setLayout] = useState<Row[]>([])

  const [gridItems, setItems] = useState<JSX.Element[]>([])

  const [daysClicked, setDays] = useState<boolean[]>([false, false, false, false, false, false, false])

  function getFullLayout(){
  
    if(baseLayout.length !== 0){
      return baseLayout
    }

    return calendarItems.activityRows
  }

  const addButtonClick = useCallback((i: number, j: number, span: number) =>{

    let rowsItems = getFullLayout()
    const d = daysClicked
    
    const newLayout: Row[] = rowsItems.map((row, idx) => {
      const newDays: DayItem[][] = row.days.map((day, jdx) => { 

        if (idx !== i || jdx !== j) return day;

        if (day[0]) {

          d[j] = true

          const updatedActivity: ActivityFormInput = new ActivityFormInput(i, j + 1, span );

          return day.map((cell, k) =>
            k === 0 ? { ...cell, activity: updatedActivity } : cell
          );
        }

        return day;
      });

      return { ...row, days: newDays };
    });

    setLayout(newLayout); 
    setDays(d)

  }, [daysClicked, getFullLayout, baseLayout])


  const columnClick = useCallback((isClicked: boolean, j: number) =>{
    let rowsItems = getFullLayout()
    
    if(isClicked){
      const d = daysClicked

      const newLayout: Row[] = rowsItems.map((row) => {
        const newDays: DayItem[][] = row.days.map((day, jdx) => { 
          if (jdx !== j || day[0] === null) return day;

          if (day[0] && day[0].activity instanceof ActivityFormInput) {

            d[j] = false

            return day.map((cell, k) =>
              k === 0 ? { ...cell, activity: null } : cell
            );
          }

          return day;
        });

        return { ...row, days: newDays };
      });

    setLayout(newLayout); // single call at the end
    setDays(d)

    }
    else{
      
    }
  }, [daysClicked, baseLayout,  getFullLayout])


  useEffect(()=>{
     setLayout([])
     setDays([false, false, false, false, false, false, false])
  }, [calendarItems.activityRows])


  useEffect(() => {
    const items: JSX.Element[] = []
    let rowsItems = getFullLayout()
   
    rowsItems.forEach((row, i) => {
      let maxHeight = 40;
      let border_colour = '';

      // eslint-disable-next-line array-callback-return
      [timeDiv(row.time, maxHeight, i), ...row.days].forEach((day, j) => {
        if (row.isEmpty && !row.overlap && j !== 0) {
          const e = <EmptyDiv i={i} j={j} hidden={false} buttonMove={null}/>;
          items.push(e)
        }
     
        else if (Array.isArray(day) ) {
          if (day.length === 0 && row.overlap === true && row.spanIndex.includes(j) && i % 14 !== 0) {
          }
          
          else if (day.length === 1) {
            const activity = day[0];
            
            console.log( activity.activity)
            if (activity.activity !== null &&  activity.activity instanceof Activity){
              const a =  <ActivityDiv key={`${i + 2}-${j + 1}`} i={i} j={j} borderColour={border_colour} maxHeight={maxHeight} activity={activity} />
              items.push(a)
            }

            else if (activity.activity !== null &&  activity.activity instanceof ActivityFormInput){
              const f = <ActivityForm index={activity.activity.index} j={activity.activity.j} span={activity.activity.span}></ActivityForm>
              items.push(f)
            }
            
            else {
              const b = <AddButton i={i} j={j} span={activity.heightSpan} buttonClick={addButtonClick}></AddButton>
              items.push(b)
            }
          }
    
          else {
            const e =  <EmptyDiv i={i} j={j} hidden={true} buttonMove={null}/>;
            items.push(e)
          }
        }

        else if (j === 0  ) {
          items.push(day)
        }
      });
    });

    setItems(items)
    
  },[ baseLayout])

  function calendarDays(days: string[]) {
    return days.map((day, index) => {
      if (index < 5) {
        return (
         <ToggleButton day={day} index={index} clicked={daysClicked[index]} colClick={columnClick}></ToggleButton>
        );
      }
      return null
    });
  }

  function timeDiv(t: number, maxHeight: number, i: number, j: number = 1) {
    if (i === 0 && maxHeight === 0) {
      maxHeight = 50;
    }
    const time = t.toString() + ':00';

    return (
      <div key={`${i + 1}-${j}`} className={`bg-[#d3e1ff]  row-start-${i + 2} col-start-${j} col-span-1 row-span-1 min-h-[40px] z-[50] flex flex-col`}>
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


  return (
    <div className="bg-[#c2c2c2] grid grid-cols-[10%_repeat(5,_1fr)] grid-rows-[repeat(16,_auto)] gap-y-[1px] select-none">
      <div className="bg-[#d3e1ff] row-start-1 col-start-1 col-span-1 w-fill"></div>

      {[calendarDays(calendarItems.dayDates), gridItems]}
      
    </div>
  );
}
