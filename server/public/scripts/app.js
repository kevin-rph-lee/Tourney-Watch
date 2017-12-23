
$(document).ready(function () {


    function renderTeamCards(teamRoster) {
        const teamNames = Object.keys(teamRoster)
        $(".tournamentheader").append(`
        <h1>${teamRoster["1"]["0"]["name"]}</h1>
        `)
        Object.keys(teamNames).forEach((t) => {
            $(".row").append(`
            <div class="card mb-3" style="min-width: 15rem">
                <div class="card-header">${teamNames[t]}</div>n
                    <div class="card-body" data-team-id="${teamNames[t]}">
                </div>
            </div>
            `)

            teamRoster[teamNames[t]].forEach((user) => {
                $(`[data-team-id="${teamNames[t]}"`).append(`<p>${user.battlenet_id}</p>`)
            })
        })
    }

    function loadCards() {
        console.log('i am in load cards', tournamentID);
        $.ajax({
          url: '/tournaments/cards.json',
          data: {tournamentID: tournamentID},
          method: 'GET'
        }).done((playerRoster) => {
          console.log(tournamentID);
          renderTeamCards(playerRoster);
        });
      }

    loadCards();

    function renderPlayerCount(playerRoster) {
        const playerNames = Object.keys(playerRoster)
        Object.keys(playerNames).forEach((i) => {
            $(".player-table-stats").append(`
            <tr data-player-id="${playerNames[i]}">
            <th scope="row">${[i]}</th>
          </tr>
            `)

            playerRoster[playerNames[i]].forEach((user) => {
                $(`[data-player-id="${playerNames[i]}"`).append(`
                <td>${user.battlenet_id}</td>`)
                })
        })

    }
    

    function loadTable() {
        $.ajax({
          url: '/tournaments/cards.json',
          data: tournamentID,
          method: 'GET'
        }).done((playerRoster) => {
          renderPlayerCount(playerRoster);
        });
      }

    loadTable();

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

    $(".enroll-me").on('click', function (event) {
        
        $.ajax({
            type: "POST",
            url: "/tournaments/" + tournamentID + "/enroll",
            success: function () {
                $("#new-tournament-form").html("Enrolled! Created!");
            }
        })
    })

    function showTournamentID(){
        console.log('Tournament name: ', tournamentID);
    }

    showTournamentID();
})

