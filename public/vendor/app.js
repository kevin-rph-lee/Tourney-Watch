
$(document).ready(function () {
});
    // not sure, going to guess logout do this one last
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

    // i think this is for testing purposes...
    function showTournamentID(){
        console.log('Tournament name: ', tournamentID);
    }

    showTournamentID();
})

