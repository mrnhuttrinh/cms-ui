import fetch from 'isomorphic-fetch';
import { jsonServerRestClient, fetchUtils } from 'admin-on-rest';
import { Map } from 'immutable';

const processURL = (urlString) => {

  if (urlString.split('?')[1]) {
    const params = new URLSearchParams(urlString.split('?')[1]);
    const start = params.get('_start');
    const size = 10;
    const page = start / 10;
    const  newParams= new URLSearchParams({size, page, sort:`${params.get('_sort')},${params.get('_order')}`});
    return urlString.replace(params.toString(), newParams.toString());
  }
  return urlString;

};

const httpClient = (url, options) => {
  return fetch(processURL(url), { ...options, credentials: 'same-origin' }).then(async (res) => {
    const response = {};

    const data = await res.json();
    response.json = data._embedded ? data._embedded[Object.keys(data._embedded)[0]] : data;
    const total = data.page ? data.page.totalElements.toString() : '1';
    response.headers = new Map({
      'x-total-count': total,
    });
    return response;
  });
}

const restClient = jsonServerRestClient('/api', httpClient);

export default restClient;
