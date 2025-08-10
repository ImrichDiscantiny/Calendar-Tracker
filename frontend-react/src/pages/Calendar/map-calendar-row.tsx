import {Activity} from './activity';
import {AddButton} from './add-activity-button';

export default function calendarRow(rows: any[]) {
  const emptyHeight = 0;
  const fullHeight = 0;

  let lastEmpty = false;

  function rowHeader(t: number, maxHeight: number, i: number, j: number = 1) {
    if (i === 0 && maxHeight === 0) {
      maxHeight = 50;
    }
    const time = t.toString() + ':00';

    if (i === 0) {
      return (
        <div key={`${i + 1}-${j}`} className={`row-start-${i + 2} col-start-${j} col-span-1 row-span-1 h-[${maxHeight}px] `}>
          <h2>{time}</h2>
        </div>
      );
    } else {
      return (
        <div
          key={`${i + 1}-${j}`}
          className={`border-t-[1px] border-black row-start-${
            i + 2
          } col-start-${j} col-span-1 row-span-1 h-[${maxHeight}px] `}
        >
          <h2>{time}</h2>
        </div>
      );
    }
  }

  return rows.map((row, i) => {
    let maxHeight: number;
    let border_colour = '';

    if (row.isEmpty && row.overlap) maxHeight = 50;
    else maxHeight = row.maxHeight * 50;

    if (i) {
      border_colour = 'border-t-[1px] border-black';
    }

    return [rowHeader(row.time, maxHeight, i), ...row.days].map((day, j) => {
      if (row.isEmpty && !row.overlap) {
        if (i % 12 === 0) {
          if (j === 0) return day;
          else
            return (
              <div
                key={`${i + 2}-${j + 1}`}
                className={`${border_colour} row-start-${i + 2} col-start-${j + 1} col-span-1 row-span-1 z-10`}
              ></div>
            );
        }
        // your comment 2
        else {
          return (
            <div
              key={`${i + 2}-${j + 1}`}
              className={` row-start-${i + 2} col-start-${j + 1} col-span-1 row-span-1 z-10`}
            ></div>
          );
        }
      }
      // your comment 2
      else if (j === 0) {
        return day;
      }
      // your comment 2
      else {
        // your comment 2
        if (day.length === 0 && row.overlap === true && row.spanIndex.includes(j)) {
          console.log('index', i + 2, 'j:', j + 1, row.spanIndex, row.spanIndex.includes(j));
          return null;
        }

        // your comment 2
        else if (day.length === 1 && day[0].isEmpty === false) {
          return (
            <div
              key={`${i + 2}-${j + 1}`}
              className={`${border_colour} row-start-${i + 2} col-start-${j + 1} row-span-${day[0].heightSpan} z-50 `}
              style={{
                gridRowEnd: `span ${day[0].heightSpan}`, // This will always work
              }}
            >
              <Activity activity={day[0]}></Activity>
            </div>
          );
        }

        // your comment 2
        else {
          return (
            <div
              key={`${i + 2}-${j + 1}`}
              className={`${border_colour} row-start-${i + 2} col-start-${j + 1} col-span-1 row-span-1 z-10 `}
            >
              {' '}
              <AddButton></AddButton>
            </div>
          );
        }
      }
    });
  });
}
