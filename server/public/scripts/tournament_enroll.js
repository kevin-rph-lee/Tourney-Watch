$(document).ready(function () {
  $(".enroll-me").on('click', function (event) {
    $.ajax({
      type: "POST",
      url: "/enrollments/" + tournamentID + "/enroll",
      success: function () {
        $("#new-tournament-form").html("Enrolled! Created!");
      }
    })
  })
});