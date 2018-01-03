$(document).ready(function () {
  $("#logout-btn").on('click', function (event) {
    event.preventDefault();
    console.log('attempting post');
    $.ajax({
      type: "POST",
      url: "/users/logout",
      success: function (result) {
          location.href="/";
      }
    })
  })
});