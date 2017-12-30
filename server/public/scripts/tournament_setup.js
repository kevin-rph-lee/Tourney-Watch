
$(document).ready(function () {

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
    })

  }
  
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


  $("[data-toggle='toggle']").click(function() {
    const selector = $(this).data("target");
    $(selector).toggleClass('in');
  });

  $(".fa-clipboard").click(function() {
    // const shareLink = $(this).data("link");
    // shareLink.select()
    // document.execCommand("Copy");
    // alert("copied!");
    
  })

});