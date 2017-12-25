$(document).ready(function () {
  $("#registration-form").on('submit', function (event) {
    event.preventDefault();
    var formData = {
      'email': $('input[id=entry-email]').val(),
      'battlenet_id': $('input[id=entry-battlenet]').val(),
      'password': $('input[id=entry-password]').val(),
    };
    $.ajax({
      type: "POST",
      url: "/users/new",
      data: formData,
      success: function () {
        $("#registration-form").html("You have successfully registered!");
      }
    })
  })
});