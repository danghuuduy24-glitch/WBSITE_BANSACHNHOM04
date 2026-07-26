//Sinh viên code: Đặng Hữu Duy
// Khởi tạo trang đăng ký
window.onload = function () {//window là đối tượng đại diện cho cửa sổ trình duyệt, 
                              //onload là sự kiện xảy ra khi toàn bộ trang web tải xong
    var formDangKy = document.getElementById("registerForm"); //tìm phần tử HTML có id là registerForm 
    var nutHienMatKhau = document.getElementById("showPassword");//tìm phần tử HTML có id là showPassword
    var matKhau = document.getElementById("password");//tìm phần tử HTML có id là passwrod

    formDangKy.addEventListener("submit", dangKyTaiKhoan);//addEventListener dùng để đăng ký sự kiện
    nutHienMatKhau.addEventListener("click", hienAnMatKhau);
    matKhau.addEventListener("input", kiemTraDoManhMatKhau);
    capNhatSoLuongGioHang();//gọi hàm cập nhật số lượng
};
// Hiện hoặc ẩn mật khẩu
function hienAnMatKhau() {
    var matKhau = document.getElementById("password");//lấy nút nhập mật khẩu
    var nhapLaiMatKhau = document.getElementById("confirmPassword");//lấy nút nhập lại mk
    var nutHienMatKhau = document.getElementById("showPassword");//lấy nút hiện mk

    if (matKhau.type == "password") {
        matKhau.type = "text"; //đổi kiểu ô nhập thành text
        nhapLaiMatKhau.type = "text";
        nutHienMatKhau.innerHTML = "👁";
    } else {
        matKhau.type = "password";
        nhapLaiMatKhau.type = "password";
        nutHienMatKhau.innerHTML = "👁";
    }
}
// Kiểm tra độ mạnh mật khẩu
function kiemTraDoManhMatKhau() {
    var matKhau = document.getElementById("password").value; //lấy mk người nhập
    var noiDung = document.getElementById("strengthText");//lấy thẻ hiển thị mức độ mạnh yếu

    if (matKhau.length == 0) {
        noiDung.innerHTML = "Chưa nhập";
        noiDung.style.color = "black";
    } else if (matKhau.length < 6) {
        noiDung.innerHTML = "Yếu";
        noiDung.style.color = "red";
    } else if (matKhau.length < 8) {
        noiDung.innerHTML = "Trung bình";
        noiDung.style.color = "orange";
    } else {
        noiDung.innerHTML = "Mạnh";
        noiDung.style.color = "green";
    }
}
// Đăng ký tài khoản
function dangKyTaiKhoan(suKien) {
    suKien.preventDefault();// Ngăn form tự động tải lại trang

    var hoTen = document.getElementById("fullname").value.trim(); // Lấy họ tên và loại bỏ khoảng trắng đầu cuối
    var email = document.getElementById("email").value.trim();
    var tenDangNhap = document.getElementById("username").value.trim();
    var matKhau = document.getElementById("password").value;
    var nhapLaiMatKhau = document.getElementById("confirmPassword").value;
    var dongY = document.getElementById("agree").checked;
     // Kiểm tra họ tên
    if (hoTen == "") {
        alert("Vui lòng nhập họ và tên");
        document.getElementById("fullname").focus();
        return;
    }
    // Kiểm tra email
    if (email == "") {
        alert("Vui lòng nhập email");
        document.getElementById("email").focus();
        return;
    }
    // Kiểm tra định dạng email
    if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
        alert("Email chưa đúng định dạng");
        document.getElementById("email").focus();
        return;
    }
     // Kiểm tra tên đăng nhập
    if (tenDangNhap == "") {
        alert("Vui lòng nhập tên đăng nhập");
        document.getElementById("username").focus();
        return;
    }
     // Kiểm tra mật khẩu tối thiểu 6 ký tự
    if (matKhau.length < 6) {
        alert("Mật khẩu phải có ít nhất 6 ký tự");
        document.getElementById("password").focus();
        return;
    }
    // Kiểm tra mật khẩu nhập lại
    if (matKhau != nhapLaiMatKhau) {
        alert("Mật khẩu nhập lại không đúng");
        document.getElementById("confirmPassword").focus();
        return;
    }
     // Kiểm tra người dùng đã đồng ý điều khoản
    if (dongY == false) {
        alert("Bạn phải đồng ý với điều khoản sử dụng");
        return;
    }
     // Kiểm tra tên đăng nhập đã tồn tại hay chưa
    if (tenDangNhapDaTonTai(tenDangNhap) == true) {
        alert("Tên đăng nhập đã tồn tại");
        document.getElementById("username").focus();
        return;
    }
    // Tạo đối tượng tài khoản
    var taiKhoan = {
        hoTen: hoTen,
        email: email,
        tenDangNhap: tenDangNhap,
        matKhau: matKhau
    };
    // Lưu tài khoản vào LocalStorage
    luuTaiKhoan(taiKhoan);
    alert("Đăng ký thành công");// Thông báo đăng ký thành công
    window.location.href = "login.html"; // Chuyển sang trang đăng nhập
}
// Kiểm tra tên đăng nhập
function tenDangNhapDaTonTai(tenDangNhap) {
    var soLuong = Number(localStorage.getItem("soLuongTaiKhoan"));// Lấy số lượng tài khoản đã lưu
    var i;
    if (soLuong == 0) {
        return false;
    }

    for (i = 0; i < soLuong; i++) {
        if (localStorage.getItem("taiKhoan_" + i + "_tenDangNhap") == tenDangNhap) {// Nếu tên đăng nhập đã tồn tại
            return true;
        }
    }

    return false;
}
// Lưu tài khoản vào localStorage
function luuTaiKhoan(taiKhoan) {
    var soLuong = Number(localStorage.getItem("soLuongTaiKhoan"));// Lấy số lượng tài khoản hiện có
    // Lưu họ tên
    localStorage.setItem("taiKhoan_" + soLuong + "_hoTen", taiKhoan.hoTen);// Lưu email
    localStorage.setItem("taiKhoan_" + soLuong + "_email", taiKhoan.email);// Lưu tên đăng nhập
    localStorage.setItem("taiKhoan_" + soLuong + "_tenDangNhap", taiKhoan.tenDangNhap);// Lưu mật khẩu
    localStorage.setItem("taiKhoan_" + soLuong + "_matKhau", taiKhoan.matKhau); // Tăng số lượng tài khoản lên 1
    localStorage.setItem("soLuongTaiKhoan", soLuong + 1);// Tăng số lượng tài khoản lên 1
}
// Cập nhật số lượng giỏ hàng
function capNhatSoLuongGioHang() {
    var soLuong = Number(localStorage.getItem("tongSoLuongGioHang"));// Lấy tổng số lượng sản phẩm trong giỏ hàng
    var huyHieu = document.getElementsByClassName("no-ordered-items");// Lấy tất cả phần tử hiển thị số lượng giỏ hàng
    var i;

    for (i = 0; i < huyHieu.length; i++) {
        huyHieu[i].innerHTML = soLuong;// Hiển thị số lượng sản phẩm
    }
}
