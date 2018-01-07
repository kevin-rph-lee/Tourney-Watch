$(document).ready(function () {
  if(errorMsg !== "none") {
    $('.tournament-alert').append(`
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>OOPS!</strong> ${errorMsg}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    </div>
    `)
    window.setTimeout(function() {
      $(".alert").fadeTo(500, 0).slideUp(500, function(){
          $(this).remove();
      });
    }, 3000);
  }

  $('.submit').click(function(e){
    const name = $('#entry-name').val();
    const description = $('#entry-description').val();
    const date = $('#datepicker').val();


    $.ajax({
      url: '/users/new',
      data: {email: email, password: password, battlenet: battlenet},
      method: 'POST'
    }).done(() => {
      //Redirects to the index
      window.location.replace(`/users/${userID}`);
    }).catch((err) => {
      $('.register-alert').append(`
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>OOPS!</strong> ${err.responseText}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      </div>
      `)
      window.setTimeout(function() {
        $(".alert").fadeTo(500, 0).slideUp(500, function(){
          window.location.replace('/users/new');
        });
      }, 4000);
    });


  });


});
