import { ApprovalState } from "./constants";

export interface FetchEventsRes {
    [key: string]: WorkEvent[];
  }

export interface WorkEvent {
    quantity: number;
    price: number;
    eventTypeName: string;
    isExpenseType: boolean;
    isHoursEventType: boolean;
    isAdditionalHoursEventType: boolean;
    isWorkHour: boolean;
    isApproved: boolean;
    isRejected: boolean;
    tasksCount: number;
    firstTaskStart: string;
    lastTaskEnd: string;
  }

  export interface CalendarDay {
    fullDate: string;
    year: number;
    day: number;
    month: number;
    weekday: number;
    weekdayName: string;
    dayEvents?: WorkEvent[];
    workDuration: number;
    approvalState: ApprovalState
  }

  export interface MonthsKeyValuePairs {
    [key: number]: string;
  }
  
  export interface WeekdaysKeyValuePairs {
    [key: string]: string;
  }

  export interface EventsGroupKeyValuePairs {
    [key: string]: WorkEvent[]
  }
  
  