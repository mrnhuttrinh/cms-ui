import CountryVi from '../../constants/countryVI.js';
import { vietnamese as vietnameseMSM } from '../../constants/messages';

const vi = {
  translations: {
    ...CountryVi,
    ...vietnameseMSM,
    'Language': 'vn',
    'Dashboard': 'Bảng Điều Khiển',
    'Merchant': 'Đại lí',
    'Report': 'Báo Cáo Thống Kê',
    'Permission': 'Phân Quyền',
    'Setting': 'Cài đặt',
    'My profile': 'Tài khoản của tôi',
    'User profile': 'Thông tin tài khoản người dùng',
    'Logout': 'Đăng xuất',
    'Customer list': 'Danh Sách Khách Hàng',
    'ACTIVE': 'ĐANG HOẠT ĐỘNG',
    'DEACTIVE': 'NGƯNG HOẠT ĐỘNG',
    'CANCELED': 'BỊ HỦY',
    'LOCKED': 'BỊ KHÓA',
    'VIOLATED': 'XÂM PHẠM',
    'first name': 'tên',
    'last name': 'họ',
    'member code': 'mã sv/gv',
    'title': 'khoa | phòng ban',
    'position': 'chức vụ',
    'date became customer': 'ngày khởi tạo',
    'effective date': 'ngày hiệu lực',
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
    'Customer details': 'Chi Tiết Khách Hàng',
    'general information': 'thông tin chung',
    'accounts': 'tài khoản ví điện tử',
    'Cards': 'Thẻ',
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
    'Line': 'Địa chỉ',
    'State Province': 'Phường (xã). Quận (Huyện)',
    'City': 'Tỉnh, Thành Phố',
    'Indetity card': 'Giấy tờ tùy thân - CMND',
    'Passport card': 'Giấy tờ tùy thân - PASSPORT',
    'Number': 'Mã số',
    'Date of issue': 'Ngày cấp',
    'Date of expiry': 'Ngày hết hạn',
    'Place of issue': 'Nơi cấp',
    'Customer status': 'Thông tin tài khoản',
    'Status': 'Trạng thái',
    'Updated at': 'Thời gian cập nhật gần nhất',
    'Customers': 'Khách hàng',
    'GENDER.0': 'Nữ',
    'GENDER.1': 'Nam',
    'GENDER.2': 'Khác',
    'GENDER.null': 'Không xác định',
    'View details': 'Xem chi tiết',
    'Account information': 'Thông tin tài khoản',
    'Account ID': 'Số tài khoản',
    'Plan': 'Hạng ví',
    'Type': 'Loại',
    'Account name': 'Tên tài khoản',
    'Date opened': 'Ngày mở',
    'Date closed': 'Ngày đóng',
    'Currency': 'Loại tiền',
    'Current balance': 'Số dư hiện tại',
    'Name': 'Tên',
    'Detail': 'Chi tiết',
    'Card code': 'Số thẻ',
    'Effective date': 'Ngày hiệu lực',
    'Expiry date': 'Ngày hết hạn',
    'CREATED': 'Khởi tạo',
    'UPDATED': 'Cập nhật',
    'ADDED': 'Thêm',
    'DELETE': 'Xóa',
    'Addresses': 'Địa chỉ',
    'Identify documents': 'Giấy tờ tùy thân',
    'by': 'bởi',
    'Customer has been added': 'Khách hàng đã được thêm',
    'of Customer has been changed from': 'của Khách hàng được chuyển từ',
    'to': 'sang',
    'Don\'t have history information!': 'Không có thông tin lịch sử!',
    'Customer has been created': 'Khách hàng được khởi tạo',
    'Card list': 'Danh Sách Thẻ',
    'Card': 'Hệ thống thẻ',
    'account': 'tài khoản',
    'Accounts': 'Tài khoản',
    'general information & History': 'thông tin chung & lịch sử hoạt động',
    'transaction': 'giao dịch',
    'Card information': 'Thông tin thẻ',
    'Card history': 'Lịch sử hoạt động',
    'Card details': 'Chi Tiết Thẻ',
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
    'amount': 'số tiền',
    'transaction created at': 'TG CẬP NHẬT',
    'account id': 'STK',
    'Account list': 'Danh Sách Tài Khoản Ví',
    'Account details': 'Chi Tiết Tài Khoản',
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
    'Forgot password': 'Quên mật khẩu',
    'SIGN IN': 'Đăng nhập',
    'Display language': 'Hiển thị bằng ngôn ngữ',
    'Vietnamese': 'Tiếng Việt',
    'English': 'Tiếng Anh',
    'Invalid email address': 'Email không đúng',
    'Sorry, that login was invalid. Please try again.': 'Đăng nhập đó không hợp lệ. Vui lòng thử lại.',
    'User was online.': 'Bạn đã đăng nhập trên một thiết bị khác',
    // appbar
    'Language.long': 'Ngôn ngữ',
    'user information': 'Thông tin tài khoản',
    'User details': 'Chi Tiết Tài Khoản',
    'change password': 'ĐỔI MẬT KHẨU',
    'User name': 'Tên Đăng Nhập',
    'Role': 'Nhóm',
    'Last login': 'Thời gian hoạt động gần nhất',
    'ADMIN': 'Quản trị viên',
    'Old password': 'Mật khẩu cũ',
    'New password': 'Mật khẩu mới',
    'Confirm new password': 'Xác nhận mật khẩu mới',
    'Password must be more than 6 characters': 'Mật khẩu phải nhiều hơn 6 ký tự',
    'Passwords do not match': 'Mật khẩu không trùng khớp',
    // privileged list
    'User List': 'Danh Sách Người Dùng',
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
    'Merchant list': 'Danh Sách Đại Lý',
    'Merchant details': 'Chi Tiết Đại Lý',
    'APPLICATIONS, MERCHANTS': 'ỨNG DỤNG, THIẾT BỊ CHẤP NHẬN THẺ',
    'merchant report': 'Báo Cáo',
    'Merchant information': 'Thông tin đại lý',
    'Code number': 'Mã số',
    'Security code': 'Khóa bảo mật',
    'Default': 'Mặc định',
    'Merchants': 'Đại lý',

    'Add new application': 'Thêm ứng dụng',
    'Update status': 'Cập nhật trạng thái',
    'application': 'ứng dụng',
    'Merchant has been registered a': 'Đại lý được đăng ký một',
    'Merchant has been created by': 'Đại lý được khởi tạo bởi',
    'customer has been transferred from': 'khách hàng được chuyển từ',

    // not found
    'Not found': 'Không tìm thấy',
    'Either you typed a wrong URL, or you followed a bad link.': 'Bạn đã gõ sai URL, hoặc bạn đã truy cập một liên kết không tồn tại.',
    'GO BACK': 'QUAY LẠI',
    'Wallet': 'Ví',
    'Wallet list': 'Danh Sách Ví',
    'Wallet ID': 'Tên mã',
    'Provider': 'Nhà Cung Cấp',
    'Wallets': 'Ví',
    'Wallet information': 'Thông tin ví',
    'Disconnect wallet': 'Hủy liên kết',
    'create and connect new wallet': 'Tạo và liên kết với ví mới',
    'DEFAULT': 'MẶC ĐỊNH',
    // role list
    'Users': 'Người dùng',
    'Settings': 'Cài đặt',
    'Role list': 'Danh Sách Nhóm Người Dùng',
    'Created date': 'Ngày khởi tạo',
    'Role Name': 'Tên Nhóm',
    // role detail
    'Role detail': 'Chi Tiết Nhóm',
    'Permission table': 'Quyền',
    'dialog tilte when account is ACTIVE': 'Khóa Tài Khoản',
    'dialog tilte when account is DEACTIVE': 'Mở Khóa Tài Khoản',
    'dialog content when account is ACTIVE': 'Bạn có muốn khóa tài khoản này?',
    'dialog content when account is DEACTIVE': 'Bạn có muốn mở khóa tài khoản này?',
    'Cancel': 'Hủy bỏ',
    'Ok': 'Đồng ý',
    'Roles': 'Nhóm',
    'Basic Permission Setup': 'Cài đặt nhóm',
    'SAVE': 'LƯU',
    'CUSTOMER': 'KHÁCH HÀNG',
    'ACCOUNT': 'TÀI KHOẢN',
    'CARD': 'THẺ',
    'WALLET': 'VÍ',
    'MERCHANT': 'ĐẠI LÝ',
    'View Customer List': 'Hiển Thị Danh Sách Khách Hàng',
    'View Customer Details': 'Hiển Thị Chi Tiết Khách Hàng',
    'View Account List': 'Hiển Thị Danh Sách Tài Khoản',
    'View Account Details': 'Hiển Thị Chi Tiết Tài Khoản',
    'Lock Account': 'Khoá Tài Khoản',
    'Update Account': 'Cập Nhật Tài Khoản',
    'View Card List': 'Hiển Thị Danh Sách Thẻ',
    'View Card Details': 'Hiển Thị Chi Tiết Thẻ',
    'Update Card Detail': 'Cập Nhật Chi Tiết Thẻ',
    'Create New Wallet': 'Tạo Mới Ví',
    'Remove Wallet': 'Xóa Ví',
    'View Wallet List': 'Hiển Thị Danh Sách Ví',
    'View Merchant List': 'Hiển Thị Danh Sách Đại Lý',
    'View Merchant Details': 'Hiển Thị Chi Tiết Đại Lý',
    'View User List': 'Hiển Thị Danh Sách Người Dùng',
    'View User Details': 'Hiển Thị Chi Tiết Người Dùng',
    'Reset User Password': 'Cài Đặt Mật Khẩu Người Dùng',
    'Lock/Unlock User': 'Khóa/Mở Khóa Người Dùng',
    'Update User': 'Cập Nhật Người Dùng',
    'CLOSE': 'ĐÓNG',
    'WARNING': 'CẢNH BÁO',
    'NOTE': 'LƯU Ý',
    'Experimental better on laptop': 'Trải nghiệm tốt hơn trên laptop',
    'Google Chrome get best experimental for the app.': 'Trải nghiệm tốt nhất vơi Google Chrome.',
    'The number of customer has been': 'Số lượng các khách hàng đã',
    'The number of account has been': 'Số lượng các tài khoản đã',
    'The number of card has been': 'Số lượng các thẻ đã',
    'The number of wallet has been': 'Số lượng các ví đã',
    'The number of user has been': 'Số lượng các người dùng đã',
    'created': 'tạo mới',
    'locked': 'bị khóa',
    'unlocked': 'mở khóa',
    'deleted': 'bị xóa',
    'Synthesis Report': 'Báo Cáo Tổng Hợp',
    'Transaction Details': 'Chi Tiết Giao Dịch',
    'transaction id': 'mã số giao dịch',
    'date time': 'ngày giờ',
    'details': 'chi tiết',
    'receipt date': 'ngày nhận',
    'Product name': 'Tên sản phẩm',
    'Quantity': 'Số lượng',
    'Price': 'Đơn giá',
    'Total': 'Tổng',
    // add new user
    'User list': 'Danh Sách Người Dùng',
    'Email not empty': 'Email không để trống',
    'First name not empty': 'Tên không để trống',
    'Last name not empty': 'Họ không để trống',
    'Username not empty': 'Tên đăng nhập không để trống',
    'Role not empty': 'Nhóm không để trống',
    'Add New User': 'Thêm Người Dùng',
    'Password not empty': 'Mật khẩu không để trống',
    'Status not empty': 'Trạng thái không để trống',
    'Add': 'Thêm',
    'ADD': 'THÊM',
    // add new role
    'Add New Role': 'Thêm Nhóm',
    'Add new role': 'Thêm nhóm',
    'Role name is exists': 'Tên nhóm đã tồn tại',
    'Role name': 'Tên nhóm',
    'Role name not empty': 'Tên nhóm không để trống',
    // report
    'Reports': 'Báo cáo',
    'Merchants Report': 'Báo cáo đại lý',
    'date': 'Ngày',
    'merchant': 'đại lý',
    'total transaction': 'tổng số giao dịch',
    'opening amount': 'số tiền ban đầu',
    'closing amount': 'số tiền lúc sau',
    'record at': 'ghi nhận lúc',
    'created by': 'được tạo bởi',
    'DEPOSIT': 'TIỀN GỬI',
    'EXPENSE': 'CHI PHÍ',
    'PAYMENT': 'THANH TOÁN',
    'REFUND': 'HOÀN TIỀN',
    'STORAGE': 'LƯU TRỮ',
    'PENDING': 'CHỜ',
    'This account does not have any card.': 'Tài khoản không có thẻ.',
     // deposit
    'Deposit to this account': 'Nạp tiền vào tài khoản',
    'Amount': 'Số tiền',
    'Amount not empty': 'Tiền không được bỏ trống',
    'Amount not match': 'Tiền không hợp lệ',
    'Sender': 'Người gửi',
    'Sender not empty': 'Người gửi không được bỏ trống',
    'Card not empty': 'Thẻ không được bỏ trống',
    'DEBIT': 'GHI NỢ',
    'OTHER': 'KHÁC',
    'Others': 'Loại khác',
    'Detail other not empty': 'Loại khác không bỏ trống',
    'Detail not empty': 'Chi tiêt không được bỏ trống',
    'warnings.0001': 'Bạn không thể nạp tiền cho tài khoản không có thẻ đang hoạt động. Vui lòng thử lại sau.'
  }
};

export default vi;
