main();
// Block input id 
document.getElementById("id").disabled = true;
var taiKhoanDaCo = [];
var abc = "";
function main() {
  apiGetUsers().then(function (result) {
    var users = result.data;


    for (var i = 0; i < users.length; i++) {
      var user = users[i];

      users[i] = new User(
        user.id,
        user.taiKhoan,
        user.hoTen,
        user.matKhau,
        user.email,
        user.loaiND,
        user.ngonNgu,
        user.moTa,
        user.hinhAnh
      );
      taiKhoanDaCo.push(user.taiKhoan);

    };
    display(users);
  });

}
// Hàm hiển thị
function display(users) {
  var html = "";
  for (var i = 0; i < users.length; i++) {
    var user = users[i];
    html += `
        <tr>
        <td>${user.id}</td>
        <td>${user.taiKhoan}</td>
        <td>${user.hoTen}</td>
        <td>${user.matKhau}</td>
        <td>${user.email}</td>      
        <td>
        <img src="${user.hinhAnh}"  width="70px" height="70px" />
        </td>
        <td>${user.loaiND}</td>
        <td>${user.ngonNgu}</td>
        <td>${user.moTa}</td>
        <td>
          <button
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#myModal"
            data-type="update"
            data-id="${user.id}"
          >
            Cập Nhật
          </button>
          <button
            class="btn btn-danger"
            data-type="delete"
            data-id="${user.id}"
          >
            Xoá
          </button>
        </td>
        </tr>`;
  }
  document.getElementById("tblDanhSachNguoiDung").innerHTML = html;
}
function resetForm() {
  // Reset form
  document.getElementById("id").value = "";
  document.getElementById("TaiKhoan").value = "";
  document.getElementById("HoTen").value = "";
  document.getElementById("MatKhau").value = "";
  document.getElementById("Email").value = "";
  document.getElementById("loaiNguoiDung").value = "Chọn loại người dùng";
  document.getElementById("loaiNgonNgu").value = "Chọn ngôn ngữ";
  document.getElementById("MoTa").value = "";
  document.getElementById("HinhAnh").value = "";

  // Đóng modal (vì sử dụng bootstrap nên phải tuân theo cách làm của nó)
  $("#myModal").modal("hide");
}
// Hàm reset thông báo 
function resetTb() {
  document.getElementById("tbTaiKhoan").style.display = "none";
  document.getElementById("tbHoTen").style.display = "none";
  document.getElementById("tbMatKhau").style.display = "none";
  document.getElementById("tbEmail").style.display = "none";
  document.getElementById("tbHinhAnh").style.display = "none";
  document.getElementById("tbND").style.display = "none";
  document.getElementById("tbNgonNgu").style.display = "none";
  document.getElementById("tbMoTa").style.display = "none";
}
// Hàm gọi api thêm người dùng
function addUser() {
  // B1: DOM
  var taiKhoan = document.getElementById("TaiKhoan").value;
  var hoTen = document.getElementById("HoTen").value;
  var matKhau = document.getElementById("MatKhau").value;
  var email = document.getElementById("Email").value;
  var loaiND = document.getElementById("loaiNguoiDung").value;
  var ngonNgu = document.getElementById("loaiNgonNgu").value;
  var moTa = document.getElementById("MoTa").value;
  var hinhAnh = document.getElementById("HinhAnh").value;

  // Tạo validation
  var isVali = validation();

  if (!isVali) {
    return;
  }
  // Khởi tạo đối tượng user
  var user = new User(
    null,
    taiKhoan,
    hoTen,
    matKhau,
    email,
    loaiND,
    ngonNgu,
    moTa,
    hinhAnh
  );
  // Gọi Api thêm người dùng
  apiAddUsers(user)
    .then(function (result) {
      main();
      resetForm();
    })
    .catch(function (error) {
      console.log(error);
    });
}
// Hàm gọi api cập nhật người dùng
function updateUser() {
  // B1: DOM
  var id = document.getElementById("id").value;
  var taiKhoan = document.getElementById("TaiKhoan").value;
  var hoTen = document.getElementById("HoTen").value;
  var matKhau = document.getElementById("MatKhau").value;
  var email = document.getElementById("Email").value;
  var loaiND = document.getElementById("loaiNguoiDung").value;
  var ngonNgu = document.getElementById("loaiNgonNgu").value;
  var moTa = document.getElementById("MoTa").value;
  var hinhAnh = document.getElementById("HinhAnh").value;

  // Tạo validation
  var isVali = validation();

  if (!isVali) {
    return;
  }

  var user = new User(
    id,
    taiKhoan,
    hoTen,
    matKhau,
    email,
    loaiND,
    ngonNgu,
    moTa,
    hinhAnh
  );
  apiUpdateUser(user)
    .then(function (result) {
      main();
      resetForm();
    })
    .catch(function (error) {
      console.log(error);
    });
}
// Hàm xoá người dùng
function deleteUser(userId) {
  apiDeleteUser(userId)
    .then(function () {
      main();
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Hàm modal thêm người dùng
document
  .getElementById("btnThemNguoiDung")
  .addEventListener("click", showAddModal);
function showAddModal() {
  document.querySelector(".modal-title").innerHTML = "Thêm người dùng";
  document.querySelector(".modal-footer").innerHTML = `
  <button
      class="btn btn-primary"
      data-type="add"
      
    >
      Thêm
    </button>
    <button
      class="btn btn-secondary"
      data-toggle="modal"
      data-target="#myModal"
    >
      Huỷ
    </button>
  `;
  resetTb();
}
// Hàm modal cập nhật người dùng
function showUpdateModal(userId) {
  document.querySelector(".modal-title").innerHTML = "Cập nhật người dùng";
  document.querySelector(".modal-footer").innerHTML = `
  <button
      class="btn btn-primary"
      data-type="update"
    >
      Cập nhật
    </button>
    <button
      class="btn btn-secondary"
      data-dismiss="modal"
    >
      Huỷ
    </button>
  `;
  resetTb();

  // gọi api điền dât lên form
  apiGetUserDetail(userId)
    .then(function (result) {
      var user = result.data;
      document.getElementById("id").value = user.id;
      document.getElementById("TaiKhoan").value = user.taiKhoan;
      document.getElementById("HoTen").value = user.hoTen;
      document.getElementById("MatKhau").value = user.matKhau;
      document.getElementById("Email").value = user.email;
      document.getElementById("loaiNguoiDung").value = user.loaiND;
      document.getElementById("loaiNgonNgu").value = user.ngonNgu;
      document.getElementById("MoTa").value = user.moTa;
      document.getElementById("HinhAnh").value = user.hinhAnh;
    })
    .catch(function (error) {
      console.log(error);
    });
}
// Hàm thực thi các trường hợp của modal-footer
document.querySelector(".modal-footer").addEventListener("click", handleSubmit);
function handleSubmit(event) {
  var type = event.target.getAttribute("data-type");
  switch (type) {
    case "add":
      addUser();
      break;
    case "update":
      updateUser();
      break;
    default:
      break;
  }
}
// Hàm thức thi button xoá và cập nhật trong table
document
  .getElementById("tblDanhSachNguoiDung")
  .addEventListener("click", hadleAction);
function hadleAction(event) {
  var id = event.target.getAttribute("data-id");
  var type = event.target.getAttribute("data-type");

  switch (type) {
    case "delete":
      deleteUser(id);
      break;
    case "update":
      showUpdateModal(id);
      break;
    default:
      break;
  }
}
// Hàm search
document.getElementById("search").addEventListener("keypress", handleSearch);
function handleSearch(event) {
  console.log(event);
  if (event.key !== "Enter") return;
  var value = event.target.value;
  apiGetUsers(value).then(function (result) {
    var users = result.data;
    for (var i = 0; i < users.length; i++) {
      var user = users[i];
      users[i] = new User(
        user.id,
        user.taiKhoan,
        user.hoTen,
        user.matKhau,
        user.email,
        user.loaiND,
        user.ngonNgu,
        user.moTa,
        user.hinhAnh
      );
    }
    // Gọi hàm display để hiển thị danh sách sản phẩm ra giao diện
    display(users);
    console.log(users);
  });
}
// + Bằng icon search 
document.getElementById("buttonSearch").addEventListener("click", handleSearchButton);
function handleSearchButton() {


  // DOM tới input lấy giá trị để tìm kiếm
  var value = document.getElementById("search").value;
  apiGetUsers(value).then(function (result) {
    var users = result.data;
    for (var i = 0; i < users.length; i++) {
      var user = users[i];
      users[i] = new User(
        user.id,
        user.taiKhoan,
        user.hoTen,
        user.matKhau,
        user.email,
        user.loaiND,
        user.ngonNgu,
        user.moTa,
        user.hinhAnh
      );
    }
    // Gọi hàm display để hiển thị danh sách sản phẩm ra giao diện
    display(users);
    console.log(users);
  });
}
function validation() {

  var taiKhoan = document.getElementById("TaiKhoan").value;
  var hoTen = document.getElementById("HoTen").value;
  var matKhau = document.getElementById("MatKhau").value;
  var email = document.getElementById("Email").value;
  var loaiND = document.getElementById("loaiNguoiDung").value;
  var ngonNgu = document.getElementById("loaiNgonNgu").value;
  var moTa = document.getElementById("MoTa").value;
  var hinhAnh = document.getElementById("HinhAnh").value;
  // Biến cờ hiệu
  var isValid = true;
  // Kiêm tra tài khoản 
  if (!isRequired(taiKhoan)) {

    isValid = false;
    document.getElementById("tbTaiKhoan").style.display = "block";
    document.getElementById("tbTaiKhoan").innerHTML =
      "Tài khoản người dùng không được để trống";
  }
  else if (taiKhoan === taiKhoanDaCo.find(checkabc)) {
    isValid = false;
    document.getElementById("tbTaiKhoan").style.display = "block";
    document.getElementById("tbTaiKhoan").innerHTML =
      "Tài khoản người dùng đã bị trùng tên";
  }
  // Kiểm tra họ tên
  var hoTenPattern = new RegExp("^[a-zA-Z ]+$");
  if (!isRequired(hoTen)) {

    isValid = false;
    document.getElementById("tbHoTen").style.display = "block";
    document.getElementById("tbHoTen").innerHTML =
      "Họ và tên người dùng không được để trống";
  } else if (!hoTenPattern.test(hoTen)) {

    isValid = false;
    document.getElementById("tbHoTen").style.display = "block";
    document.getElementById("tbHoTen").innerHTML =
      "Họ và tên người không đúng định dạng";
  }
  // Kiểm tra matKhau
  var matKhauPattern = new RegExp(
    "^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])[A-Za-z0-9@$!%*?&]{6,10}$"
  );
  if (!isRequired(matKhau)) {
    isValid = false;
    document.getElementById("tbMatKhau").style.display = "block";
    document.getElementById("tbMatKhau").innerHTML =
      "Mật khẩu người dùng không được để trống";
  } else if (!matKhauPattern.test(matKhau)) {
    isValid = false;
    document.getElementById("tbMatKhau").style.display = "block";
    document.getElementById("tbMatKhau").innerHTML =
      "Mật khẩu người dùng không đúng định dạng";
  }
  // Kiểm tra email 
  var emailPattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$");
  if (!isRequired(email)) {
    isValid = false;
    document.getElementById("tbEmail").style.display = "block";
    document.getElementById("tbEmail").innerHTML =
      "Email người dùng không được để trống";
  } else if (!emailPattern.test(email)) {
    isValid = false;
    document.getElementById("tbEmail").style.display = "block";
    document.getElementById("tbEmail").innerHTML =
      "Email người dùng không đúng định dạng";
  }
  // Kiểm tra hình ảnh 
  if (!isRequired(hinhAnh)) {
    isValid = false;
    document.getElementById("tbHinhAnh").style.display = "block";
    document.getElementById("tbHinhAnh").innerHTML =
      "Hình ảnh người dùng không được để trống";
  }
  // Kiểm tra loại người dùng
  if (!isRequired(loaiND)) {
    isValid = false;
    document.getElementById("tbND").style.display = "block";
    document.getElementById("tbND").innerHTML =
      "Chức vụ không được để trống";
  } else if (loaiND === "Chọn loại người dùng") {
    isValid = false;

    document.getElementById("tbND").style.display = "block";
    document.getElementById("tbND").innerHTML = "Vui lòng chọn loại người dùng";
  }
  // Kiểm tra loại ngôn ngữ
  if (!isRequired(ngonNgu)) {
    isValid = false;
    document.getElementById("tbNgonNgu").style.display = "block";
    document.getElementById("tbNgonNgu").innerHTML =
      "Chức vụ không được để trống";
  } else if (ngonNgu === "Chọn ngôn ngữ") {
    isValid = false;

    document.getElementById("tbNgonNgu").style.display = "block";
    document.getElementById("tbNgonNgu").innerHTML = "Vui lòng chọn loại ngôn ngữ";
  }
  var moTaPattern = new RegExp("^[A-Za-z0-9@$!%*?&]{1,60}$");

  if (!isRequired(moTa)) {

    isValid = false;
    document.getElementById("tbMoTa").style.display = "block";
    document.getElementById("tbMoTa").innerHTML =
      "Mô tả không được để trống";
  }
  else if (!moTaPattern.test(moTa)) {
    isValid = false;
    document.getElementById("tbMoTa").style.display = "block";
    document.getElementById("tbMoTa").innerHTML =
      "Mô tả vượt quá 60 ký tự";
  }
  console.log(isValid);
  return isValid;
}
function isRequired(value) {
  if (!value) {
    return false;
  }

  return true;
}




// Hàm kiểm tra tên tài khoản trên api 
function checkabc(name) {
  return document.getElementById("TaiKhoan").value === name
}
