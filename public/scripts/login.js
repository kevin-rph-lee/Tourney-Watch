$(document).ready(function () {

  $('.submit').click(function(e){

    $.ajax({
<<<<<<< HEAD
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
=======
      url: '/users/login',
      data: {email: $('#entry-email').val(), password:$('#entry-password').val() },
      method: 'POST'
    }).done(() => {
      //Redirects to the index
      window.location.replace('/');
    }).catch((err) => {
      //TO DO: make look nice
      console.log('error!');
      console.log(err.status);
    });
  });

});
>>>>>>> master
