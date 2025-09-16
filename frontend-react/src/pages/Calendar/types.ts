enum ActivityEnum {
  school = "school",
  work = "work",
  workout = "workout",
  free_time = "free_time",
  other = "other",
}

interface activity {
  id: number;
  activity_name: string;
  activity_time_start: string;
  activity_time_end: string;
  activity_type: ActivityEnum;
  description: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export class Activity {
  id!: number;
  activity_name!: string;
  activity_time_start!: string;
  activity_time_end!: string;
  activity_type!: ActivityEnum;
  description!: string;
  user_id!: number;
  created_at!: string;
  updated_at!: string;

  constructor(result: activity){

    this.id = result.id;
    this.activity_name = result.activity_name;
    this.activity_time_start = result.activity_time_start;
    this.activity_time_end = result.activity_time_end;
    this.activity_type = result.activity_type
    this.description = result.description
    this.user_id = result.user_id
    this.created_at = result.created_at
    this.updated_at = result.updated_at;
  }
}


export interface ActivityFormInput {
  index: number;
  j: number;
  span: number;
  selectOptionClick: CallableFunction
  colClick: boolean;

}

export interface CalendarItems {
  dateID: Date;
  activityRows: Row[];
  dayDates: string[];
}


export interface DayColumn {
  activity: Activity | ActivityFormInput | null;
  heightSpan: number;
}

export interface Row {
  time: number;
  days: DayColumn[][];
  isEmpty: boolean;
  overlap: boolean;
  maxHeight: number;
  spanIndex: number[];
}


export type ButtonClick = (i: number, j: number, span: number) => void;

export interface ActivityButton {
  i: number;
  j: number;
  span: number;
  buttonClick: ButtonClick
}

