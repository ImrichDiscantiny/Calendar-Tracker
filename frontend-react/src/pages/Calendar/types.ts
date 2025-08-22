enum ActivityEnum {
  school = "school",
  work = "work",
  workout = "workout",
  free_time = "free_time",
  other = "other",
}

export interface Activity{
  id: number;
  activity_name: string;
  activity_time_start: string;
  activity_time_end: string;
  activity_type: ActivityEnum; // e.g. "workout"
  description: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}



export interface DayItem {
  activity: Activity | ActivityFormInput | null;
  heightSpan: number;
}

export interface Row {
  time: number;
  days: DayItem[][];
  isEmpty: boolean;
  overlap: boolean;
  maxHeight: number;
  spanIndex: number[];
}


export interface ActivityFormInput {
  index: number;
  j: number;
  span: number;
}


export type ButtonClick = (i: number, j: number, span: number) => void;

export interface ActivityButton {
  i: number;
  j: number;
  span: number;
  buttonClick: ButtonClick
}


export interface CalendarItems {
  dateID: Date;
  activityRows: Row[];
  dayDates: string[];
}

