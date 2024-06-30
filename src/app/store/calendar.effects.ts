import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { loadHolidays, loadHolidaysSuccess } from './calendar.actions';
import { Holiday } from './calendar.model';
import { environment } from '../../environments/environment';

@Injectable()
export class CalendarEffects {
  loadHolidays$ = createEffect(() => this.actions$.pipe(
    ofType(loadHolidays),
    mergeMap(() => {
      // Use environment.apiUrl if needed to fetch data from an API
      const holidays: Holiday[] = [
        { date: new Date('2023-08-15'), name: 'Holiday 1' },
        { date: new Date('2023-08-25'), name: 'Holiday 2' }
      ];
      return of(loadHolidaysSuccess({ holidays }));
    })
  ));

  constructor(private actions$: Actions) {}
}
