import { Map } from 'immutable';
import {
  GET_ROLE_DETAIL,
} from './constants';

const initialState = new Map({
  roleDetail: new Map(),
});

export default (state = initialState, action = {}) => {
  let newState;
  const roleDetail = state.get('roleDetail');
  switch (action.type) {
    // fetch role detail
    case `${GET_ROLE_DETAIL}_START`:
      newState = state.set('roleDetail', roleDetail.set('requesting', true).delete('data').delete('error'));
      break;
    case `${GET_ROLE_DETAIL}_COMPLETED`:
      newState = state.set('roleDetail', roleDetail.set('requesting', false).set('data', action.data));
      break;
    case `${GET_ROLE_DETAIL}_FAILED`:
      newState = state.set('roleDetail', roleDetail.set('requesting', false).set('error', action.error));
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}
