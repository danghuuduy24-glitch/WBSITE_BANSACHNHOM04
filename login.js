//Sinh viên code: Đặng Hữu Duy
// Khởi tạo trang đăng nhập
window.onload = function () { //window là đối tượng đại diện cho cửa sổ trình duyệt, 
                              //onload là sự kiện xảy ra khi toàn bộ trang web tải xong
    
                              if (localStorage.getItem("soLuongTaiKhoan") == null) {
    //tài khoản test
    localStorage.setItem("taiKhoan_1_hoTen","Đặng Hữu Duy");
    localStorage.setItem("taiKhoan_1_email","Duyb2410658@student.ctu.edu.vn");
    localStorage.setItem("taiKhoan_1_tenDangNhap","HuuDuy");
    localStorage.setItem("taiKhoan_1_matKhau","123456Duy@");

    localStorage.setItem("soLuongTaiKhoan","1");
}
    var formDangNhap = document.getElementById("loginForm");//tìm phần tử HTML có id là loginForm
    var nutHienMatKhau = document.getElementById("showPassword");//tìm phần tử HTML có id là showPassword
    formDangNhap.addEventListener("submit", dangNhap);//addEventListener dùng để đăng ký sự kiện
    nutHienMatKhau.addEventListener("click", hienAnMatKhau);
    capNhatSoLuongGioHang(); //gọi hàm cập nhật số lượng
};
// Hiện hoặc ẩn mật khẩu
function hienAnMatKhau() {
    var matKhau = document.getElementById("password"); //lấy nút nhập mk
    var nutHienMatKhau = document.getElementById("showPassword"); //lấy nút hiện mk
    if (matKhau.type == "password") {
        matKhau.type = "text"; //đổi kiểu ô nhập thành text
        nutHienMatKhau.innerHTML = "👁";
    } else {
        matKhau.type = "password";
        nutHienMatKhau.innerHTML = "👁";
    }
};
// Kiểm tra đăng nhập
function dangNhap(suKien) {
    suKien.preventDefault();//ngăn form tự tải lại trang
    var tenDangNhap = document.getElementById("username").value.trim(); //lấy nội dung người nhập ở ô "tên đăng nhập",bỏ khoảng trắng đầu vs cuối
    var matKhau = document.getElementById("password").value;//lấy mk người dùng nhập
    var taiKhoan;
    if (tenDangNhap == "") {
        alert("Vui lòng nhập tên đăng nhập");//hiện thông báo
        document.getElementById("username").focus();//đưa con trỏ chuột về ô nhập tên
        return;
    }
    if (matKhau == "") {
        alert("Vui lòng nhập mật khẩu");
        document.getElementById("password").focus();
        return;
    }
    taiKhoan = timTaiKhoan(tenDangNhap, matKhau);
    if (taiKhoan == null) {
        alert("Sai tên đăng nhập hoặc mật khẩu");
        return;
    }
    localStorage.setItem("currentUserHoTen", taiKhoan.hoTen);//lưu họ tên
    localStorage.setItem("currentUserEmail", taiKhoan.email);//lưu email
    localStorage.setItem("currentUserTenDangNhap", taiKhoan.tenDangNhap);//lưu tên đăng nhập
    alert("Đăng nhập thành công");
    window.location.href = "trangbanhang.html";//chuyển trang
}
// Tìm tài khoản phù hợp
function timTaiKhoan(tenDangNhap, matKhau) {
    var soLuong = Number(localStorage.getItem("soLuongTaiKhoan"));//Lấy số lượng tài khoản đã lưu trong localStorage
                                                                  //chuyển từ chuỗi sang kiểu số bằng Number() để có thể dùng trong vòng lặp.
    var i;
    for (i = 0; i < soLuong; i++) {
        if (localStorage.getItem("taiKhoan_" + i + "_tenDangNhap") == tenDangNhap && //Tên đăng nhập đã lưu có trùng với tên người dùng nhập hay không
            localStorage.getItem("taiKhoan_" + i + "_matKhau") == matKhau) { //Mật khẩu đã lưu có trùng với mật khẩu người dùng nhập hay không
            return {
                hoTen: localStorage.getItem("taiKhoan_" + i + "_hoTen"),
                email: localStorage.getItem("taiKhoan_" + i + "_email"),
                tenDangNhap: localStorage.getItem("taiKhoan_" + i + "_tenDangNhap")
            };
        }
    }
    return null;
}
// Cập nhật số lượng giỏ hàng
function capNhatSoLuongGioHang() {
    var soLuong = Number(localStorage.getItem("tongSoLuongGioHang"));//Đọc giá trị tongSoLuongGioHang từ localStorage và chuyển sang kiểu số.
    var huyHieu = document.getElementsByClassName("no-ordered-items");//Lấy tất cả các phần tử HTML có class no-ordered-items
    var i;
    for (i = 0; i < huyHieu.length; i++) {
        huyHieu[i].innerHTML = soLuong; //Gán số lượng sản phẩm vào nội dung của từng phần tử
    }
}
