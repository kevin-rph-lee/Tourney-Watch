
$(document).ready(function () {
  // for tournament_notready, tournament_staging
  function renderPlayerCount(playerRoster) {
    const playerNames = Object.keys(playerRoster)
    Object.keys(playerNames).forEach((i) => {
        $(".player-table-stats").append(`
          <tr data-player-id="${playerNames[i]}">
          <th scope="row">${[i]}</th>
        </tr>`)

      playerRoster[playerNames[i]].forEach((user) => {
        $(`[data-player-id="${playerNames[i]}"`).append(`
        <td>${user.battlenet_id}</td>`)
      })
    })

  }
  
  // for tournament_notready, tournament_staging
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

});