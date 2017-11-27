import moment from 'moment';
import URLSearchParams from 'url-search-params';

export const dateFormater = (date) => (date ? moment(date).format('DD/MM/YYYY') : 'N/A');
export const parseParams = (pageable, sort, search) => {
  const params = {...pageable, sort:`${sort.key},${sort.type}`};
  const searchParams = new URLSearchParams(params);
  if(search.value) {
    [].concat(search.value).forEach((value) => {
      searchParams.append(search.key, value);
    });
  }
  return searchParams.toString();
}
