
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
          $(`[data-team-id="${teamNames[t]}"`).append(`<p class= 'player'>${user.battlenet_id} </p>`)
        })
    })

    $('.player').click(function(e)
      {
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




  //TESTING

    // Get the modal
  const modal = document.getElementById('swap-players-modal');

  // Get the button that opens the modal
  const btn = document.getElementById("swap-players-button");

  // When the user clicks on the button, open the modal
  btn.onclick = function() {
    if($('.selected').length < 2){
      alert('must select 2!');
    }
    console.log($(".selected").text());
    console.log($(".selected").prev());
  }


  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }

});
