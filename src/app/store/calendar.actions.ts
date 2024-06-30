import { createAction, props } from '@ngrx/store';
import { Holiday } from './calendar.model';

export const loadHolidays = createAction('[Calendar] Load Holidays');
export const loadHolidaysSuccess = createAction('[Calendar] Load Holidays Success', props<{ holidays: Holiday[] }>());
