var baseUrl = "https://62b06198e460b79df0446b94.mockapi.io/Api"

// Call Api Lấy danh sách người dùng
function apiGetUsers(search,) {
    return axios({
      url: baseUrl,
      method: "GET",
      params: {      
        hoTen: search,
           
      },
    });
  }
  // Hàm call API thêm người dùng
function apiAddUsers(user) {
  return axios({
    url: baseUrl,
    method: "POST",
    data: user,
  });
}
// Hàm call API xoá người dùng
function apiDeleteUser(userId) {
  return axios({
    url: `${baseUrl}/${userId}`,
    method: "DELETE",
  });
}
// Hàm call API cập nhật sản phẩm
function apiUpdateUser(user) {
  return axios({
    url: `${baseUrl}/${user.id}`,
    data: user,
    method: "PUT",
  });
}
// Hàm call API lấy chi tiết sản phẩm
function apiGetUserDetail(userId) {
  return axios({
    url: `${baseUrl}/${userId}`,
    method: "GET",
  });
}
// Hàm kiểm tra taiKhoan 
function apiGetTaiKhoan(search) {
  return axios({
    url: baseUrl,
    method: "GET",
    params: {      
      taiKhoan: search,
         
    },
  });
}


