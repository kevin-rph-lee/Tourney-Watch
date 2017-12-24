$(document).ready(function () {
  $(".enroll-me").on('click', function (event) {
    $.ajax({
      type: "POST",
      url: "/tournaments/" + tournamentID + "/enroll",
      success: function () {
          $("#new-tournament-form").html("Enrolled! Created!");
      }
    })
  })
});