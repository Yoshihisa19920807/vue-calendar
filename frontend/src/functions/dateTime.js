// named impport
import { format, addHours, isWithinInterval } from 'date-fns';
import { ja } from 'date-fns/locale';

// 省略

export const formatDateToJa = date => {
  // 日付を日本語表記で返す
  return format(new Date(date), 'M月d日(E)', { locale: ja });
};
export const getTimeIntervalList = () => {
  // 15分間隔の時間のリストを返す

  // 24個の配列を作り、頭に0を付け、数字の下二桁を配列として返す
  const hours = [...Array(24)].map((_, i) => ('0' + i).slice(-2));
  const minutes = ['00', '15', '30', '45'];
  const timeList = hours.map(hour => minutes.map(minute => hour + ':' + minute)).flat();
  return timeList;
}

export const getDefaultStartAndEnd = date => {
  // デフォルトの開始時刻と終了時刻を返す
  const currentTime = format(new Date(), 'HH:mm:ss');
  const datetime = new Date(`${date} ${currentTime}`);
  // format can replace specific elements
  const start = format(addHours(datetime, 1), 'yyyy/MM/dd HH:00:00');
  const end = format(addHours(datetime, 2), 'yyyy/MM/dd HH:00:00');
  return [start, end];
}

export const isEndGreaterThanStart = (startDate, startTime, endDate, endTime) => {
  if (startDate > endDate) {
    return false
  } else if (startDate == endDate && startTime > endTime) {
    return false
  } else {
    return true
  }
};

export const isDateWithinInterval = (date, startDate, endDate) => {
  return isWithinInterval(new Date(date), { start: new Date(startDate), end: new Date(endDate) });
}

export const compareDates = (a, b) => {
  console.log(a, b);
  console.log("hoge")
  // 日付の比較を行う
  if (a.start < b.start) return -1;
  if (a.start > b.start) return 1;
  return 0
}
