# project_website_hotel
Project using React with Django

# Các chức năng có trong dự án

**Chức năng phía người dùng**:

- [x] Tạo tài khoản bao gồm (username, password, và email)

- [x] Quản lý profile cá nhân
    - Có thể xem toàn bộ thông tin cá nhân của mình
    - Cho phép người dùng chỉnh sửa thông tin cá nhân

- [x] Tìm kiếm khách sạn
    - Có thể tìm kiếm khách sạn theo (tên khách sạn, tỉnh, tổng số phòng, xếp hạng)
    - Người dùng xem được danh sách các khách sạn thoã mãn những yêu cầu nhất định

- [x] Xem danh sách khách sạn
    - Hiển thị danh sách khách sạn có trong hệ thống
    - Thông tin cơ bản về từng khách sạn, bao gồm tên, địa chỉ và xếp hạng

- [x] Xem danh sách phòng theo từng khách sạn
    - Trong mỗi khách sạn sẽ hiển thị danh sách các phòng có trong khách sạn đó
    - Thông tin cơ bản về từng phòng , bao gồm tên, mô tả, số người, tiện nghi và giá cả phòng

- [x] Xem Chi tiết khách sạn
    - Khi người dùng chọn một khách sạn từ danh sách tìm kiếm hoặc chọn 1 khách sạn ngẫu nhiên ở trang chủ họ có thể xem thông tin chi tiết về từng khách sạn.
    - Thông tin chi tiết bao gồm tên, địa chỉ, hình ảnh, mô tả.

- [x] Đặt Phòng
    - Tại trang đặt phòng người dùng sẽ cần chọn ngày nhận phòng, ngày trả phòng và nhập các thông tin cá nhân trước khi đặt phòng. trong đó số ngày dự kiến người dùng ở tại khách sạn và giá tiền sẽ tính dựa theo ngày nhận phòng, ngày trả phòng đã chọn ở trên.

- [x] Quản lý đặt phòng
    - Người dùng có thể Xem, chỉnh sửa hoặc huỷ đặt phòng tại trang danh sách đặt phòng nếu như đơn đặt phòng chưa được admin xác nhận. Còn nếu đã xác nhận bởi admin thì sẽ không cho phép chỉnh sửa cũng như hủy đặt phòng.

**Chức năng phía Quản trị viên**:

- [x] Quản lý khách sạn
    - Quản trị viện có thể thêm, sửa, xóa thông tin khách sạn.
    - Có thể xem danh sách toàn bộ các khách sạn có trong hệ thống
    - Thông tin khách sạn bao gồm tên, hình ảnh, mô tả, tổng số phòng, địa chỉ, xếp hạng, ngày thêm khách sạn.

- [x] Quản lý phòng
    - Quản trị viện có thể thêm, sửa, xóa thông tin phòng theo khách sạn.
    - Có thể xem danh sách toàn bộ các phòng theo từng khách sạn trong hệ thống
    - Thông tin phòng bao gồm tên, hình ảnh, tên khách sạn, mô tả, tổng số người, số phòng, giá phòng, ngày thêm phòng.

- [x] Quản lý đặt phòng
    - Quản trị viện có thể sửa, xóa thông tin đơn đặt phòng khi chưa xác nhận. Nếu đã xác nhận sẽ không cho phép xóa đơn đặt phòng.
    - Có thể xem danh sách toàn bộ các đơn đặt phòng của các khách sạn có trong hệ thống
    - Thông tin đơn đặt phòng bao gồm thông tin khách hàng, thông tin khách sạn, thông tin phòng, tổng tiền, ngày nhận phòng, ngày trả phòng, trạng thái đơn đặt phòng.

 **Chức năng phía Quản trị viên cấp cao**:

- [x] Quản lý người dùng
    - Quản trị viện có thể sửa, xóa thông tin người dùng.
    - Có thể xem danh sách toàn bộ người dùng có trong hệ thống
    - Thông tin người dùng bao gồm username, tên, email, quyền tài khoản, ngày thêm tài khoản.
    
- [x] Quản lý Ứng dụng
    - Có thể xem toàn bô khách sạn và phòng theo khách sạn có trong hệ thống 