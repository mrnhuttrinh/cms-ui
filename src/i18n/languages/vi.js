import CountryVi from '../../constants/countryVI.js';
import { vietnamese as vietnameseMSM } from '../../constants/messages';

const vi = {
  translations: {
    ...CountryVi,
    ...vietnameseMSM,
    'Language': 'vn',
    'Dashboard': 'Bảng Điều Khiển',
    'Merchant': 'Đại lí',
    'Report': 'Báo cáo thống kê',
    'Permission': 'Phân Quyền',
    'Setting': 'Cài đặt',
    'My profile': 'Tài khoản của tôi',
    'User profile': 'Thông tin tài khoản người dùng',
    'Logout': 'Đăng xuất',
    'Customer List': 'Danh sách khách hàng',
    'ACTIVE': 'ĐANG HOẠT ĐỘNG',
    'DEACTIVE': 'BỊ KHÓA',
    'first name': 'tên',
    'last name': 'họ',
    'member code': 'mã sv/gv',
    'title': 'khoa | phòng ban',
    'position': 'chức vụ',
    'date became customer': 'ngày khởi tạo',
    'status': 'trạng thái',
    'refresh': 'làm mới',
    'Search by': 'Tìm theo',
    'Search': 'Tìm kiếm',
    'From date': 'Từ ngày',
    'To date': 'Đến ngày',
    'of': 'trên',
    'FIRST': 'TRANG ĐẦU',
    'PRVE': 'TRANG TRƯỚC',
    'NEXT': 'TRANG SAU',
    'LAST': 'TRANG CUỐI',
    'Customer details': 'Chi tiết khách hàng',
    'general information': 'thông tin chung',
    'accounts': 'tài khoản ví điện tử',
    'cards': 'thẻ',
    'history': 'lịch sử',
    'Personal information': 'Thông tin cá nhân',
    'First name': 'Tên',
    'Last name': 'Họ',
    'Birthday': 'Ngày sinh',
    'Gender': 'Giới tính',
    'Country': 'Quốc tịch',
    'Occupation': 'Nhóm',
    'Position': 'Khoa | Phòng ban',
    'Title': 'Chức vụ',
    'Email': 'Email',
    'Phone': 'SĐT',
    'Phone1': 'SĐT di động',
    'Phone2': 'SĐT khác',
    'Address': 'Địa chỉ thường trú',
    'Line1': 'Địa chỉ',
    'State Province': 'Phường (xã). Quận (Huyện)',
    'City': 'Tỉnh, Thành Phố',
    'Indetity Card': 'Giấy tờ tùy thân - CMND',
    'Passport Card': 'Giấy tờ tùy thân - PASSPORT',
    'Number': 'Mã số',
    'Date of issue': 'Ngày cấp',
    'Date of expiry': 'Ngày hết hạn',
    'Place of issue': 'Nơi cấp',
    'Customer status': 'Thông tin tài khoản',
    'Status': 'Trạng thái',
    'Updated at': 'Thời gian cập nhật gần nhất',
    'Customer': 'Khách hàng',
    'GENDER.0': 'Nữ',
    'GENDER.1': 'Nam',
    'GENDER.2': 'Khác',
    'View details': 'Xem chi tiết',
    'Account information': 'Thông tin tài khoản',
    'Account ID': 'Số tài khoản',
    'Plan': 'Hạng ví',
    'Type': 'Loại',
    'Account name': 'Tên Tài Khoản',
    'Date opened': 'Ngày mở',
    'Date closed': 'Ngày đóng',
    'Currency': 'Loại tiền',
    'Current balance': 'Số dư hiện tại',
    'Name': 'Tên',
    'Detail': 'Chi tiết',
    'Card code': 'Số thẻ - Card code',
    'Effective date': 'Ngày hiệu lực',
    'Expiry date': 'Ngày hết hạn',
    'CREATED': 'Khởi tạo',
    'UPDATED': 'Cập nhật',
    'ADDED': 'Thêm',
    'Addresses': 'Địa chỉ',
    'Identify documents': 'Giấy tờ tùy thân',
    'by': 'bởi',
    'Customer has been added': 'Khách hàng đã được thêm',
    'of Customer has been changed from': 'của Khách hàng được chuyển từ',
    'to': 'sang',
    'Don\'t have history information!': 'Không có thông tin lịch sử!',
    'Customer has been created': 'Khách hàng được khởi tạo',
    'Card list': 'Danh sách thẻ',
    'Card': 'Hệ thống thẻ',
    'account': 'tài khoản',
    'Account': 'Tài khoản',
    'general information & History': 'thông tin chung & lịch sử hoạt động',
    'transaction': 'giao dịch',
    'Card information': 'Thông tin thẻ',
    'Card history': 'Lịch sử hoạt động',
    'Card details': 'Chi tiết thẻ',
    'Renew': 'Gia hạn',
    'Card has been renewed': 'Thẻ đã được gia hạn',
    'Lock': 'Khóa',
    'Unlock': 'Mở khóa',
    'Card has been created': 'Thẻ được khởi tạo',
    'The card has been unlocked': 'Thẻ đã được mở khoá',
    'The card has been locked': 'Thẻ đã bị khoá',
    'Customer information': 'Thông tin khách hàng',
    'transaction date': 'TG PHÁT SINH',
    'reference transaction': 'SỐ THAM CHIẾU',
    'transaction type': 'LOẠI GD',
    'amount': 'SỐ TIỀN',
    'transaction created at': 'TG CẬP NHẬT',
    'account id': 'STK',
    'Account list': 'Danh sách tài khoản ví',
    'Account details': 'Chi tiết tài khoản',
    'Account has been created': 'Tài khoản được khởi tạo',
    'of Account has been changed from': 'của Tài khoản được chuyển từ',
    'Account has been added': 'Tài khoản đã được thêm',
    'lock account': 'khóa tài khoản',
    'unlock account': 'mở khóa tài khoản',
    'edit': 'chỉnh sửa',
    // login page
    'Sign In To Admin': 'Đăng nhập để quản trị',
    'Password': 'Mật khẩu',
    'Remember me': 'Ghi nhớ đăng nhập',
    'Forgot Password': 'Quên mật khẩu',
    'SIGN IN': 'Đăng nhập',
    'Display language': 'Hiển thị bằng ngôn ngữ',
    'Vietnamese': 'Tiếng Việt',
    'English': 'Tiếng Anh',
    'Invalid email address': 'Email không đúng',
    'Sorry, that login was invalid. Please try again.': 'Đăng nhập đó không hợp lệ. Vui lòng thử lại.',
    // appbar
    'Language Long': 'Ngôn ngữ',
    'user information': 'Thông tin tài khoản',
    'User details': 'Chi tiết tài khoản',
    'change password': 'ĐỔI MẬT KHẨU',
    'User name': 'Tên Đăng Nhập',
    'Role': 'Nhóm',
    'Last login': 'Thời gian hoạt động gần nhất',
    'ADMIN': 'Quản Trị Viên',
    'USER': 'Người Dùng',
    'Old password': 'Mật khẩu cũ',
    'New password': 'Mật khẩu mới',
    'Confirm new password': 'Xác nhận mật khẩu mới',
    'Password must be more than 6 characters': 'Mật khẩu phải nhiều hơn 6 ký tự',
    'Passwords do not match': 'Mật khẩu không trùng khớp',
    // privileged list
    'User List': 'Danh sách người dùng',
    // privileged detail
    'LOCK USER': 'KHÓA TÀI KHOẢN',
    'UNLOCK USER': 'MỞ TÀI KHOẢN',
    'Lock user': 'Khóa tài khoản',
    'Unlock user': 'Mở tài khoản',
    'EDIT': 'CHỈNH SỬA',
    'RESET PASSWORD': 'CÀI ĐẶT MẬT KHẨU',
    'Reset Password': 'Cài đặt mật khẩu',
    'Go back': 'Quay lại',
    'User Activity history': 'Lịch sử hoạt động',
    'CANCEL': 'HỦY',
    'RESET': 'CÀI ĐẶT',
    'CHANGE PASSWORD': 'ĐỔI MẬT KHẨU',
    'Change password': 'Đổi mật khẩu',
    'User has been locked by': 'Người dùng được mở khóa bởi',
    'User has been unlocked by': 'Người dùng bị khóa bởi',
    'User has been changed password by': 'Người dùng đã được đổi mật khẩu bởi',
    'User has been created by SCMS': 'Người dùng được khởi tạo bởi SCMS',
    'User has been updated by': 'Người dùng được cập nhật bởi',
    // merchant list
    'Merchant List': 'Danh sách đại lý',
    'Merchant details': 'Chi Tiết Đại Lý',
    'APPLICATIONS, MERCHANTS': 'ỨNG DỤNG, THIẾT BỊ CHẤP NHẬN THẺ',
    'Merchant Report': 'Báo Cáo',
    'Merchant information': 'Thông tin đại lý',
    'Home No., Street': 'Số nhà, đường',
    'Ward, District': 'Phường (Xã), Quận (Huyện)',
    'Code number': 'Mã số',
    'Security code': 'Khóa bảo mật',
    'Default': 'Mặc định',

    'Add new application': 'Thêm ứng dụng',
    'Update status': 'Cập nhật trạng thái',
    'application': 'ứng dụng',
    'Merchant has been registered a': 'Đại lý được đăng ký một',
    'Merchant has been created by': 'Đại lý được khởi tạo bởi',
    'customer has been transferred from': 'khách hàng được chuyển từ',

    // not found
    'Not found': 'Không tìm thấy',
    'Either you typed a wrong URL, or you followed a bad link.': 'Bạn đã gõ sai URL, hoặc bạn đã truy cập một liên kết không tồn tại.',
    'GO BACK': 'GO BACK',
  }
};

export default vi;
