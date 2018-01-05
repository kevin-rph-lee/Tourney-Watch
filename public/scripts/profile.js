
$(document).ready(function () {
  // console.log('I am ready');
  //


    $.ajax({
      url: '/users/' + userID + '/profileinfo.json',
      method: 'GET'
    }).done((results) => {
      console.log(results);
      $('.profile-card').empty();
      $('.profile-card').append(`
      <div class="profile-cover">
          <div class="profile-avatar">
              <a href="#"><img src="/images/PI_Pachimari.png" ></a>
          </div>
          <div class="profile-details">
              <h6> ${battlenetID} </h6>
          </div>
      </div>
      <div class="profile-info">
          <h1>Level: ${results.level}</h1>
          <div class="info-area">
            Stuff goes here
          </div>
      </div>`)

      let statsTable = `<table>`;

      for(let hero in results.playTime){
        statsTable += `
          <tr>
            <th>${hero}</th>
            <th>${results.playTime[hero]}</th>
          </tr>
        `
      }
      statsTable += `</table>`


      $('.stats-container').append(statsTable)



    }).catch((err) => {
      //TO DO: make look nice with a flash message or something
      alert('error!');
      console.log(err.status);
    });


  $('.submit').click(function(e){

    const password = $('#entry-password').val();
    const battlenet = $('#entry-battlenet').val()

    console.log(password + battlenet);
    console.log(userID);
    $.ajax({
      url: '/users/' + userID + '/edit/',
      data: {password: password, battlenet: battlenet },
      method: 'POST'
    }).done(() => {
      //Redirects to the index
      window.location.reload();
    }).catch((err) => {
      //TO DO: make look nice with a flash message or something
      alert('error!');
      console.log(err.status);
    });
    //empty the DOM and insert a loader
    $('.container').empty();
    $('.container').append('<div class="loader"></div>');


  });

});
