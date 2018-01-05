
$(document).ready(function () {
  // console.log('I am ready');
  $('.submit').click(function(e){

    const password = $('#entry-password').val();
    const battlenet = $('#entry-battlenet').val()

    console.log(password + battlenet);
    console.log(userID);
    $.ajax({
      url: '/users/' + userID + '/edit/',
      data: {password: password, battlenet: battlenet },
      method: 'POST'
    }).done(() => {
      //Redirects to the index
      window.location.reload();
    }).catch((err) => {
      //TO DO: make look nice with a flash message or something
      alert('error!');
      console.log(err.status);
    });
    //empty the DOM and insert a loader
    $('.container').empty();
    $('.container').append('<div class="loader"></div>');
  
  
  });

});