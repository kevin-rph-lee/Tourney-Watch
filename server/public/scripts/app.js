
$(document).ready(function () {

    $("#registration-form").on('submit', function (event) {
        event.preventDefault();
        var formData = {
            'email': $('input[id=entry-email]').val(),
            'battlenet_id': $('input[id=entry-battlenet]').val(),
            'password': $('input[id=entry-password]').val(),

        };
        $.ajax({
            type: "POST",
            url: "/users/new",
            data: formData,
            success: function () {
                $("#registration-form").html("You have successfully registered!");
            }
        })
    })

    $("#login-form").on('submit', function (event) {
        event.preventDefault();
        var formData = {
            'email': $('input[id=entry-email]').val(),
            'password': $('input[id=entry-password]').val(),
        };
        $.ajax({
            type: "POST",
            url: "/users/login",
            data: formData,
            success: function () {
                $("#login-form").html("You are now logged in!");
            }
        })
    })

    $("#new-tournament-form").on('submit', function (event) {
        event.preventDefault();
        var formData = {
            'no_of_teams': +$('select[id="entry-team"]').val(),
            'name': $('input[id=entry-name]').val(),
            'description': $('input[id=entry-description]').val(),
        };
        $.ajax({
            type: "POST",
            url: "/tournaments/new",
            data: formData,
            success: function () {
                $("#new-tournament-form").html("Tournament Created!");
            }
        })
    })
})

