
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
            <span class="tooltiptext">Test text</span>
            </div>
        </div>
        `)

        teamRoster[teamNames[t]].forEach((user) => {
          //Don't delete extra space TO DO make this...  good.
          $(`[data-team-id="${teamNames[t]}"`).append(`<p class= 'player' data-user-id = ${user.id}>${user.battlenet_id} </p>`)
        })
    })

    if(isOwner){
      $('.player').click(function(e){
        console.log($('.selected').length)
        console.log(e.target.className);
        console.log(e.target);


        if($('.selected').length < 3){
          $(e.target).toggleClass('selected');
        }
        if($('.selected').length >= 3 && e.target.className.includes('selected')){
          $(e.target).toggleClass('selected');
        }
      });
    }

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

  $('#swap-players-button').click(function(e){
    const selectedPlayers = $(".selected").text().split(' ');
    $.ajax({
      url: '1/swap',
      data: {bnetID1: selectedPlayers[0], bnetID2: selectedPlayers[1]},
      method: 'GET'
    }).done((playerRoster) => {
      // console.log(tournamentID);
      renderTeamCards(playerRoster);
    });
  });




  loadCards();




  //TESTING

    // Get the modal
  const modal = document.getElementById('swap-players-modal');

  // Get the button that opens the modal
  const btn = document.getElementById("swap-modal-button");

  // When the user clicks on the button, open the modal
  btn.onclick = function() {


    if($('.selected').length < 2){
      alert('must select 2!');
      return;
    }
    modal.style.display = "block";



    const selectedPlayers = $(".selected").text().split(' ');
    console.log(selectedPlayers[0] + ' ' + selectedPlayers[1]);
    $.ajax({
        url: '/tournaments/cards.json',
        data: {tournamentID: tournamentID},
        method: 'GET'
      }).done((playerRoster) => {
        //TO DO: there's gotta be a better way to do this....
        for(let i in playerRoster){
          // console.log(playerRoster[i]);
          for(let y in playerRoster[i]){
            // console.log(playerRoster[i][y]);
            if(selectedPlayers[0] === playerRoster[i][y].battlenet_id || selectedPlayers[1] === playerRoster[i][y].battlenet_id){
              // console.log('yarp!');
              $('.swap-players-container').append(`<h1>${playerRoster[i][y].battlenet_id}</h1><p>${playerRoster[i][y].first_role}<p>`);
            }
          }
        }
      });

  }


  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
        $('.swap-players-container').empty();
          modal.style.display = "none";
      }
  }

});
