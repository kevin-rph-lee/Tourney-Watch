$(document).ready(function () {

    $("#registration-form").on('submit', function (event) {
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "/users/new",
            data: data,
            success: function () {
                $("#registration-form").html("You have successfully registered!");
            }
        })
    })

    $("#login-form").on('submit', function (event) {
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "/users/login",
            data: data,
            success: function () {
                $("#login-form").html("You are now logged in!");
            }
        })
    })

    $("#new-tournament-form").on('submit', function (event) {
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "/tournaments/new",
            data: data,
            success: function () {
                $("#new-tournament-form").html("Tournament Created!");
            }
        })
    })
})
