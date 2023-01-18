import React from 'react';
import { FaAngleLeft } from 'react-icons/fa';
import { FaAngleRight } from 'react-icons/fa';

import styles from '../../styles/pages/_Schedule.module.scss';

const Calendar = ({
  year,
  month,
  setMonth,
  setYear,
  selected,
  today,
  changeCurrentDay,
}) => {
  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  let firstDayOfMonth = new Date(year, month);
  let weekdayOfFirstDay = firstDayOfMonth.getDay();
  let calendarDays = [];

  //fills calendar with days from calendarDays array
  for (let day = 0; day < 42; day++) {
    if (day === 0 && weekdayOfFirstDay === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
    } else if (day === 0) {
      firstDayOfMonth.setDate(
        firstDayOfMonth.getDate() + (day - weekdayOfFirstDay)
      );
    } else {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }

    //define properties of each calendar day
    let calendarDay = {
      currentMonth: firstDayOfMonth.getMonth() === selected.getMonth(),
      date: new Date(firstDayOfMonth),
      month: firstDayOfMonth.getMonth(),
      number: firstDayOfMonth.getDate(),
      selected: firstDayOfMonth.toDateString() === selected.toDateString(),
      year: firstDayOfMonth.getFullYear(),
    };
    //add a day to array
    calendarDays.push(calendarDay);
  }

  const handleChangeMonth = (to) => {
    switch (to) {
      case 'prev':
        month == 0 ? (setMonth(11), setYear(year - 1)) : setMonth(month - 1);
        break;
      case 'next':
        month == 11 ? (setMonth(0), setYear(year + 1)) : setMonth(month + 1);
        break;
      default:
        null;
    }
  };
  return (
    <div className={styles['calendar']}>
      <h6>Pick date for Light Seminar</h6>
      <div className={styles['calendar_header']}>
        <FaAngleLeft
          style={{ cursor: 'pointer' }}
          onClick={() => handleChangeMonth('prev')}
        />
        <p>
          {MONTHS[month]} {year}
        </p>
        <FaAngleRight
          style={{ cursor: 'pointer' }}
          onClick={() => handleChangeMonth('next')}
        />
      </div>
      <div className={styles['calendar_body']}>
        <div className={styles['table_header']}>
          {WEEKDAYS.map((day, i) => (
            <p className={styles['weekday']} key={i}>
              {day}
            </p>
          ))}
        </div>

        <div className={styles['table']}>
          <div className={styles['table_content']}>
            {calendarDays.map((day, i) => {
              let classNames = `calendar_day`;
              if (day.currentMonth) {
                classNames = `current`;
              }
              if (day.date.toDateString() == today) {
                classNames = `today`;
              }
              if (day.selected) {
                classNames = `selected`;
              }

              return (
                <div
                  key={i}
                  className={styles[classNames]}
                  onClick={() => changeCurrentDay(day)}
                >
                  <p>{day.number}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
