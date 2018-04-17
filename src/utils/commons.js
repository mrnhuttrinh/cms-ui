import moment from 'moment';
import URLSearchParams from 'url-search-params';

export const dateFormatter = (date) => (date ? moment(date).format('DD/MM/YYYY') : 'N/A');
export const dateTimeFormatter = (date) => (date ? moment(date).format('hh:mm:ss DD/MM/YYYY') : 'N/A');

export const parseParams = (pageable, sort, search) => {
  const params = {...pageable, sort:`${sort.key},${sort.type}`};
  const searchParams = new URLSearchParams(params);
  if(search.value) {
    const values = [].concat(search.value);
    values.forEach((value, index) => {
      let newValue = value;
      if (values.length === 2) {
        if (index === 1) {
          // Add 59H 59M 59S 999
          newValue = moment(search.value[index]).toDate().getTime() + 86399999;
        } else {
          newValue = moment(search.value[index]).toDate().getTime();
        }
      }

      searchParams.append(search.key, newValue);
    });
  }
  return searchParams.toString();
}

export const genderFormatter = (value) => {
  const GENDER = {
    0: 'Nữ',
    1: 'Nam',
    2: 'Khác',
  };
  return GENDER[value];
}

export const parseStringToObjectJson = (string) => {
  try {
    return JSON.parse(string);
  } catch (error) {

  }
  return {};
}
