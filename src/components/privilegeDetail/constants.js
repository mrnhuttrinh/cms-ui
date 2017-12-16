export const GET_USER_DETAIL = 'privilegeDetail/GET_USER_DETAIL';
export const GET_USER_HISTORY = 'privilegeDetail/GET_USER_HISTORY';
export const USER_RESET_PASSWORD = 'privilegeDetail/USER_RESET_PASSWORD';
export const USER_UPDATE_STATUS = 'privilegeDetail/USER_UPDATE_STATUS';

export const HISTORY_TYPE = {
  CREATED: {
    icon: 'new_releases',
    textNote: 'User has been created by SCMS',
    title: 'CREATED',
  },
  PASSWORD_CHANGED: {
    icon: 'note_add',
    textNote: 'User has been changed password by',
    createdByText: 'ADMIN',
    title: 'Change password',
  },
  LOCKED: {
    icon: 'mode_edit',
    textNote: 'User has been locked by',
    createdByText: 'ADMIN',
    title: 'Lock user',
  },
  UNLOCKED: {
    icon: 'mode_edit',
    textNote: 'User has been unlocked by',
    createdByText: 'ADMIN',
    title: 'Unlock user',
  },
  UPDATED: {
    icon: 'mode_edit',
    textNote: 'User has been updated by',
    createdByText: 'ADMIN',
    title: 'UPDATED',
  }
};