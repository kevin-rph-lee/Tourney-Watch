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

  // will need to pull in tournamentID somehow to make this work
  // $("#new-tournament-form").on('submit', function (event) {
  //   event.preventDefault();
  //   var formData = {
  //     'no_of_teams': +$('select[id="entry-team"]').val(),
  //     'name': $('input[id=entry-name]').val(),
  //     'description': $('input[id=entry-description]').val(),
  //     'twitch_channel': $('input[id=entry-channel]').val()
  //   };
  //   console.log(formData)
  //   $.ajax({
  //     type: "POST",
  //     url: "/tournaments/new",
  //     data: formData,
  //     success: function () {
  //       $("#new-tournament-form").html("Tournament Created!");
  //       throw location.href = `http://localhost:8080/tournaments/${tournamentID}`;
  //     }
  //   })
  // })
  
});