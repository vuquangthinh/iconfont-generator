Tạo nhanh để còn dùng cho dự án đang cháy =))
Cách dùng rất đơn giản:
Kéo repo về.
Chạy yarn để cài các node_modules cần thiết.

Xuất các file svg icon với kích thước 512x512 vào thư mục source. Tên của file svg sẽ tương ứng với code.

Để xuất ra file font, chỉ việc yarn start. Và font sẽ nằm ở thư mục dest. Có thể tùy chỉnh để nó rơi vào thư mục mình cần VD như src/assets/fonts của react-native app.

Ngon, bổ khi kết hợp với react-native-vector-icons.

P/S: Cảm ơn a dev nước bạn đã share node_modules generate font dù ít star nhưng chưa thấy lỗi nào :D

TODO: Đang vội nên chưa làm generate json glyphMaps xong.

// add src file watcher: Auto generate dest