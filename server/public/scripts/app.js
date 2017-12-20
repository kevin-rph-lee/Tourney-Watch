
$(document).ready(function () {

    function renderTeamCards(teamRoster) {
        const teamNames = Object.keys(teamRoster)
        Object.keys(teamNames).forEach((t) => {
            console.log('hi', teamNames)
            $(".row").append(`<div class="card mb-3" style="max-width: 15rem;">
                <div class="card-header">${teamNames[t]}</div>
                <div class="card-body">
                    <h4 class="card-title">Light card title</h4>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>`)})
        // console.log(card)
        // $(".card-container").html(card)
       
    }

    function loadCards() {
        $.getJSON("/tournaments/test.json")
            .done(renderTeamCards);
    }

    loadCards();

    // renderTeamCards(teamRoster);

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

    $("#test").on('click', function (event) {
        event.preventDefault();
        console.log('attempting post');
        $.ajax({
            type: "POST",
            url: "/users/logout",
            success: function (result) {
                location.href="/";
                
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

