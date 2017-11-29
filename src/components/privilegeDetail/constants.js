export const GET_USER_DETAIL = 'privilegeDetail/GET_USER_DETAIL';
export const GET_USER_HISTORY = 'privilegeDetail/GET_USER_HISTORY';

export const HISTORY_TYPE = {
  CREATED: {
    icon: 'new_releases',
    textNote: 'Người dùng được khởi tạo bởi SCMS',
  },
  PASSWORD_CHANGED: {
    icon: 'note_add',
    textNote: 'Người dùng đã được đổi mật khẩu bởi',
    createdByText: 'Quản Trị Viên',
  },
  LOCKED: {
    icon: 'mode_edit',
    textNote: 'Người dùng bị khóa bởi',
    createdByText: 'Quản Trị Viên',
  },
  UNLOCKED: {
    icon: 'mode_edit',
    textNote: 'Người dùng được mở khóa bởi',
    createdByText: 'Quản Trị Viên',
  },
};

export const TIME_LIFE_LEVEL = {
  TODAY: {
    value: 0,
    text: 'Hôm nay',
  },
  YESTERDAY: {
    value: 1,
    text: 'Hôm qua'
  },
  THIS_MONTH: {
    value: 0,
    text: 'Tháng này',
  },
  LAST_MONTH: {
    value: 1,
    text: 'Tháng trước'
  },
};