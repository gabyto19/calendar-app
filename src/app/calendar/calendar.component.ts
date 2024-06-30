import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadHolidays } from '../store/calendar.actions';
import { selectHolidays } from '../store/calendar.selectors';
import { Holiday } from '../store/calendar.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  dates: Date[] = [];
  holidays$: Observable<Holiday[]>;
  currentMonth: string | undefined;
  currentYear: number | undefined;

  constructor(private store: Store) {
    this.holidays$ = this.store.select(selectHolidays);
  }

  ngOnInit(): void {
    this.store.dispatch(loadHolidays());
    this.generateCalendar();
  }

  generateCalendar(): void {
    const now = new Date();
    this.currentMonth = now.toLocaleString('default', { month: 'long' });
    this.currentYear = now.getFullYear();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    this.dates = [];
    for (let i = 1; i <= end.getDate(); i++) {
      this.dates.push(new Date(now.getFullYear(), now.getMonth(), i));
    }
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }

  isHoliday(date: Date): boolean {
    let isHoliday = false;
    this.holidays$.subscribe(holidays => {
      isHoliday = holidays.some(holiday =>
        holiday.date.getDate() === date.getDate() &&
        holiday.date.getMonth() === date.getMonth() &&
        holiday.date.getFullYear() === date.getFullYear()
      );
    });
    return isHoliday;
  }
}
