$(document).ready(function () {

  $('.submit').click(function(e){

    $.ajax({
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
