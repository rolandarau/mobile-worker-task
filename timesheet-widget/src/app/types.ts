import { ApprovalState, EventTypes } from "./constants";

export interface FetchEventsRes {
    [key: number]: WorkEvent;
  }

export interface WorkEvent {
    date: string;
    quantity: number;
    price: number;
    eventTypeName: string;
    isExpenseType: boolean;
    isHoursEventType: boolean;
    isAdditionalHoursEventType: boolean;
    isWorkHour: boolean;
    isApproved: boolean;
    isRejected: boolean;
    tasksCount: boolean;
    firstTaskStart: string;
    lastTaskEnd: string;
  }
  
  export interface WorkEvent {
    id: string;
    date: string;
    quantity: number;
    price: number;
    eventTypeName: string;
    isExpenseType: boolean;
    isHoursEventType: boolean;
    isAdditionalHoursEventType: boolean;
    isWorkHour: boolean;
    isApproved: boolean;
    isRejected: boolean;
    tasksCount: boolean;
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
  
  