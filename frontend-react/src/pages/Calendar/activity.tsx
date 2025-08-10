export function Activity({activity}: {activity: any}) {
  return (
    <div className="  flex flex-col mx-1 bg-red-600">
      <span>{activity.activity.activity_name}</span>
      <span>{new Date(activity.activity.activity_time_start).toDateString()}</span>
      <span>{new Date(activity.activity.activity_time_start).toLocaleTimeString()}</span>
      <span>{new Date(activity.activity.activity_time_end).toDateString()}</span>
      <span>{new Date(activity.activity.activity_time_end).toLocaleTimeString()}</span>
    </div>
  );
}
