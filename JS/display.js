

html();

function html() {
  apiGetUsers().then(function (result) {
    var users = result.data;
    var usersGV = users.filter(function(user) {
        return user.loaiND === "GV"
    })
    for (var i = 0; i < usersGV.length; i++) {
      var user = usersGV[i];
      usersGV[i] = new User(
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
    hienThi(usersGV);
  });
}
function hienThi(users) {
    var html = "";
    for (var i = 0; i < users.length; i++) {
      var user = users[i];
      html += `
      <div class="col-lg-3 col-sm-6 col-xs-12 product-item">
      <div>
        <div class="item-top" style="background-image: url(${user.hinhAnh})">
        </div>
        <div class="item-bot">
          <h6 class="nation">${user.ngonNgu}</h6>
          <h2 class="name">${user.hoTen}</h2>
          <span class="status">${user.moTa}</span>
        </div>
      </div>
    </div>
      `;
    }
    document.getElementById("hienThi").innerHTML = html;
}
