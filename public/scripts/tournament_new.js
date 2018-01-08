$(document).ready(function () {

  $('.submit').click(function(e){
    const name = $('#entry-name').val();
    const description = $('#entry-description').val();
    const date = $('#datepicker').val();
    const noOfTeams = $('#entry-team').val();


    $.ajax({
      url: '/tournaments/new',
      data: {name: name, description: description, date: date, no_of_teams: noOfTeams},
      method: 'POST'
    }).done((id) => {
      window.location.replace('/tournaments/' + id[0]);
    }).error((err) => {
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
          window.location.replace('/tournaments/new');
        });
      }, 4000);
    });


  });


});
