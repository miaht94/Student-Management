# Website Quản lý Sinh viên & Cố vấn học tập

### Mục lục 

[1. Giới thiệu](https://github.com/miaht94/Student-Management#giới-thiệu)  
[2. Tính năng](https://github.com/miaht94/Student-Management#tính-năng)  
[3. Công nghệ](https://github.com/miaht94/Student-Management#công-nghệ)  
[4. Cách cài đặt](https://github.com/miaht94/Student-Management#cài-đặt)  
[5. Nhóm phát triển](https://github.com/miaht94/Student-Management#nhóm-phát-triển) 

## Giới thiệu

Web App làm nhiệm vụ quản lý các sinh viên thuộc phạm vi quản lý của cố vấn học tập.

![Pic](https://raw.githubusercontent.com/miaht94/Student-Management/main/Screenshot/screenshot.png)


## Tính năng
### Tổng quan
- **Giao diện** thân thiện trực quan, dễ điều hướng bằng tiếng Việt
- **Backend và hệ thống quản lý phiên đăng nhập** bằng Token bảo mật, chặt chẽ
### Tài khoản
- **Hệ thống tài khoản và phân quyền** **CVHT - Sinh viên chặt chẽ**
- **Profile cá nhân**, đổi mật khẩu và khôi phục mật khẩu bằng email
### Nhóm tính năng liên lạc
- **Hệ thống lớp học**
  - CVHT có thể quản lý sinh viên nhiều lớp học.
  - Upload danh sách sinh viên vào lớp học bằng email.
- **Hệ thống diễn đàn lớp học theo thời gian thực**
  - Chia theo bảng tin của từng lớp
  - Cố vấn học tập và Sinh viên đều có thể **post bài**, **like** và **bình luận** (giống Facebook)
- **Hệ thống nhắn tin theo thời gian thực** với thông báo đẩy.
- **Bảng thông tin liên lạc** của sinh viên (với chức năng lọc tình trạng và tìm kiếm)
- **Sinh viên** có thể xem thông tin liên lạc và nhắn tin với CVHT
### Nhóm tính năng thống kê và điểm số
- **Bảng điểm sinh viên**
  - **Bảng điểm chung** của toàn bộ sinh viên trong lớp với trạng thái (Chưa đủ tín chỉ, Chưa đóng học phí, Cảnh cáo điểm)
  - **Bảng điểm cá nhân**, xem điểm theo hệ số 4/10.
  - **Nút Nhắn tin** để trao đổi nhanh chóng với sinh viên
  - **Chức năng lọc và xem tổng kết theo kì học**
  - **Xuất bảng điểm** ra file Excel (XLS)
- **Bảng thống kê trực quan**
  -  **Xem sĩ số, bảng đếm** số sinh viên thiếu tín chỉ, thiếu học phí...
  - **Biểu đồ theo dõi** GPA và danh sách cụ thể (với chức năng lọc theo kì học và GPA)
  - **Biểu đồ theo dõi** cảnh báo học vụ
- **Nhập toàn bộ thông tin** bằng file CSV.


## Công nghệ

**Kiến trúc:** Client - Server Web Application, Rest API Approach

**Front-end:** React.js, Recoil, Ant Design, Rechart (visualize dữ liệu)

**Back-end:** Node.js, MongoDB (database)

**Giao thức sử dụng:** HTTP Request + Axios, WebSocket

**Ngôn ngữ**: JavaScript, HTML, CSS


## Cài đặt

### 1. Tải mã nguồn từ repo này

Yêu cầu cài sẵn Node.js và MongoDB trên hệ điều hành (Đã khởi động sẵn)


### 2. Chuẩn bị 2 Terminal/PowerShell CLI, ``cd`` đến gốc của source code và gõ lệnh sau:

**Client terminal**
```
cd client
npm install
npm start
```
Front-end sẽ chạy ở địa chỉ http://localhost:3000

**Server terminal**
```
cd server
npm install
npm start
```
Back-end sẽ chạy ở địa chỉ http://localhost:8081


### 3. Chuẩn bị tài khoản Cố vấn học tập

   **3.1.** Sử dụng Postman thiết lập như tại https://www.postman.com/martian-space-911761/workspace/student-management-api/overview 
(có thể tự tạo POST Request tới địa chỉ ```http://localhost:8081/api/upload/dscv```)

   **3.2.** Chọn **Upload File/Upload Teacher List**

   **3.3.** Chọn **Body** và nhập danh sách CVHT ở key **file** (định dạng File)

(Trong thư mục SampleData ở repo có danh sách mẫu với 2 CVHT có tên ```users_teacher.csv```)

   **3.4.** Nhấn **Send** để gửi request.


### 4. Tạo lớp và thiết lập SampleData

Danh sách file sample data lần lượt sử dụng:

Sample Data         | Mục đích                      | Nơi nhập
------------------- | ----------------------------- | ---------------------------------
users_teacher.csv   | Danh sách tài khoản CVHT      | Quản lý CSDL/Danh sách CVHT
users_student.csv   | Danh sách tài khoản SV        | Quản lý CSDL/Danh sách sinh viên
semesters.csv       | Danh sách kỳ học              | Quản lý CSDL/Danh sách kì học
subjects.csv        | Danh sách môn học             | Quản lý CSDL/Danh sách môn học
*_score.csv         | Điểm các môn do PĐT cung cấp  | Quản lý CSDL/Cập nhật bảng điểm
*_classmember.csv   | List email SV add từng lớp    | Thông tin liên hệ/Thêm sinh viên

**Lưu ý:** 

- Tài khoản đăng nhập và vai trò của user trên hệ thống được thiết lập trong ``users_teacher.csv`` và ``users_student.csv``

- Các file ```*_classmember.csv``` chỉ có thể nhập sau khi CVHT tạo lớp.

**Hướng dẫn tạo lớp:**

1. CVHT nhấn vào mục **Đổi lớp/Chọn lớp** trên trang chủ và tạo lớp mới bằng tên lớp. 
2. Sau khi tạo lớp mới có thẻ nhập sinh viên vào lớp bằng email ở **Thông tin liên hệ / Thêm sinh viên**


## Nhóm phát triển

### Nhóm 1


- **Trần Xuân Bách** (@miaht94)

   System Design, Back-end, Front-end, UI/UX, React Router, WebSocket features, Upload, State, Refinements


- **Nguyễn Việt Anh** (@vakoyomi)

   System Design, Front-end, UI/UX, Requirements, State, Data Processing


- **Đặng Thế Hoàng Anh** (@anhbomx13)

   Front-end, UI/UX, State, Data Processing, Tables & Filters, Profile, Refinements 


- **Hoàng Hữu Bách** (@h2bach)

   Front-end, UI/UX, Data Visualization, Refinements      


**Lớp:** INT3306 22 - Phát triển ứng dụng Web

Trường Đại học Công nghệ, ĐHQGHN


**Ngày bắt đầu:** 25 tháng 9, 2021
