
$(document).ready(function () {

  function renderTeamCards(teamRoster) {
    const teamNames = Object.keys(teamRoster)
    $(".tournamentheader").append(`
    <h1>${teamRoster["1"]["0"]["name"]}</h1>
    `)
    Object.keys(teamNames).forEach((t) => {
        $(".row").append(`
        <div class="card mb-3" style="min-width: 15rem">
          <div class="card-header">${teamNames[t]}</div>
            <div class="card-body" data-team-id="${teamNames[t]}">
            </div>
        </div>
        `)

        teamRoster[teamNames[t]].forEach((user) => {
          $(`[data-team-id="${teamNames[t]}"`).append(`
          <div class='container'>
            <span data-balloon="Level: ${user.level} &#10; Games Won: ${user.games_won} &#10; Gold Medals: ${user.medal_gold} &#10; Silver Medals: ${user.medal_silver} &#10; Bronze Medals: ${user.medal_bronze}" data-balloon-pos="right" data-balloon-break>${user.battlenet_id}</span>
          </div>
            `)
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

});