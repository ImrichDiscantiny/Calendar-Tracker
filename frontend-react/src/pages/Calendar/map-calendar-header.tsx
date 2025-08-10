export default function calendarHeader(days: string[]) {
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
