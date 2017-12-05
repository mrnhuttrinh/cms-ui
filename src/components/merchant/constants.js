export const GET_MERCHANT_DETAIL = 'merchantDetail/GET_MERCHANT_DETAIL';

export const GET_MERCHANT_TERMINAL_BY_MERCHANT_DETAIL = 'merchantDetail/GET_MERCHANT_TERMINAL_BY_MERCHANT_DETAIL';

export const GET_MERCHANT_HISTORY = 'merchantDetail/GET_MERCHANT_HISTORY';

export const MERCHANT_STATUS = {
  ACTIVE: 'ĐANG HOẠT ĐỘNG',
  INACTIVE: 'BỊ KHÓA',
}

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