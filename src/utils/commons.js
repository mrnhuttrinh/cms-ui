import moment from 'moment';
import URLSearchParams from 'url-search-params';

export const dateFormatter = (date) => (date ? moment(date).format('DD/MM/YYYY') : 'N/A');
export const dateTimeFormatter = (date) => (date ? moment(date).format('hh:mm:ss DD/MM/YYYY') : 'N/A');

export const parseParams = (pageable, sort, search) => {
  const params = {...pageable, sort:`${sort.key},${sort.type}`};
  const searchParams = new URLSearchParams(params);
  if(search.value) {
    if (search.key === 'date' && search.value[1]) {
      [].concat(search.value).forEach((value, index) => {
        let newValue = value;
        if (index === 1) {
          // Add end date to 1 more day
          newValue = moment(search.value[1]).add(1, 'day').format('M/D/YYYY');
        }
        searchParams.append(search.key, newValue);
      });
    } else {
      [].concat(search.value).forEach((value) => {
        searchParams.append(search.key, value);
      });
    }
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