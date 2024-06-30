import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CalendarState } from './calendar.reducer';

export const selectCalendarState = createFeatureSelector<CalendarState>('calendar');

export const selectHolidays = createSelector(
  selectCalendarState,
  (state: CalendarState) => state.holidays
);
