$(document).ready(function () {
  $("#login-form").on('submit', function (event) {
    event.preventDefault();
    var formData = {
      'email': $('input[id=entry-email]').val(),
      'password': $('input[id=entry-password]').val(),
    };
    $.ajax({
      type: "POST",
      url: "/users/login",
      data: formData,
      success: function () {
          $("#login-form").html("You are now logged in!")
      },
      404: function(request, status, error) {
      .catch((err) =>{
        if(err.stauts == 404){
          ape
        }
      })   
        
        $('.alert').append(`
            <div some fancy whcih giv esyou shit>
            `)
      }
    })
  })
});