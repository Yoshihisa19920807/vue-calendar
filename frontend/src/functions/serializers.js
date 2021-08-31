import { format } from 'date-fns';

export const serializeEvent = event => {
  if (event === null) {
    return null;
  }
  const start = new Date(event.start);
  const end = new Date(event.end);
  return {
    ...event,
    start,
    end,
    startDate: format(start, 'yyyy/MM/dd'),
    startTime: format(start, 'HH:mm:ss'),
    endDate: format(end, 'yyyy/MM/dd'),
    endTime: format(end, 'HH:mm:ss'),
    color: event.color || 'blue',
  };
};
