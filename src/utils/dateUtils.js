import { format } from 'date-fns';

export const addOneDay = (date) => {
  const result = new Date(date);
  result.setDate(result.getDate() + 1);
  return format(result, 'yyyy-MM-dd');
};

