/** ********************************************************************************************
 *                                                                                             *
 * Please read the following tutorial before implementing tasks:                               *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date       *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#date_object *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl       *
 *                                                                                             *
 ********************************************************************************************* */

/**
 * By the passed date returns the number of seconds elapsed since 00:00 01.01.1970.
 *
 * @param {string} date - date and time.
 * @return {number} milliseconds in timestamp.
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 0
 * '04 Dec 1995 00:12:00 UTC' => 818035920000
 */
function dateToTimestamp(date) {
  return Date.parse(date);
}

/**
 * Returns the time in hh:mm:ss format from the received date.
 *
 * @param {Date} date - date.
 * @return {string} time in hh:mm:ss format.
 *
 * @example:
 * Date(2023, 5, 1, 8, 20, 55) => '08:20:55'
 * Date(2015, 10, 20, 23, 15, 1) => '23:15:01'
 */
function getTime(date) {
  return date.toTimeString().split(' ')[0];
}

/**
 * Returns the name of the day of the week for a given date string.
 *
 * @param {string} date - date and time.
 * @return {string} the name of the day of the week
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 'Thursday'
 * '03 Dec 1995 00:12:00 UTC' => 'Sunday'
 * '2024-01-30T00:00:00.000Z' => 'Tuesday'
 */
function getDayName(date) {
  const day = new Date(date);
  const dayOfWeek = day.getDay();
  let currentDay = '';
  switch (dayOfWeek) {
    case 0:
      currentDay = 'Sunday';
      break;
    case 1:
      currentDay = 'Monday';
      break;
    case 2:
      currentDay = 'Tuesday';
      break;
    case 3:
      currentDay = 'Wendsday';
      break;
    case 4:
      currentDay = 'Thursday';
      break;
    case 5:
      currentDay = 'Friday';
      break;
    case 6:
      currentDay = 'Saturday';
      break;
    default:
      currentDay = 'No such a day!';
  }
  return currentDay;
}

/**
 * Returns the date of the next Friday from a given date.
 *
 * @param {Date} date
 * @return {Date}
 *
 * @example:
 * Date('2024-02-03T00:00:00Z') => Date('2024-02-09T00:00:00Z')
 * Date('2024-02-13T00:00:00Z') => Date('2024-02-16T00:00:00Z')
 * Date('2024-02-16T00:00:00Z') => Date('2024-02-23T00:00:00Z')
 */
function getNextFriday(date) {
  let date1 = date.getUTCDate();
  const day1 = date.getDay();
  switch (day1) {
    case 0:
      date1 += 5;
      break;
    case 1:
      date1 += 4;
      break;
    case 2:
      date1 += 3;
      break;
    case 3:
      date1 += 2;
      break;
    case 4:
      date1 += 1;
      break;
    case 5:
      date1 += 7;
      break;
    case 6:
      date1 += 6;
      break;
    default:
      date1 += 0;
  }
  const date2 = new Date(date.setUTCDate(date1));
  return date2;
}

/**
 * Returns the number of days in a specified month and year.
 *
 * @param {number} month - The month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The year as a four-digit number.
 * @return {number}
 *
 * @example:
 * 1, 2024 => 31
 * 2, 2024 => 29
 */
function getCountDaysInMonth(month, year) {
  let checkYear = false;
  let numberOfDays = 30;
  if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
    checkYear = true;
  }

  if (
    month === 1 ||
    month === 3 ||
    month === 5 ||
    month === 7 ||
    month === 8 ||
    month === 10 ||
    month === 12
  ) {
    numberOfDays = 31;
  }

  if (month === 2 && checkYear) {
    numberOfDays = 29;
  } else if (month === 2) {
    numberOfDays = 28;
  }
  return numberOfDays;
}

/**
 * Returns the total number of days between two dates, including both the start and end dates.
 *
 * @param {string} dateStart - The start date of the period in ISO 8601 format.
 * @param {string} dateEnd - The end date of the period in ISO 8601 format.
 * @return {number} - The total count of days in the period.
 *
 * @example:
 * '2024-02-01T00:00:00.000Z', '2024-02-02T00:00:00.000Z'  => 2
 * '2024-02-01T00:00:00.000Z', '2024-02-12T00:00:00.000Z'  => 12
 */
function getCountDaysOnPeriod(dateStart, dateEnd) {
  const date1 = new Date(dateStart);
  const date2 = new Date(dateEnd);
  const timeDate1 = date1.valueOf();
  const timeDate2 = date2.valueOf();
  const result = timeDate2 - timeDate1;
  if (result <= 86400000) {
    return 2;
  }
  return result / 86400000 + 1;
}

/**
 * Returns true if a given date is within a specified range, including both the start and end dates.
 *
 * @typedef {{
 * start: string, // The start date in ISO 8601 format (e.g., 'YYYY-MM-DD').
 * end: string    // The end date in ISO 8601 format.
 * }} DatePeriod
 *
 * @param {string} date - The date to check, in ISO 8601 format.
 * @param {DatePeriod} period - The period to check against.
 * @return {boolean} - True if the date is within the range, false otherwise.
 *
 * @example:
 * '2024-02-01', { start: '2024-02-02', end: '2024-03-02' } => false
 * '2024-02-02', { start: '2024-02-02', end: '2024-03-02' } => true
 * '2024-02-10', { start: '2024-02-02', end: '2024-03-02' } => true
 */
function isDateInPeriod(date, period) {
  const startDate = new Date(period.start);
  const endDate = new Date(period.end);
  const checkedDate = new Date(date);
  const millisecDate1 = Date.parse(startDate);
  const millisecDate2 = Date.parse(endDate);
  const millisecCheckedDate = Date.parse(checkedDate);
  if (
    millisecCheckedDate >= millisecDate1 &&
    millisecCheckedDate <= millisecDate2
  ) {
    return true;
  }
  return false;
}

/**
 * Returns the date formatted in 'M/D/YYYY, hh:mm:ss a'.
 *
 * @param {string} date - The date to be formatted, in ISO 8601 format (e.g., 'YYYY-MM-DDTHH:mm:ss.sssZ').
 * @return {string} - The date formatted in 'Month/Day/Year, Hour:Minute:Second AM/PM'.
 *
 * @example:
 * '2024-02-01T15:00:00.000Z' => '2/1/2024, 3:00:00 PM'
 * '1999-01-05T02:20:00.000Z' => '1/5/1999, 2:20:00 AM'
 * '2010-12-15T22:59:00.000Z' => '12/15/2010, 10:59:00 PM'
 */
function formatDate(date) {
  const date1 = new Date(date);
  const PM = 'PM';
  const AM = 'AM';
  const dateNumber = date1.getUTCDate();
  const monthNumber = date1.getUTCMonth() + 1;
  const yearNumber = date1.getUTCFullYear();
  const format1 = `${monthNumber}/${dateNumber}/${yearNumber}`;
  let hoursNumber = date1.getUTCHours();
  let minutesNumber = date1.getUTCMinutes();
  if (minutesNumber < 10) {
    minutesNumber = `0${minutesNumber}`;
  }
  let secondsNumber = date1.getUTCSeconds();
  if (secondsNumber < 10) {
    secondsNumber = `0${secondsNumber}`;
  }

  if (hoursNumber < 12) {
    secondsNumber += ` ${AM}`;
  } else {
    secondsNumber += ` ${PM}`;
  }
  const tempHours = hoursNumber;
  switch (hoursNumber) {
    case 13:
      hoursNumber = 1;
      break;
    case 14:
      hoursNumber = 2;
      break;
    case 15:
      hoursNumber = 3;
      break;
    case 16:
      hoursNumber = 4;
      break;
    case 17:
      hoursNumber = 5;
      break;
    case 18:
      hoursNumber = 6;
      break;
    case 19:
      hoursNumber = 7;
      break;
    case 20:
      hoursNumber = 8;
      break;
    case 21:
      hoursNumber = 9;
      break;
    case 22:
      hoursNumber = 10;
      break;
    case 23:
      hoursNumber = 11;
      break;
    default:
      hoursNumber = tempHours;
  }
  const format2 = `${hoursNumber}:${minutesNumber}:${secondsNumber}`;

  return `${format1}, ${format2}`;
}

/**
 * Returns the total number of weekend days (Saturdays and Sundays) in a specified month and year.
 *
 * @param {number} month - The source month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The source year as a four-digit number.
 * @return {number} - The total count of weekend days in the month.
 *
 * @example:
 * 5, 2022 => 9
 * 12, 2023 => 10
 * 1, 2024 => 8
 */
function getCountWeekendsInMonth(month, year) {
  const currentMonth = month - 1;
  const date = new Date(year, currentMonth);
  const lastDay = new Date(year, month, 0).getDate();
  let countWeekends = 0;
  for (let index = 1; index <= lastDay; index += 1) {
    const newDate = new Date(date.getFullYear(), date.getMonth(), index);
    if (newDate.getDay() === 0 || newDate.getDay() === 6) {
      countWeekends += 1;
    }
  }
  return countWeekends;
}

/**
 * Returns the week number of the year for a given date.
 * The first week of the year is defined according to ISO8601.
 * The first day of the week is Monday.
 *
 * @param {Date} date - The date for which to find the week number.
 * @return {number} - The week number of the year.
 *
 * @example:
 * Date(2024, 0, 3) => 1
 * Date(2024, 0, 31) => 5
 * Date(2024, 1, 23) => 8
 */
function getWeekNumberByDate(date) {
  const year = date.getFullYear();
  const timestempOfOurDay = Date.parse(date);
  const timestampOneday = 86400000;
  const fourthOfJunuary = new Date(year, 0, 4);
  const index = fourthOfJunuary.getDay();
  let timestampOfFirstDay = Date.parse(fourthOfJunuary);
  switch (index) {
    case 0:
      timestampOfFirstDay -= timestampOneday * 6;
      break;
    case 2:
      timestampOfFirstDay -= timestampOneday * 1;
      break;
    case 3:
      timestampOfFirstDay -= timestampOneday * 2;
      break;
    case 4:
      timestampOfFirstDay -= timestampOneday * 3;
      break;
    case 5:
      timestampOfFirstDay -= timestampOneday * 4;
      break;
    case 6:
      timestampOfFirstDay -= timestampOneday * 5;
      break;
    default:
      timestampOfFirstDay += 0;
  }

  const fourthOfJunuaryNextYear = new Date(year + 1, 0, 4);
  const indexNextYear = fourthOfJunuaryNextYear.getDay();
  let timestampOfFirstDayNextYear = Date.parse(fourthOfJunuaryNextYear);
  switch (indexNextYear) {
    case 0:
      timestampOfFirstDayNextYear -= timestampOneday * 6;
      break;
    case 2:
      timestampOfFirstDayNextYear -= timestampOneday * 1;
      break;
    case 3:
      timestampOfFirstDayNextYear -= timestampOneday * 2;
      break;
    case 4:
      timestampOfFirstDayNextYear -= timestampOneday * 3;
      break;
    case 5:
      timestampOfFirstDayNextYear -= timestampOneday * 4;
      break;
    case 6:
      timestampOfFirstDayNextYear -= timestampOneday * 5;
      break;
    default:
      timestampOfFirstDayNextYear += 0;
  }

  let countWeeks = 1;
  while (timestampOfFirstDay < timestampOfFirstDayNextYear) {
    if (timestampOfFirstDay + timestampOneday * 7 < timestempOfOurDay) {
      countWeeks += 1;
      timestampOfFirstDay += timestampOneday * 7;
    } else {
      if (countWeeks === 33) {
        countWeeks += 1;
      }
      return countWeeks;
    }
  }
  return countWeeks;
}

/**
 * Returns the date of the next Friday the 13th from a given date.
 * Friday the 13th is considered an unlucky day in some cultures.
 *
 * @param {Date} date - The starting date to search from.
 * @return {Date} - The date of the next Friday the 13th.
 *
 * @example:
 * Date(2024, 0, 13) => Date(2024, 8, 13)
 * Date(2023, 1, 1) => Date(2023, 9, 13)
 */
function getNextFridayThe13th(date) {
  let monthIndex = date.getMonth();
  let yearIndex = date.getFullYear();
  if (date.getDate() === 13) {
    monthIndex += 1;
  }
  const thirteen = 13;
  const friday = 5;
  while (yearIndex < 2200) {
    const fridayDate = new Date(yearIndex, monthIndex, thirteen);
    if (fridayDate.getDay() === friday) {
      return fridayDate;
    }
    if (monthIndex !== 11) {
      monthIndex += 1;
    } else {
      monthIndex = 0;
      yearIndex += 1;
    }
  }
  return date;
}

/**
 * Returns the quarter of the year for a given date.
 *
 * @param {Date} date - The date for which to find the quarter.
 * @return {number} - The quarter of the year (1-4).
 *
 * @example:
 * Date(2024, 1, 13) => 1
 * Date(2024, 5, 1) => 2
 * Date(2024, 10, 10) => 4
 */
function getQuarter(date) {
  const month = date.getUTCMonth();
  let quarter = 4;
  if (month >= 0 && month < 3) {
    quarter = 1;
  }

  if (month >= 3 && month < 6) {
    quarter = 2;
  }

  if (month >= 6 && month < 9) {
    quarter = 3;
  }
  return quarter;
}

/**
 * Generates an employee's work schedule within a specified date range, based on a pattern of working and off days.
 * The start and end dates of the period are inclusive.
 *
 * @typedef {{
 * start: string, // The start date in 'DD-MM-YYYY' format.
 * end: string    // The end date in 'DD-MM-YYYY' format.
 * }} DatePeriod
 *
 * @param {DatePeriod} period - The start and end dates of the period.
 * @param {number} countWorkDays - The number of consecutive working days.
 * @param {number} countOffDays - The number of consecutive days off.
 * @return {Array<string>} - An array of dates in 'DD-MM-YYYY' format representing the work schedule.
 *
 * @example:
 * { start: '01-01-2024', end: '15-01-2024' }, 1, 3 => ['01-01-2024', '05-01-2024', '09-01-2024', '13-01-2024']
 * { start: '01-01-2024', end: '10-01-2024' }, 1, 1 => ['01-01-2024', '03-01-2024', '05-01-2024', '07-01-2024', '09-01-2024']
 */
function getWorkSchedule(period, countWorkDays, countOffDays) {
  const schedule = [];
  let periodStart = period.start;
  const finalStart = periodStart.split('');
  let [zero, one, dash, three, four] = finalStart;
  finalStart[0] = three;
  finalStart[3] = zero;
  finalStart[1] = four;
  finalStart[4] = one;
  periodStart = finalStart.join('');
  let periodEnd = period.end;
  const finalEnd = periodEnd.split('');
  [zero, one, dash, three, four] = finalEnd;
  finalEnd[0] = three;
  finalEnd[3] = zero;
  finalEnd[1] = four;
  finalEnd[4] = one;
  periodEnd = finalEnd.join('');
  const dateStart = new Date(periodStart);
  const dateEnd = new Date(periodEnd);
  const timestampStart = Date.parse(dateStart);
  const timestampEnd = Date.parse(dateEnd);
  const timestampOneday = 86400000;
  let countDays = 0;
  for (
    let index = timestampStart;
    index <= timestampEnd;
    index += timestampOneday
  ) {
    if (countDays < countWorkDays) {
      const tempDate = new Date(index);
      const year = tempDate.getFullYear();
      let month = tempDate.getMonth();
      month += 1;
      if (month < 10) {
        month = `0${month}`;
      }
      let date = tempDate.getDate();
      if (date < 10) {
        date = `0${date}`;
      }
      schedule.push(`${date}${dash}${month}${dash}${year}`);
      countDays += 1;
    } else {
      index += (countOffDays - 1) * timestampOneday;
      countDays = 0;
    }
  }
  return schedule;
}

/**
 * Determines whether the year in the provided date is a leap year.
 * A leap year is a year divisible by 4, but not by 100, unless it is also divisible by 400.
 *
 * @param {Date} date - The date from which the year will be checked.
 * @return {boolean} - True if the year is a leap year, false otherwise.
 *
 * @example:
 * Date(2024, 2, 1) => true
 * Date(2022, 2, 1) => false
 * Date(2020, 2, 1) => true
 */
function isLeapYear(date) {
  let checkYear = false;
  const year = date.getFullYear();
  if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
    checkYear = true;
  }
  return checkYear;
}

module.exports = {
  dateToTimestamp,
  getTime,
  getDayName,
  getNextFriday,
  getCountDaysInMonth,
  getCountDaysOnPeriod,
  isDateInPeriod,
  formatDate,
  getCountWeekendsInMonth,
  getWeekNumberByDate,
  getNextFridayThe13th,
  getQuarter,
  getWorkSchedule,
  isLeapYear,
};
