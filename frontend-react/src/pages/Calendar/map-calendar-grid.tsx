import {Activity} from './activity-cell';
import {AddButton} from './add-activity-button';

export default function calendarRow(rows: any[]) {
  function rowHeader(t: number, maxHeight: number, i: number, j: number = 1) {
    if (i === 0 && maxHeight === 0) {
      maxHeight = 50;
    }
    const time = t.toString() + ':00';

    return (
      <div key={`${i + 1}-${j}`} className={`  row-start-${i + 2} col-start-${j} col-span-1 row-span-1 h-[${maxHeight}px] `}>
        <h2>{time}</h2>
      </div>
    );
  }

  return rows.map((row, i) => {
    let maxHeight = 50;
    let border_colour = '';

    return [rowHeader(row.time, maxHeight, i), ...row.days].map((day, j) => {
      if (row.isEmpty && !row.overlap) {
        if (i % 14 === 0) {
          if (j === 0) return day;
          else
            return (
              <div
                key={`${i + 2}-${j + 1}`}
                className={` ${border_colour} row-start-${i + 2} col-start-${j + 1} col-span-1 row-span-1 z-10`}
              ></div>
            );
        }
        // your comment 2
        else {
          return (
            <div
              key={`${i + 2}-${j + 1}`}
              className={` row-start-${i + 2} col-start-${j + 1} col-span-1 row-span-1 z-10 h-min-[10px]`}
            ></div>
          );
        }
      }
      // your comment 2
      else if (j === 0 && !row.isEmpty) {
        return day;
      }
      // your comment 2
      else {
        // your comment 2
        if (day.length === 0 && row.overlap === true && row.spanIndex.includes(j) && i % 14 !== 0) {
          // console.log('index', i + 2, 'j:', j + 1, row.spanIndex, row.spanIndex.includes(j));
          return null;
        }

        // your comment 2
        else if (day.length === 1) {
          const activity = day[0];
          if (activity.activity !== null) {
            return (
              <div
                key={`${i + 2}-${j + 1}`}
                className={`  ${border_colour} row-start-${i + 2} col-start-${j + 1} row-span-${activity.heightSpan} z-50`}
                style={{
                  gridRowEnd: `span ${activity.heightSpan}`, // This will always work
                  minHeight: activity.heightSpan * maxHeight,
                }}
              >
                <Activity activity={activity}></Activity>
              </div>
            );
          } else {
            console.log('index', i + 2, 'j:', j + 1, row.spanIndex, row.spanIndex.includes(j));

            return (
              <div
                key={`${i + 2}-${j + 1}`}
                className={` ${border_colour} row-start-${i + 2} col-start-${j + 1}  row-span-${activity.heightSpan} z-50 `}
                style={{
                  gridRowEnd: `span ${activity.heightSpan}`,
                }}
              >
                <AddButton time={row.time} spanY={activity.heightSpan}></AddButton>
              </div>
            );
          }
        }

        // your comment 2
        else {
          return (
            <div
              key={`${i + 2}-${j + 1}`}
              className={`${border_colour} row-start-${i + 2} col-start-${j + 1} col-span-1 row-span-1 z-10 h-min-[10px] `}
            >
              {' '}
            </div>
          );
        }
      }
    });
  });
}
