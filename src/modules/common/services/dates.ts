import dateFNSformat from 'date-fns/format';
import en from 'date-fns/locale/en-GB';
import es from 'date-fns/locale/es';
import addHours from 'date-fns/addHours';
import addMinutes from 'date-fns/addMinutes';
import addMonths from 'date-fns/addMonths';
import addSeconds from 'date-fns/addSeconds';

export const format = (date: string, strFormat: string, language: string = 'es') => {
  let locale = en;
  if (language === 'es') {
    locale = es;
  }
  debugger;
  return dateFNSformat(new Date(date), strFormat, { locale });
};

export { addMonths, addHours, addMinutes, addSeconds };

export const localeMap = {
  es,
  en,
};
