$(document).ready(function () {
  // console.log('I am ready');
  $('.submit').click(function(e){
    $.ajax({
      url: '/users/new',
      data: {email: $('#entry-email').val(), password:$('#entry-password').val(), battlenet: $('#entry-battlenet').val() },
      method: 'POST'
    }).done(() => {
      //Redirects to the index
      window.location.replace('/');
    }).catch((err) => {
      //TO DO: make look nice
      alert('error!');
      console.log(err.status);
    });
  });

});
