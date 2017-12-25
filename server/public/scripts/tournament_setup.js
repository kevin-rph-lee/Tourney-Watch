
$(document).ready(function () {
  // for tournament_notready, tournament_staging
  function renderPlayerCount(playerRoster) {
    const playerNames = playerRoster.null;
    Object.keys(playerNames).forEach((i) => {
      console.log(playerNames[i]);
        $(".player-table-stats").append(`
          <tr data-player-id="${playerNames[i].battlenet_id}">
            <td scope="row">${Number([i]) + 1}</td>
            <td>${playerNames[i].battlenet_id}</td>
            <td>${playerNames[i].level}</td>
            <td>${playerNames[i].games_won}</td>
          </tr>
        </tr>`)

      // playerRoster[playerNames[i]].forEach((user) => {
      //   $(`[data-player-id="${playerNames[i]}"`).append(`
      //   <td>${user.battlenet_id}</td>`)
      // })
    })

  }
  
  // for tournament_notready, tournament_staging
  function loadTable() {
    $.ajax({
      url: `/tournaments/cards.json`,
      data: {tournamentID: tournamentID},
      method: 'GET'
    }).done((playerRoster) => {
      renderPlayerCount(playerRoster);
    });
  }

  loadTable();

});