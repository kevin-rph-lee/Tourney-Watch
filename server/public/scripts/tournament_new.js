$(document).ready(function () {

  $("#new-tournament-form").on('submit', function (event) {
    event.preventDefault();
    var formData = {
      'no_of_teams': +$('select[id="entry-team"]').val(),
      'name': $('input[id=entry-name]').val(),
      'description': $('input[id=entry-description]').val(),
      'twitch_channel': $('input[id=entry-channel]').val()
    };
    console.log(formData)
    $.ajax({
      type: "POST",
      url: "/tournaments/new",
      data: formData,
      success: function () {
        $("#new-tournament-form").html("Tournament Created!");
      }
    })
  })
});