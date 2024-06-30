import { createReducer, on } from '@ngrx/store';
import { loadHolidaysSuccess } from './calendar.actions';
import { Holiday } from './calendar.model';

export interface CalendarState {
  holidays: Holiday[];
}

export const initialState: CalendarState = {
  holidays: []
};

export const calendarReducer = createReducer(
  initialState,
  on(loadHolidaysSuccess, (state, { holidays }) => ({ ...state, holidays }))
);
