//Sinh viên code: Đỗ Thanh Bình
var danhSachMa = [];// Khai báo mảng dùng để lưu các mã sách đã có trong giỏ hàng
// KHỞI TẠO TRANG
window.onload = function () {
    docDanhSachMa();// gọi hàm
    hienThiGioHang();
    ganSuKienNutXoaTatCa();
    ganSuKienDatHang();
};
// Đọc danh sách mã sách từ Local Storage
function docDanhSachMa() {
    var chuoiMa = localStorage.getItem("danhSachMa"); // Lấy chuỗi mã sách đã lưu
    if (chuoiMa == null || chuoiMa == "") { // Nếu chưa có dữ liệu hoặc chuỗi rỗng
        danhSachMa = []; // Khởi tạo mảng rỗng
    } else {
        danhSachMa = chuoiMa.split("|");// Tách chuỗi thành mảng bằng dấu |
    }
}
// Hiển thị các sản phẩm trong giỏ hàng
function hienThiGioHang() {
    var thanBang = document.getElementById("danhSachGioHang");// Lấy phần thân của bảng hiển thị giỏ hàng
    var tongTien = 0;

    thanBang.innerHTML = ""; // Xóa toàn bộ dữ liệu cũ trong bảng

    if (danhSachMa.length == 0) {
        var dongTrong = document.createElement("tr");  // Tạo một dòng mới trong bảng
        var oTrong = document.createElement("td"); // Tạo một ô trong dòng
        oTrong.setAttribute("colspan", "6");// Cho ô chiếm toàn bộ 6 cột của bảng
        oTrong.className = "empty-cart"; // Gán class để CSS định dạng
        oTrong.innerHTML = "Giỏ hàng đang trống"; // Hiển thị thông báo

        dongTrong.appendChild(oTrong);// Đưa ô vào dòng
        thanBang.appendChild(dongTrong);// Đưa dòng vào bảng

        document.getElementById("nhanTongTien").innerHTML = "0";// Hiển thị tổng tiền bằng 0
        capNhatSoLuong();// Cập nhật số lượng trên biểu tượng giỏ hàng
        return;
    }
    // Nếu giỏ hàng có sản phẩm duyệt từng mã sách trong mảng
    for (var i = 0; i < danhSachMa.length; i++) {
        var maSach = danhSachMa[i];// lấy mã sách
        var sanPham = docSanPham(maSach);// Đọc thông tin sách từ LocalStorage
        var thanhTien = sanPham.gia * sanPham.soLuong; // Tính thành tiền

        tongTien = tongTien + thanhTien;// Cộng dồn vào tổng tiền
        taoDongSanPham(thanBang, sanPham, thanhTien);
    }

    document.getElementById("nhanTongTien").innerHTML = dinhDangTien(tongTien); // Hiển thị tổng tiền sau khi định dạng
    localStorage.setItem("tienPhaiTra", tongTien);// Lưu tổng tiền vào LocalStorage
    capNhatSoLuong();
}

// Đọc thông tin một sản phẩm
function docSanPham(maSach) {
    // Tạo một đối tượng lưu toàn bộ thông tin của sản phẩm
    var sanPham = {
        ma: maSach,  // Lưu mã sách được truyền vào hàm
        ten: localStorage.getItem("ten_" + maSach),  // Đọc tên sách từ LocalStorage
        gia: Number(localStorage.getItem("gia_" + maSach)),
        hinh: localStorage.getItem("hinh_" + maSach),
        soLuong: Number(localStorage.getItem("soLuong_" + maSach))
    };

    return sanPham;
}

// Tạo một dòng sản phẩm trong bảng
function taoDongSanPham(thanBang, sanPham, thanhTien) {
    var dong = document.createElement("tr"); // Tạo một dòng mới trong bảng
     // CỘT HÌNH ẢNH
    var oHinh = document.createElement("td");
    var hinh = document.createElement("img");
    hinh.src = sanPham.hinh;// Gán đường dẫn ảnh
    hinh.alt = sanPham.ten;// Gán nội dung alt để hiển thị khi ảnh lỗi
    hinh.className = "cart-image";// Gán class CSS
    oHinh.appendChild(hinh);// Đưa ảnh vào ô
    // CỘT TÊN SÁCH
    var oTen = document.createElement("td");
    oTen.innerHTML = sanPham.ten; // Hiển thị tên sách
    // CỘT GIÁ
    var oGia = document.createElement("td");
    oGia.innerHTML = dinhDangTien(sanPham.gia) + " đ"; // Định dạng giá rồi thêm ký hiệu đồng

    var oSoLuong = document.createElement("td");
    var nutGiam = taoNutSoLuong("-", sanPham.ma, giamSoLuong);
    var nhanSoLuong = document.createElement("span");
    var nutTang = taoNutSoLuong("+", sanPham.ma, tangSoLuong);
    // CỘT SỐ LƯỢNG
    nhanSoLuong.className = "quantity-number";
    nhanSoLuong.innerHTML = sanPham.soLuong;
    oSoLuong.appendChild(nutGiam);
    oSoLuong.appendChild(nhanSoLuong);// Tạo thẻ hiển thị số lượng
    oSoLuong.appendChild(nutTang);
    // CỘT THÀNH TIỀN
    var oThanhTien = document.createElement("td");
    oThanhTien.innerHTML = dinhDangTien(thanhTien) + " đ";
    // CỘT THAO TÁC
    var oThaoTac = document.createElement("td");
    var nutXoa = document.createElement("button");
    nutXoa.type = "button";
    nutXoa.className = "btn-delete";
    nutXoa.innerHTML = "Xóa"; // Hiển thị chữ Xóa
    nutXoa.setAttribute("data-ma", sanPham.ma);// Gắn mã sách vào thuộc tính data-ma
    nutXoa.addEventListener("click", xoaSanPham); // Khi nhấn nút sẽ gọi hàm xoaSanPham()
    oThaoTac.appendChild(nutXoa);
    // ĐƯA TỪNG Ô VÀO DÒNG
    dong.appendChild(oHinh);
    dong.appendChild(oTen);
    dong.appendChild(oGia);
    dong.appendChild(oSoLuong);
    dong.appendChild(oThanhTien);
    dong.appendChild(oThaoTac);
     // Đưa dòng hoàn chỉnh vào bảng
    thanBang.appendChild(dong);
}
// Tạo nút tăng hoặc giảm số lượng
function taoNutSoLuong(noiDung, maSach, hamXuLy) {
    var nut = document.createElement("button");
    nut.type = "button";
    nut.className = "quantity-button"; // Gán class CSS để định dạng giao diện
    nut.innerHTML = noiDung;// Hiển thị nội dung của nút (+ hoặc -)
    nut.setAttribute("data-ma", maSach);// Lưu mã sách vào thuộc tính data-ma
    nut.addEventListener("click", hamXuLy);

    return nut;
}
// Tăng số lượng một sản phẩm
function tangSoLuong() {
    var maSach = this.getAttribute("data-ma"); // Lấy mã sách từ nút vừa được nhấn
    var soLuong = Number(localStorage.getItem("soLuong_" + maSach));  // Lấy số lượng hiện tại trong LocalStorage chuyển sang số
    localStorage.setItem("soLuong_" + maSach, soLuong + 1);//tăng 1
    hienThiGioHang();//cập nhật số lượng và thành tiền
}
// Giảm số lượng một sản phẩm
function giamSoLuong() {
    var maSach = this.getAttribute("data-ma");
    var soLuong = Number(localStorage.getItem("soLuong_" + maSach));
    if (soLuong > 1) {
        localStorage.setItem("soLuong_" + maSach, soLuong - 1);//giảm 1
    } else {
        xoaTheoMa(maSach);//nếu chỉ còn 1 quyển thì xóa luôn khỏi giỏ hàng
    }
    hienThiGioHang();//cập nhật hiển thị giỏ hàng
}
// Xóa một sản phẩm
function xoaSanPham() {
    var maSach = this.getAttribute("data-ma");
    xoaTheoMa(maSach);
    hienThiGioHang();
}
// Xóa dữ liệu sản phẩm theo mã
function xoaTheoMa(maSach) {
    var viTri = timViTriMa(maSach);// Tìm vị trí của mã sách trong mảng danhSachMa
    if (viTri != -1) {
        danhSachMa.splice(viTri, 1); // splice(vị trí, số phần tử cần xóa)
    }
    localStorage.removeItem("ten_" + maSach);
    localStorage.removeItem("gia_" + maSach);
    localStorage.removeItem("hinh_" + maSach);
    localStorage.removeItem("soLuong_" + maSach);
    localStorage.setItem("danhSachMa", danhSachMa.join("|"));// Cập nhật lại danh sách mã sách sau khi xóa
}
// Tìm vị trí mã sách trong mảng
function timViTriMa(maSach) {
    for (var i = 0; i < danhSachMa.length; i++) {
        if (danhSachMa[i] == maSach) {
            return i;// Trả về vị trí của mã sách
        }
    }
    return -1;
}
// Gắn sự kiện cho nút xóa tất cả
function ganSuKienNutXoaTatCa() {
    var nutXoaTatCa = document.getElementById("nutXoaTatCa");
    nutXoaTatCa.addEventListener("click", xoaTatCa);
}
// Xóa toàn bộ giỏ hàng
function xoaTatCa() {
    for (var i = 0; i < danhSachMa.length; i++) {
        var maSach = danhSachMa[i];// Lấy mã sách hiện tại
        localStorage.removeItem("ten_" + maSach);
        localStorage.removeItem("gia_" + maSach);
        localStorage.removeItem("hinh_" + maSach);
        localStorage.removeItem("soLuong_" + maSach);
    }
    danhSachMa = [];//khởi tạo lại mảng rỗng
    localStorage.removeItem("danhSachMa");
    localStorage.removeItem("tienPhaiTra");
    hienThiGioHang();
}
// Cập nhật số lượng trên biểu tượng giỏ hàng
function capNhatSoLuong() {
    var tongSoLuong = 0;
    for (var i = 0; i < danhSachMa.length; i++) {
        tongSoLuong = tongSoLuong + Number(localStorage.getItem("soLuong_" + danhSachMa[i]));
        // Lấy số lượng của từng sản phẩm rồi cộng dồn vào tổng số lượng
    }
    var nhanSoLuong = document.getElementsByClassName("no-ordered-items");
    for (var j = 0; j < nhanSoLuong.length; j++) {
        nhanSoLuong[j].innerHTML = tongSoLuong;
         // Hiển thị tổng số lượng sản phẩm
    }
}
// Gắn sự kiện cho nút đặt hàng
function ganSuKienDatHang() {
    var nutDatHang = document.getElementById("nutDatHang");

    nutDatHang.addEventListener("click", function (suKien) {
        if (danhSachMa.length == 0) {// Kiểm tra giỏ hàng có sản phẩm hay không
            suKien.preventDefault();// Nếu giỏ hàng trống thì không cho chuyển trang
            alert("Giỏ hàng đang trống");
        }
    });
}
// Định dạng số tiền bằng dấu chấm
function dinhDangTien(soTien) {
    var chuoiTien = String(soTien);// Chuyển số tiền sang kiểu chuỗi
    var ketQua = "";
    var dem = 0;
    for (var i = chuoiTien.length - 1; i >= 0; i--) {
        ketQua = chuoiTien.charAt(i) + ketQua;// Ghép từng ký tự vào đầu chuỗi kết quả
        dem++;
        if (dem == 3 && i != 0) {// Sau mỗi 3 chữ số (nếu chưa đến đầu chuỗi)
            ketQua = "." + ketQua; // Thêm dấu chấm để phân cách hàng nghìn
            dem = 0;
        }
    }
    return ketQua;// Trả về chuỗi tiền đã được định dạng
}
